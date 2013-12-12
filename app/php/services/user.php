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
        return new JSONResult(self::resultOk,'Ok user logged in.');
    }

    protected static function signUpProperties() {
        return ['userName','userEmail','userEmailConfirm','userPassword','userPasswordConfirm'];
    }

    protected static function loginProperties() {
        return ['userName','userPassword'];
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
}

?>