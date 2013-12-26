<?php

class ForumService {
    
    /* 
       This class performs all the forum services.

       Jerome Chan
       25 Dec 13
       Version 0.1
    */

    protected static $db;

    public static function setDB($db) {
        self::$db = $db;
    }
    
    public static function DB() {
        return self::$db;
    }

    public static function listForums($userService=UserService) {
        $forumRows = array();
        if (!UserService::isUserOk()) {
            /* Return JSON result that says user is not authenticated or ok */
            return new JSONResult(Error::unauthenticatedError,'User is not authenticated or does not have permission to access this section.');
        }
        try {
            /* get list of all forums that belong to this user */
            $forumRows = self::getForums();
        } catch (Exception $e) {
            return new JSONResult(Error::unknownError,$e->getMessage());
        }
        return new JSONResult(Error::resultOk,'Ok',$forumRows);
    }

    protected static function getForums() {
        $db = self::DB();
        $ownerId = UserService::getUser()['id'];
        $sql = 'select * from forums where ownerId = :ownerId';
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':ownerId',$ownerId);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $rows;
    }
}

?>
