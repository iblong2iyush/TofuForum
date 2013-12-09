<?php

require('PHPUnit/Autoload.php');
require('user.php');

class UserServiceTest extends PHPUnit_Extensions_Database_TestCase {

    public function getConnection() {
        $database = 'tofuforumtest';
        $user = 'root';
        $password = 'root';
        $pdo = new PDO('mysql:unix_socket=/Applications/MAMP/tmp/mysql/mysql.sock;dbname=tofuforumtest',$user,$password);
        return $this->createDefaultDBConnection($pdo,$database);
    }

    public function getDataSet() {
        $result = $this->createXMLDataSet('test/php/files/userservice_dataset.xml');
        return $result;
    }

    protected function setUp() {
        $this->goodDataArray = array(
            'userName' => 'Jerome Chan Yeow Heong',
            'userEmail' => 'evil@evil.com',
            'userEmailConfirm' => 'evil@evil.com',
            'userPassword' => 'nosuchpassword@nosuchrobot',
            'userPasswordConfirm' => 'nosuchpassword@nosuchrobot'
        );
        parent::setUp();
    }

    public function testArrayHasMissingSignUpProperty() {
        $data = $this->goodDataArray;
        unset($data['userName']);
        $result = UserService::signup($data);
        $this->assertEquals($result->code(),6);
    }

    public function testArrayHasNonMatchingPasswords() {
        $data = $this->goodDataArray;
        $data['userPasswordConfirm'] = '44';
        $result = UserService::signup($data);
        $this->assertEquals($result->code(),5);
    }

    public function testArrayHasNonMatchingEmails() {
        $data = $this->goodDataArray;
        $data['userEmail'] = 'good@good.com';
        $result = UserService::signup($data);
        $this->assertEquals($result->code(),4);
    }

}
?>
