<?php

require_once('autoloader.php');

header('Content-Type: application/json');

// Inject the database into the service
UserService::setDB(Database::db());

// TODO
// We should email the user a confirmation link

// Return the result of the call
echo UserService::signup(Http::post_json());

?>