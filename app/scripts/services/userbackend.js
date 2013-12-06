// jshint indent:4

(function(){

    'use strict';

    var module = angular.module('tofuForumApp');
    module.factory('Userbackend', function() {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var service = {};
        service.signup = function(data,successCallback,failureCallback) {
            // We should sign up and have two callback functions
            successCallback=false;
            failureCallback=false;
            console.log(data);
        };

        return service;
    });

})();

