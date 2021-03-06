// jshint indent:4

(function(){

    'use strict';

    var module = angular.module('tofuForumApp');
    module.controller('PasswordformCtrl',function ($scope,Userbackend,Navigation,Msgbox) {

        $scope.user = {};
        $scope.navigation = Navigation;

        $scope.changePassword = function(form) {
            if (!form.$valid) {
                Msgbox.alert('Please fill out all fields');
                return;
            }
            Userbackend.changePassword(
                $scope.user,
                function(data,status){
                    if (status!==200) {
                        Msgbox.alert('An unknown http error (' + status  + ') has occurred');
                        return;
                    }
                    if (data.code!==0) {
                        Msgbox.alert(data.message);
                        return;
                    }
                    Navigation.gotoUrl('/main');
                },
                function(data,status){
                    Msgbox.alert('A Http Error (' + status + ') has occurred.');
                }
            );
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
