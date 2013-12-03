// jshint indent:4

(function() {

    'use strict';

    var module = angular.module('tofuForumApp');
    module.factory('Util',['$location', function($location){
        var service = {};
        service.gotoUrl = function(url) {
            $location.path(url);
        };
        return service;
    }]);

})();
