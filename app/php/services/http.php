<?php
class Http {

    public static function post_json() {
        $results = file_get_contents('php://input');
        $results = json_decode($results,true);
        return $results;
    }

}

?>