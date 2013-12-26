<?php

class UserService {
    
    /* 
       This class performs all the user services.

       Jerome Chan
       09 Dec 13
       Version 0.1
    */

    protected $db;

    public function __construct($db) {
        $this->setDB($db);
    }
    
    public function setDB($db) {
        $this->db = $db;
    }
  
    public function DB() {
        return $this->db;
    }
  
    public function signup($data) {

        try {
            /* confirm all fields are present */
            if (!$this->verifyDataFields($data,$this->signUpProperties())) {
                return new JSONResult(Error::missingFieldError,'Field is missing.');
            }
      
            /* confirm password */
            if (!$this->verifyPassword($data)) {
                return new JSONResult(Error::nonMatchingPasswordError,'Passwords did not match.');
            }
      
            /* confirm email */
            if (!$this->verifyEmail($data)) {
                return new JSONResult(Error::nonMatchingEmailError,'Emails did not match.');
            }
      
            /* TODO check for duplicate email */
      
            /* TODO check for duplicate name */

            /* Add user to database and handle error if any */
            try {
                $this->addUserToDatabase($data);
            } catch (PDOException $e) {
                $err = $e->errorInfo[1];
                if ($err==1062) {
                    return new JSONResult(Error::duplicateNameError,'Duplicate field ['.$e->errorInfo[2].'].');
                } 
                return new JSONResult(Error::unknownError,$e->errorInfo[2]);
            }
        } catch (Exception $e) {
            return new JSONResult(Error::unknownError,$e->errorInfo[1].' '.$e->errorInfo[2]);
        }
        /* Everything is ok */
        return new JSONResult(Error::resultOk,'User signed up.');
    }

    public function login($data) {
        
        if (!$this->verifyDataFields($data,$this->loginProperties())) {
            return new JSONResult(Error::missingFieldError,'Name or password is missing.');
        }
        try {
            $user = $this->fetchUserFromDatabase($data['userName']);
            /* No such user */
            if (!$user) {
                return new JSONResult(Error::namePasswordError,'Name or password does not match records.');
            }
            /* Account disabled */
            if (intval($user['enabled'])==0) {
                return new JSONResult(Error::accountError,'Account is disabled.');
            }
            /* Authentication failed */
            if (!Authentication::authenticate($data['userPassword'],$user['password'],$user['salt'])) {
                return new JSONResult(Error::namePasswordError,'Name or password does not match records.');
            }
        } catch (Exception $e) {
            return new JSONResult(Error::unknownError,$e->getMessage());
        }
        $this->updateLoginTimeForUser($data['userName']);
        $this->storeUserInSession($user);
        return new JSONResult(Error::resultOk,'Ok user logged in.');
    }

