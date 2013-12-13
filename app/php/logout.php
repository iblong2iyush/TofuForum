<?php
require_once('autoloader.php');
session_start();
Http::json_header();
echo UserService::logout();
?>