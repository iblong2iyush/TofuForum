<?php
require_once('autoloader.php');
session_start();
$userService = new UserService(Database::db());
Http::json_header();
echo $userService->password(Http::post_json());
?>