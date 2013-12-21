// jshint indent:4

(function(){
    
    'use strict';

    angular.module('tofuForumApp')
        .controller('LoginCtrl', ['$scope','Navigation',function (
            $scope,
            Navigation) {
            $scope.navigation = Navigation;
        }]);

})();
