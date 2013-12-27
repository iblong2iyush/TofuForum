<?php
require_once('autoloader.php');
session_start();
$authenticationService = new AuthenticationService();
$userService = new UserService(Database::db(),$authenticationService);
Http::json_header();
echo $userService->login(Http::post_json());
?>
