<?php

require_once('PHPUnit/Autoload.php');
require_once('forum.php');
require_once('error.php');
require_once('user.php');

class ForumServiceTest extends PHPUnit_Extensions_Database_TestCase {

    protected $userService;
    protected $authenticationService;
    protected $forumService;

    public function getConnection() {
        $database = 'tofuforumtest';
        $user = 'root';
        $password = 'root';
        $pdo = new PDO('mysql:unix_socket=/Applications/MAMP/tmp/mysql/mysql.sock;dbname=tofuforumtest',$user,$password);
        return $this->createDefaultDBConnection($pdo,$database);
    }

    public function getDataSet() {
        $result = $this->createXMLDataSet('test/php/files/forumservice_dataset.xml');
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
        $this->authenticationService = new AuthenticationService();
        $this->userService = $this->getMock('UserService',['isUserOk','getUser'],[$this->getDB(),$this->authenticationService]);
        $this->userService
            ->expects($this->any())
            ->method('isUserOk')
            ->will($this->returnValue(true));
        $this->forumService = new ForumService($this->getDB(),$this->userService);
        parent::setUp();
    }

    public function tearDown() {
        parent::tearDown();
    }

    public function testFetchForumsForUsers() {
        $this->userService
            ->expects($this->any())
            ->method('getUser')
            ->will($this->returnValue(array('id'=>1)));
        $results = $this->forumService->listForums();
        $this->assertEquals(4,count($results->data()));
    }

}
    
?>
