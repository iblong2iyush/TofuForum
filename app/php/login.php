<?php
require_once('autoloader.php');
session_start();
header('Content-Type: application/json');
UserService::setDB(Database::db());
echo UserService::login(Http::post_json());
?>
