<?php
class JSONResult {
    
    protected $code;
    protected $message;
    protected $data;

    public function __construct($errorCode = 0, $errorMessage = '',$data = array()) {
        $this->code = $errorCode;
        $this->message = $errorMessage;
        $this->data = $data;
    }

    public function __toString() {
        return json_encode($this->objectAsArray());
    }

    protected function objectAsArray() {
        $returnArray = array(
            'code' => $this->code,
            'message' => $this->message,
            'data' => $this->data);
        return $returnArray;
    }

    public function code() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function message(){
        return $this->message;
    }

    public function setMessage($message) {
        $this->message = $message;
    }

    public function data() {
        return $this->data;
    }

    public function setData($data) {
        $this->data = $data;
    }
    
}
?>
