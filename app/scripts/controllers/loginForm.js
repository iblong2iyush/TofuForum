// jshint indent:4

(function(){

    'use strict';

    var module = angular.module('tofuForumApp');
    module.controller('LoginformCtrl', function ($scope) {
        $scope.login = function(form) {
            console.log(form);
        };
    });
    

})();
