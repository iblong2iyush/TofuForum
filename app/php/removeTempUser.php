<?php
require_once('autoloader.php');
Http::json_header();
$userService = new UserService(Database::db());
echo $userService->removeTempUser();
?>