<?php

/* All our responses are JSON so we should set the content type */
header('Content-type: application/json');

/* We return a JSON response. The return value has an error flag and results  */
/* The array which is returned to the caller */
$array = array();
$array['error'] = false;
$array['results'] = array();

/* Check to see if we have the user name and password */
if (!isset($_SESSION['name'])||!isset($_SESSION['password'])) {
    $array['error'] = true;
    $array['results']['message'] = 'User name and/or password is not set';
    header('Error in script',true,500);
    echo json_encode($array);
    exit(0);
}

/* Open database connection and load the user name and password */
$dsn = 'mysql:host=localhost;dbname=tofuforum;port=8889';
$user = 'root';
$password = 'root';
try {
    $dbh = new PDO($dsn,$user,$password);
    
} catch (PDOException $exception) {
    $array['error'] = true;
    $array['results']['PDOException'] = $exception;
    $array['results']['message'] = 'PDO Error';
    header('Error',true,500);
    echo json_encode($array);
    exit(0);
}

?>
