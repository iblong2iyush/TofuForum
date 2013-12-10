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

    public function getDB() {
        $database = 'tofuforumtest';
        $user = 'root';
        $password = 'root';
        $pdo = new PDO('mysql:unix_socket=/Applications/MAMP/tmp/mysql/mysql.sock;dbname=tofuforumtest',$user,$password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    }

    protected function setUp() {
        parent::setUp();
        UserService::setDB($this->getDb());
        $this->goodDataArray = array(
            'userName' => 'Jerome Chan Yeow Heong',
            'userEmail' => 'evil@evil.com',
            'userEmailConfirm' => 'evil@evil.com',
            'userPassword' => 'nosuchpassword@nosuchrobot',
            'userPasswordConfirm' => 'nosuchpassword@nosuchrobot'
        );
    }

    public function tearDown() {
        parent::tearDown();
        UserService::setDB(null);
    }

    public function testArrayHasMissingSignUpProperty() {
        $data = $this->goodDataArray;
        unset($data['userName']);
        $result = UserService::signup($data);
        $this->assertEquals(UserService::missingFieldError,$result->code());
    }

    public function testArrayHasNonMatchingPasswords() {
        $data = $this->goodDataArray;
        $data['userPasswordConfirm'] = '44';
        $result = UserService::signup($data);
        $this->assertEquals(UserService::nonMatchingPasswordError,$result->code());
    }

    public function testArrayHasNonMatchingEmails() {
        $data = $this->goodDataArray;
        $data['userEmail'] = 'good@good.com';
        $result = UserService::signup($data);
        $this->assertEquals(UserService::nonMatchingEmailError,$result->code());
    }

    public function testDuplicateName() {
        $data = $this->goodDataArray;
        $data['userName'] = 'Jerome Chan';
        $result = UserService::signup($data);
        $this->assertEquals(UserService::duplicateNameError,$result->code());
    }

    public function testOk() {
        $data = $this->goodDataArray;
        $result = UserService::signup($data);
        $this->assertEquals(UserService::resultOk,$result->code());
    }

}
?>
