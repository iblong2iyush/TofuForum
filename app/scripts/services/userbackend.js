// jshint indent:4

(function(){

    'use strict';

    var module = angular.module('tofuForumApp');
    module.value('signupUrl','/php/signup.php');
    module.factory('Userbackend', function($http,signupUrl) {
        var service = {};
        service.signup = function(data,successCallback,failureCallback) {
            $http.post(signupUrl,data).success(successCallback).error(failureCallback);
        };
        return service;
    });

})();

