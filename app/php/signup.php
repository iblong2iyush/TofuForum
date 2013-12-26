<?php
require_once('autoloader.php');
Http::json_header();
$userService = new UserService(Database::db());
// TODO
// We should email the user a confirmation link
echo $userService->signup(Http::post_json());
?>