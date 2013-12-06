// jshint indent:4

(function(){
    
    'use strict';
    
    var module = angular.module('tofuForumApp');
    module.controller('SignupformCtrl',function($scope,Util,Userbackend,Msgbox) {
        $scope.hasSubmitted = false;
        $scope.user = {};
        var successCallback = function(){
            // have to figure out what this is
        };
        var failureCallback = function(){
            // yes this too
        };
        $scope.signup = function(form) {
            $scope.hasSubmitted = true;
            if (!form.$valid) {
                Msgbox.alert('Please fill out all fields.');
                return;
            }
            Userbackend.signup($scope.user,successCallback,failureCallback);
        };
        $scope.isNotMatchingEmails = function() {
            var user = $scope.user;
            if (!('userEmail' in user)) {
                return true;
            }
            if (!('userEmailConfirm' in user)) {
                return true;
            }
            return (user.userEmail !== user.userEmailConfirm);
        };
        $scope.isNotMatchingPasswords = function() {
            var user = $scope.user;
            if (!('userPassword' in user)) {
                return true;
            }
            if (!('userPasswordConfirm' in user)) {
                return true;
            }
            return (user.userPassword !== user.userPasswordConfirm);
        };
    });
    
})();
