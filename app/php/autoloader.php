<?php

class Autoloader {

    protected static $table = array(
        'Database' => 'classes/database.php',
        'UserService' => 'services/user.php',
        'JSONResult' => 'classes/json_results.php',
        'Http' => 'services/http.php'
    );

    public static function loadClass($name) {
        if (array_key_exists($name,self::$table)) {
            include self::$table[$name];
        }
    }
}

spl_autoload_register('Autoloader::loadClass');
