<?php
require_once('autoloader.php');
session_start();
Http::json_header();
UserService::setDB(Database::db());
echo UserService::login(Http::post_json());
?>
