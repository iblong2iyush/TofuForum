<?php
require_once('autoloader.php');
Http::json_header();
$authenticationService = new AuthenticationService();
$userService = new UserService(Database::db(),$authenticationService);
// TODO
// We should email the user a confirmation link
echo $userService->signup(Http::post_json());
?>