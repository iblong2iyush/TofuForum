// jshint indent:4

(function(){

    'use strict';

    angular.module('tofuForumApp')
        .controller('MainCtrl', ['$scope',function ($scope) {

            $scope.passwords = function() {
                console.log('Passwords is activated');
            };

            $scope.logout = function() {
                console.log('Logout is activated');
            };

            console.log('MainCtrl is activated');
            
        }]);

})();
