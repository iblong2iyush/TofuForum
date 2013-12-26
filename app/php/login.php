<?php
require_once('autoloader.php');
session_start();
$userService = new UserService(Database::db());
Http::json_header();
echo $userService->login(Http::post_json());
?>
