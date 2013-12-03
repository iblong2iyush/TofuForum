// jshint indent:4

(function(){

    'use strict';

    angular.module('tofuForumApp')
        .controller('MainCtrl', ['$scope','Authentication',function ($scope,$authentication) {
            $scope.authentication = $authentication;
        }]);

})();
