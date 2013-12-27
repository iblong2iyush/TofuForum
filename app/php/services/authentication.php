<?php

class AuthenticationService {

    public function hash($password) {
        $salt = $this->randomSalt();
        $saltedPassword = $password . $salt;
        $digest = openssl_digest($saltedPassword,'sha512');
        return array(
            'salt'=>$salt,
            'hash'=>$digest);
    }
    
    public function authenticate($password,$hash,$salt) {
        $saltedPassword = $password . $salt;
        $digest = openssl_digest($saltedPassword,'sha512');
        return $hash === $digest;
    }

    protected function randomSalt() {
        $cstrong = false;
        while (!$cstrong) {        
            $bytes = openssl_random_pseudo_bytes(16, $cstrong);
        }
        $hex = bin2hex($bytes);
        return $hex;
    }

}

?>