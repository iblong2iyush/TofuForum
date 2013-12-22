<?php

require_once('autoloader.php');
Http::json_header();
UserService::setDB(Database::db());
// TODO
// We should email the user a confirmation link
echo UserService::removeTempUser();

?>