<?php
class JSONResult {
    
    protected $code;
    protected $message;

    public function __construct($errorCode = 0, $errorMessage = '') {
        $this->code = $errorCode;
        $this->message = $errorMessage;
    }

    public function __toString() {
        return json_encode($this->objectAsArray());
    }

    protected function objectAsArray() {
        $returnArray = array(
            'code' => $this->code,
            'message' => $this->message);
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
    
}
?>
