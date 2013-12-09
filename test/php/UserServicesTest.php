<?php

require('PHPUnit/Autoload.php');
require('user.php');

class UserServiceTest extends PHPUnit_Framework_TestCase {

    protected function setUp() {
        $this->goodDataArray = array(
            'userName' => 'Jerome Chan Yeow Heong',
            'userEmail' => 'evil@evil.com',
            'userEmailConfirm' => 'evil@evil.com',
            'userPassword' => 'nosuchpassword@nosuchrobot',
            'userPasswordConfirm' => 'nosuchpassword@nosuchrobot'
        );
    }

    public function testSignUpPropertiesLength() {
        $this->assertEquals(count(UserService::signUpProperties()),5);
    }

    public function testArrayHasAllSignUpProperties() {
        $this->assertTrue(UserService::verifySignUpData($this->goodDataArray));
    }

}
?>
