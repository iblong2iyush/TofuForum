<?php

class UserService {
    
    /* 
       This class performs all the user services.

       Jerome Chan
       09 Dec 13
       Version 0.1
    */

    const resultOk = 0;
    const sqlError = 1;
    const duplicateNameError = 2;
    const unknownError = 3;
    const nonMatchingEmailError = 4;
    const nonMatchingPasswordError = 5;
    const missingFieldError = 6;
    const namePasswordError = 7;
    const accountError = 8;
    const unauthenticatedError = 9;

    protected static $db;

    public static function setDB($db) {
        self::$db = $db;
    }
    
    public static function DB() {
        return self::$db;
    }
    
    public static function signup($data) {

        /* error code: 0 message: 'user signed up'
           error code: 1 message: 'sql error' <-- never?
           error code: 2 message: 'duplicate user name'
           error code: 3 message: 'unknown error'
           error code: 4 message: 'non-matching email'
           error code: 5 message: 'non-matching password'
           error code: 6 message: 'field is missing'
        */

        try {
            /* confirm all fields are present */
            if (!self::verifyDataFields($data,self::signUpProperties())) {
                return new JSONResult(self::missingFieldError,'Field is missing.');
            }
            
            /* confirm password */
            if (!self::verifyPassword($data)) {
                return new JSONResult(self::nonMatchingPasswordError,'Passwords did not match.');
            }
            
            /* confirm email */
            if (!self::verifyEmail($data)) {
                return new JSONResult(self::nonMatchingEmailError,'Emails did not match.');
            }
            

            /* TODO check for duplicate email */
            
            /* TODO check for duplicate name */

            /* Add user to database and handle error if any */
            try {
                self::addUserToDatabase($data);
            } catch (PDOException $e) {
                $err = $e->errorInfo[1];
                if ($err==1062) {
                    return new JSONResult(self::duplicateNameError,'Duplicate field ['.$e->errorInfo[2].'].');
                } 
                return new JSONResult(self::unknownError,$e->errorInfo[2]);
            }
        } catch (Exception $e) {
            return new JSONResult(self::unknownError,$e->errorInfo[1].' '.$e->errorInfo[2]);
        }
        /* Everything is ok */
        return new JSONResult(self::resultOk,'User signed up.');
    }

    public static function login($data) {
        /* error code: 0 message: 'user logged in' */
        /* error code: 6 message: 'name or password is missing' */
        /* error code: 7 message: 'user not found or password mismatched' */
        /* error code: 8 message: 'account is disabled' */
        if (!self::verifyDataFields($data,self::loginProperties())) {
            return new JSONResult(self::missingFieldError,'Name or password is missing.');
        }
        try {
            $user = self::fetchUser($data['userName']);
             /* No such user */
            if (!$user) {
                return new JSONResult(self::namePasswordError,'Name or password does not match records.');
            }
            /* Account disabled */
            if (intval($user['enabled'])==0) {
                return new JSONResult(self::accountError,'Account is diabled.');
            }
            /* Authentication failed */
            if (!Authentication::authenticate($data['userPassword'],$user['password'],$user['salt'])) {
                return new JSONResult(self::namePasswordError,'Name or password does not match records.');
            }
        } catch (Exception $e) {
            return new JSONResult(self::unknownError,$e->getMessage());
        }
        self::updateLoginTime($data['userName']);
        self::storeUserInSession($user);
        return new JSONResult(self::resultOk,'Ok user logged in.');
    }

    public static function logout() {
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
            return new JSONResult(self::unknownError,$e->getMessage());
        }
        return new JSONResult(self::resultOk,'Ok user logged out');
    }

    public static function password($data) {
        try {
            if (!self::isUserLoggedIn()) {
                return new JSONResult(self::unauthenticatedError,'User is not authenticated');
            }
            if (!self::verifyDataFields($data,self::passwordProperties())) {
                return new JSONResult(self::missingFieldError,'Field is missing.');
            }
            if ($data['userNewPassword']!=$data['userNewPasswordConfirm']) {
                return new JSONResult(self::nonMatchingPasswordError,'Passwords do not match');
            }
            
            /* use cached user data or should we fetch the user data again? */
            $cachedUser = self::getUserFromSession();
            $user = self::fetchUser($cachedUser['name']);
            if (!$user) {
                return new JSONResult(self::namePasswordError,'Account does not appear in database.');
            }
            /* Account disabled */
            if (intval($user['enabled'])==0) {
                return new JSONResult(self::accountError,'Account is diabled.');
            }
            /* confirm password matches */
            if (!Authentication::authenticate($data['userCurrentPassword'],$user['password'],$user['salt'])) {
                return new JSONResult(self::namePasswordError,'Entered current password does not match stored password.');
            }
            /* cleared all checks, generate new salt and hash */
            $result = Authentication::hash($data['userNewPassword']);
            
            /* update database */
            $user['password'] = $result['hash'];
            $user['salt'] = $result['salt'];
            self::updateUser($user);
        } catch (Exception $e) {
            return new JSONResult(self::unknownError,$e->getMessage());
        }
        return new JSONResult(self::resultOk,'Ok Password changed.');
    }

    protected static function signUpProperties() {
        return ['userName','userEmail','userEmailConfirm','userPassword','userPasswordConfirm'];
    }

    protected static function loginProperties() {
        return ['userName','userPassword'];
    }

    protected static function passwordProperties() {
        return ['userCurrentPassword','userNewPassword','userNewPasswordConfirm'];
    }

    protected static function verifyDataFields($data,$properties) {
        foreach ($properties as $property) {
            if (!array_key_exists($property,$data)) {
                return false;
            }
        }
        return true;
    }

    protected static function verifyEmail($data) {
        if ($data['userEmail']!=$data['userEmailConfirm']) {
            return false;
        }
        return true;
    }

    protected static function verifyPassword($data) {
        if ($data['userPassword']!=$data['userPasswordConfirm']) {
            return false;
        }
        return true;
    }

    protected static function storeUserInSession($data) {
        $_SESSION['user'] = $data;
    }

    protected static function getUserFromSession() {
        return $_SESSION['user'];
    }

    protected static function isUserLoggedIn() {
        return isset($_SESSION['user']);
    }

    protected static function addUserToDatabase($data) {
        $securePasswordHash = Authentication::hash($data['userPassword']);
        $db = self::DB();
        $sql = 'insert into users (name, email, password, salt, permission, enabled) values (:name, :email, :password, :salt, 1, 1)';
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name',$data['userName'],PDO::PARAM_STR, 40);        
        $stmt->bindParam(':email',$data['userEmail'],PDO::PARAM_STR, 40);        
        $stmt->bindParam(':password',$securePasswordHash['hash'],PDO::PARAM_STR, 128);
        $stmt->bindParam(':salt',$securePasswordHash['salt'],PDO::PARAM_STR, 32);
        $stmt->execute();
    }
    
    protected static function fetchUser($name) {
        $db = self::DB();
        $sql = 'select * from users where name = :name';
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name',$name);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row;
    }

    protected static function updateLoginTime($name) {
        $db = self::DB();
        $sql = 'update users set lastLogin = now() where name = :name';
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name',$name);
        $stmt->execute();
        return ($stmt->rowCount()==1);
    }

    protected static function updateUser($user) {
        $db = self::DB();
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

    public static function removeTempUser() {
        $db = self::DB();
        $sql = 'delete from users where name like \'dummy user%\'';
        $db->exec($sql);
        return true;
    }

}

?>