// jshint indent:4

(function(){

    'use strict';

    var module = angular.module('tofuForumApp');
    module.controller('PasswordformCtrl',function ($scope,Userbackend,Util) {

        $scope.user = {};
        $scope.gotoUrl = Util.gotoUrl;

        $scope.changePassword = function(form) {
            Userbackend.changePasswords(form);
        };

        $scope.isNotMatchingPasswords = function() {
            var user = $scope.user;
            if (!('userNewPassword' in user)) {
                return true;
            }
            if (!('userNewPasswordConfirm' in user)) {
                return true;
            }
            return (user.userNewPassword !== user.userNewPasswordConfirm);
        };
        
    });

})();
