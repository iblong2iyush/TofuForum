<?php

require_once('PHPUnit/Autoload.php');
require_once('authentication.php');

class AuthenticationServiceTest extends PHPUnit_Framework_TestCase {

    public function testSaltLength() {
        $result = Authentication::hash('abcdefghijklmnop');
        $this->assertEquals(32,strlen($result['salt']));
    }

}
?>
