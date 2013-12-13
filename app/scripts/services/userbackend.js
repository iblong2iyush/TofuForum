// jshint indent:4

(function(){

    'use strict';

    var module = angular.module('tofuForumApp');
    module.value('signupUrl','/php/signup.php');
    module.value('passwordUrl','/php/password.php');
    module.factory('Userbackend', function($http,signupUrl,passwordUrl) {
        var service = {};
        service.signup = function(data,successCallback,failureCallback) {
            $http.post(signupUrl,data).success(successCallback).error(failureCallback);
        };
        service.changePassword = function(data,successCallback,failureCallback) {
            $http.post(passwordUrl,data).success(successCallback).error(failureCallback);
        };
        return service;
    });

})();

