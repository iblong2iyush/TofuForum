g<?php

require_once('authentication.php');

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
        */

        /* confirm email */
        
        
    }

    public static function signUpProperties() {
        return ['userName','userEmail','userEmailConfirm','userPassword','userPasswordConfirm'];
    }

    public static function verifySignUpData($data) {
        $properties = self::signUpProperties();
        foreach ($properties as $property) {
            if (!array_key_exists($property,$data)) {
                return false;
            }
        }
        return true;
    }

}

?>