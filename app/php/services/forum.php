<?php

class ForumService {
    
    /* 
       This class performs all the forum services.

       Jerome Chan
       25 Dec 13
       Version 0.1
    */

    protected $db;
    protected $userService;

    public function __construct($pdo,$userService) {
        $this->setDB($pdo);
        $this->setUserService($userService);
    }
    
    public function setDB($pdo) {
        $this->db = $pdo;
    }
    
    public function DB() {
        return $this->db;
    }

    public function setUserService($service) {
        $this->userService = $service;
    }

    public function getUserService() {
        return $this->userService;
    }

    public function listForums() {
        $forumRows = array();
        if (!$this->getUserService()->isUserOk()) {
            /* Return JSON result that says user is not authenticated or ok */
            return new JSONResult(Error::unauthenticatedError,'User is not authenticated or does not have permission to access this section.');
        }
        try {
            /* get list of all forums that belong to this user */
            $forumRows = $this->getForums();
        } catch (Exception $e) {
            return new JSONResult(Error::unknownError,$e->getMessage());
        }
        return new JSONResult(Error::resultOk,'Ok',$forumRows);
    }

    protected function getForums() {
        $db = $this->DB();
        $ownerId = $this->getUserService()->getUser()['id'];
        $sql = 'select * from forums where ownerId = :ownerId';
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':ownerId',$ownerId);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $rows;
    }
}

?>
