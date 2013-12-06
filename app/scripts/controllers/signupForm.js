// jshint indent:4

(function(){
    
    'use strict';
    
    var module = angular.module('tofuForumApp');
    module.controller('SignupformCtrl', function ($scope,Util,Message,MessageboxEvent,MessageboxAlertType) {
        $scope.signup = function(form) {
            console.log('We got it');
            if (!form.$valid) {
                console.log('Form is not valid');
                Message.send(MessageboxEvent,{type:MessageboxAlertType,message:'Please fill out all fields of the form'});
                return;
            }
            // check to see if passwords and emails match
            var newForm = angular.copy(form);
            Util.removePropertiesWith(newForm,'$');
            // send the request
            // redirect to login screen if successful
            // display error message if not
        };
    });
    
})();

