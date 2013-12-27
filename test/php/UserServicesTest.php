<?php

require_once('PHPUnit/Autoload.php');
require_once('user.php');
require_once('error.php');

class UserServiceTest extends PHPUnit_Extensions_Database_TestCase {

    public $userService;

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
        $this->userService = new UserService($this->getDB(),new AuthenticationService());
        parent::setUp();
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
    }

    public function testArrayHasMissingSignUpProperty() {
        $data = $this->goodDataArray;
        unset($data['userName']);
        $result = $this->userService->signup($data);
        $this->assertEquals(Error::missingFieldError,$result->code());
    }

    public function testArrayHasNonMatchingPasswords() {
        $data = $this->goodDataArray;
        $data['userPasswordConfirm'] = '44';
        $result = $this->userService->signup($data);
        $this->assertEquals(Error::nonMatchingPasswordError,$result->code());
    }

    public function testArrayHasNonMatchingEmails() {
        $data = $this->goodDataArray;
        $data['userEmail'] = 'good@good.com';
        $result = $this->userService->signup($data);
        $this->assertEquals(Error::nonMatchingEmailError,$result->code());
    }

    public function testDuplicateName() {
        $data = $this->goodDataArray;
        $data['userName'] = 'Jerome Chan';
        $result = $this->userService->signup($data);
        $this->assertEquals(Error::duplicateNameError,$result->code());
    }

    public function testOk() {
        $data = $this->goodDataArray;
        $result = $this->userService->signup($data);
        $this->assertEquals(Error::resultOk,$result->code());
    }

    public function testLoginOk() {
        $data = array();
        $data['userName'] = 'Jerome Chan';
        $data['userPassword'] = 'horse';
        $result = $this->userService->login($data);
        $this->assertEquals(Error::resultOk,$result->code());
    }

    public function testLoginNoSuchUser() {
        $data = array();
        $data['userName'] = 'Jerome Chan Yeow Heong';
        $data['userPassword'] = 'horse';
        $result = $this->userService->login($data);
        $this->assertEquals(Error::namePasswordError,$result->code());
    }

    public function testWrongPassword() {
        $data = array();
        $data['userName'] = 'Jerome Chan';
        $data['userPassword'] = 'horsedogdragonbull';
        $result = $this->userService->login($data);
        $this->assertEquals(Error::namePasswordError,$result->code());
    }

    public function testLoginDisabledUser() {
        $data = array();
        $data['userName'] = 'Johnson Tan';
        $data['userPassword'] = 'snake';
        $result = $this->userService->login($data);
        $this->assertEquals(Error::accountError,$result->code());
    }

    public function testAddNewUser() {
        $data = $this->goodDataArray;
        $result = $this->userService->signup($data);
        $this->assertEquals(Error::resultOk,$result->code());
    }

    public function testAddUserWithExistingName() {
        $data = $this->goodDataArray;
        $data['userName'] = 'Angel Tan';
        $result = $this->userService->signup($data);
        $this->assertEquals(Error::duplicateNameError,$result->code());
    }

    public function testAddUserWithExistingEmail() {
        $data = $this->goodDataArray;
        $data['userEmail'] = 'dog@mac.com';
        $data['userEmailConfirm'] = 'dog@mac.com';
        $result = $this->userService->signup($data);
        $this->assertEquals(Error::duplicateNameError,$result->code());
    }

    public function testChangePasswordOk() {
        $data = array();
        $data['userName'] = 'Jerome Chan';
        $data['userPassword'] = 'horse';
        $result = $this->userService->login($data);
        $this->assertEquals(Error::resultOk,$result->code());
        $passwordData = array();
        $passwordData['userCurrentPassword']='horse';
        $passwordData['userNewPassword'] = 'pony';        
        $passwordData['userNewPasswordConfirm'] = 'pony';
        $result = $this->userService->password($passwordData);
        $this->assertEquals(Error::resultOk,$result->code(),$result->message());
        $result = $this->userService->logout();
        $this->assertEquals(Error::resultOk,$result->code());
        $data['userPassword'] = 'pony';
        $result = $this->userService->login($data);
        $this->assertEquals(Error::resultOk,$result->code());
    }        

    public function testChangePasswordNoLogin() {
        $passwordData = array();
        $passwordData['userCurrentPassword']='horse';
        $passwordData['userNewPassword'] = 'pony';        
        $passwordData['userNewPasswordConfirm'] = 'pony';
        $result = $this->userService->password($passwordData);
        $this->assertEquals(Error::unauthenticatedError,$result->code(),$result->message());
    }        

    public function testChangePasswordCurrentPasswordWrong() {
        $data = array();
        $data['userName'] = 'Jerome Chan';
        $data['userPassword'] = 'horse';
        $result = $this->userService->login($data);
        $this->assertEquals(Error::resultOk,$result->code());
        $passwordData = array();
        $passwordData['userCurrentPassword']='horsey';
        $passwordData['userNewPassword'] = 'pony';        
        $passwordData['userNewPasswordConfirm'] = 'pony';
        $result = $this->userService->password($passwordData);
        $this->assertEquals(Error::namePasswordError,$result->code(),$result->message());
    }        

    public function testChangePasswordNewPasswordMismatched() {
        $data = array();
        $data['userName'] = 'Jerome Chan';
        $data['userPassword'] = 'horse';
        $result = $this->userService->login($data);
        $this->assertEquals(Error::resultOk,$result->code());
        $passwordData = array();
        $passwordData['userCurrentPassword']='horse';
        $passwordData['userNewPassword'] = 'pony1';        
        $passwordData['userNewPasswordConfirm'] = 'pony2';
        $result = $this->userService->password($passwordData);
        $this->assertEquals(Error::nonMatchingPasswordError,$result->code(),$result->message());
    }        

}
?>
