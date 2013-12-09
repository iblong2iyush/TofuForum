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

    public static function signup($data) {
        /* error code: 0 message: 'user signed up'
           error code: 1 message: 'sql error'
           error code: 2 message: 'duplicate user name'
           error code: 3 message: 'unknown error'
           error code: 4 message: 'non-matching email'
           error code: 5 message: 'non-matching password'
           error code: 6 message: 'field is missing'
        */

        /* confirm all fields are present */
        if (!self::verifySignUpData($data)) {
            return new JSONResult(6,'Field is missing');
        }

        /* confirm password */
        if (!self::verifyPassword($data)) {
            return new JSONResult(5,'Passwords did not match.');
        }

        /* confirm email */
        if (!self::verifyEmail($data)) {
            return new JSONResult(4,'Emails did not match.');
        }

        return new JSONResult(0,'User signed up');

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
    
}

?>