    public function logout() {
        try {
            session_start();
            $_SESSION = array();
            if (ini_get("session.use_cookies")) {
                $params = session_get_cookie_params();
                setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
                );
            }
            session_destroy();
        } catch (Exception $e) {
            return new JSONResult(Error::unknownError,$e->getMessage());
        }
        return new JSONResult(Error::resultOk,'Ok user logged out');
    }

    public function password($data) {
        try {
            if (!$this->isUserLoggedIn()) {
                return new JSONResult(Error::unauthenticatedError,'User is not authenticated');
            }
            if (!$this->verifyDataFields($data,$this->passwordProperties())) {
                return new JSONResult(Error::missingFieldError,'Field is missing.');
            }
            if ($data['userNewPassword']!=$data['userNewPasswordConfirm']) {
                return new JSONResult(Error::nonMatchingPasswordError,'Passwords do not match');
            }
      
            /* use cached user data or should we fetch the user data again? */
            $cachedUser = $this->getUserFromSession();
            $user = $this->fetchUserFromDatabase($cachedUser['name']);
            if (!$user) {
                return new JSONResult(Error::namePasswordError,'Account does not appear in database.');
            }
            /* Account disabled */
            if (intval($user['enabled'])==0) {
                return new JSONResult(Error::accountError,'Account is disabled.');
            }
            /* confirm password matches */
            if (!Authentication::authenticate($data['userCurrentPassword'],$user['password'],$user['salt'])) {
                return new JSONResult(Error::namePasswordError,'Entered current password does not match stored password.');
            }
            /* cleared all checks, generate new salt and hash */
            $result = Authentication::hash($data['userNewPassword']);
      
            /* update database */
            $user['password'] = $result['hash'];
            $user['salt'] = $result['salt'];
            $this->updateUserInDatabase($user);
        } catch (Exception $e) {
            return new JSONResult(Error::unknownError,$e->getMessage());
        }
        return new JSONResult(Error::resultOk,'Ok Password changed.');
    }

    public function isUserOk() {
        /* Check if user is logged in and is not disabled */
        if (!$this->isUserLoggedIn()) {
            return false;
        }
        $user = $this->getUserFromSession();
        return (intval($user['enabled'])==0);
    }

    public function getUser() {
        return $this->getUserFromSession();
    }

    protected function signUpProperties() {
        return ['userName','userEmail','userEmailConfirm','userPassword','userPasswordConfirm'];
    }

    protected function loginProperties() {
        return ['userName','userPassword'];
    }

    protected function passwordProperties() {
        return ['userCurrentPassword','userNewPassword','userNewPasswordConfirm'];
    }

    protected function verifyDataFields($data,$properties) {
        foreach ($properties as $property) {
            if (!array_key_exists($property,$data)) {
                return false;
            }
        }
        return true;
    }

    protected function verifyEmail($data) {
        if ($data['userEmail']!=$data['userEmailConfirm']) {
            return false;
        }
        return true;
    }

    protected function verifyPassword($data) {
        if ($data['userPassword']!=$data['userPasswordConfirm']) {
            return false;
        }
        return true;
    }

    protected function storeUserInSession($data) {
        $_SESSION['user'] = $data;
    }

    protected function getUserFromSession() {
        return $_SESSION['user'];
    }

    protected function isUserLoggedIn() {
        return isset($_SESSION['user']);
    }

    protected function addUserToDatabase($data) {
        $securePasswordHash = Authentication::hash($data['userPassword']);
        $db = $this->DB();
        $sql = 'insert into users (name, email, password, salt, permission, enabled) values (:name, :email, :password, :salt, 1, 1)';
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name',$data['userName'],PDO::PARAM_STR, 40);    
        $stmt->bindParam(':email',$data['userEmail'],PDO::PARAM_STR, 40);    
        $stmt->bindParam(':password',$securePasswordHash['hash'],PDO::PARAM_STR, 128);
        $stmt->bindParam(':salt',$securePasswordHash['salt'],PDO::PARAM_STR, 32);
        $stmt->execute();
    }
  
    protected function fetchUserFromDatabase($name) {
        $db = $this->DB();
        $sql = 'select * from users where name = :name';
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name',$name);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row;
    }

    protected function updateLoginTimeForUser($name) {
        $db = $this->DB();
        $sql = 'update users set lastLogin = now() where name = :name';
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name',$name);
        $stmt->execute();
        return ($stmt->rowCount()==1);
    }

    protected function updateUserInDatabase($user) {
        $db = $this->DB();
        $sql = 'update users set name = :name, password = :password, salt = :salt, email = :email, updated = NOW() where id = :id';
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name',$user['name']);
        $stmt->bindParam(':password',$user['password']);
        $stmt->bindParam(':salt',$user['salt']);
        $stmt->bindParam(':email',$user['email']);
        $stmt->bindParam(':id',$user['id']);
        $stmt->execute();
        return ($stmt->rowCount()==1);
    }

    // Test method for e2e karma testing

    public function removeTempUser() {
        $db = $this->DB();
        $sql = 'delete from users where name like \'dummy user%\'';
        $db->exec($sql);
        return true;
    }

}

?>