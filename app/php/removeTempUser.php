<?php
require_once('autoloader.php');
Http::json_header();
$authenticationService = new AuthenticationService();
$userService = new UserService(Database::db(),$authenticationService);
echo $userService->removeTempUser();
?>