<?php

require_once('authentication.php');
require_once('json_results.php');

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
    
    public static function signup($data) {

        /* error code: 0 message: 'user signed up'
           error code: 1 message: 'sql error' <-- never?
           error code: 2 message: 'duplicate user name'
           error code: 3 message: 'unknown error'
           error code: 4 message: 'non-matching email'
           error code: 5 message: 'non-matching password'
           error code: 6 message: 'field is missing'
        */

        /* confirm all fields are present */
        if (!self::verifySignUpData($data)) {
            return new JSONResult(self::missingFieldError,'Field is missing');
        }

        /* confirm password */
        if (!self::verifyPassword($data)) {
            return new JSONResult(self::nonMatchingPasswordError,'Passwords did not match.');
        }

        /* confirm email */
        if (!self::verifyEmail($data)) {
            return new JSONResult(self::nonMatchingEmailError,'Emails did not match.');
        }
        
        /* Add user to database and handle error if any */
        try {
            self::addUserToDatabase($data);
        } catch (PDOException $e) {
            $err = $e->errorInfo[1];
            if ($err==1062) {
                return new JSONResult(self::duplicateNameError,'Duplicate user name.');
            } 
            return new JSONResult(self::unknownError,$e->errorInfo[2]);
        }
        
        /* Everything is ok */
        return new JSONResult(self::resultOk,'User signed up');
    }

    protected static function signUpProperties() {
        return ['userName','userEmail','userEmailConfirm','userPassword','userPasswordConfirm'];
    }

    protected static function verifySignUpData($data) {
        $properties = self::signUpProperties();
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

    protected static function getDB() {
        $database = 'tofuforumtest';
        $user = 'root';
        $password = 'root';
        $pdo = new PDO('mysql:unix_socket=/Applications/MAMP/tmp/mysql/mysql.sock;dbname=tofuforumtest',$user,$password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    }

    protected static function addUserToDatabase($data) {
        $db = self::getDB();
        $sql = "insert into users (name, email, password) values (:name, :email, :password)";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name',$data['userName'],PDO::PARAM_STR, 40);        
        $stmt->bindParam(':email',$data['userEmail'],PDO::PARAM_STR, 40);        
        $stmt->bindParam(':password',$data['userPassword'],PDO::PARAM_STR, 32);
        $stmt->execute();
    }
    
}

?>