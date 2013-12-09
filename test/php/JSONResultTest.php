<?php

require_once('json_results.php');

class JSONResultTest extends PHPUnit_Framework_TestCase {

    public function testDefaultConstructor() {
        $v = new JSONResult();
        $this->assertEquals($v->code(),0);
        $this->assertEquals($v->message(),'');
    }
    
    public function testConstructor() {
        $v = new JSONResult(1,'This is the test message');
        $this->assertEquals($v->code(),1);
        $this->assertEquals($v->message(),'This is the test message');
    }

    public function testJSON() {
        $v = new JSONResult(2,'A');
        $output = strval($v);
        $w = json_decode($output);
        $this->assertEquals($v->code(),$w->code);
        $this->assertEquals($v->message(),$w->message);
    }

}