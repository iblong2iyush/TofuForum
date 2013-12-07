// jshint indent:4

(function(){

    'use strict';

    var module = angular.module('tofuForumApp');
    module.value('signupUrl','/php/signup.php');
    module.factory('Userbackend', function($http,signupUrl) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var service = {};
        service.signup = function(data,successCallback,failureCallback) {
            // We should sign up and have two callback functions
            $http.post(signupUrl,data).success(successCallback).error(failureCallback);
        };
        return service;
    });

})();

