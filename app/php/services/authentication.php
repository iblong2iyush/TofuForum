<?php
class Authentication {

    public static function hash($password) {
        $salt = self::randomSalt();
        $saltedPassword = $password . $salt;
        $digest = openssl_digest($saltedPassword,'sha512');
        return array(
            'salt'=>$salt,
            'hash'=>$digest);
    }
    
    public static function authenticate($password,$hash,$salt) {
        $saltedPassword = $password . $salt;
        $digest = openssl_digest($saltedPassword,'sha512');
        return $hash === $digest;
    }

    protected static function randomSalt() {
        $cstrong = false;
        while (!$cstrong) {        
            $bytes = openssl_random_pseudo_bytes(16, $cstrong);
        }
        $hex = bin2hex($bytes);
        return $hex;
    }

}
?>