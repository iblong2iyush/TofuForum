// jshint indent:4

(function(){
    
    'use strict';
    
    var module = angular.module('tofuForumApp');
    module.controller('SignupformCtrl',function($scope,Util,Userbackend,Msgbox) {
            $scope.hasSubmitted = false;
            $scope.user = {};
            $scope.signup = function(form) {
                $scope.hasSubmitted = true;
                if (!form.$valid) {
                    Msgbox.alert('Please fill out all fields.');
                    return;
                }
                // check to see if passwords and emails match
                var newForm = angular.copy(form);
                Util.removePropertiesWith(newForm,'$');
                // send the request
                // redirect to login screen if successful
                // display error message if not
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
