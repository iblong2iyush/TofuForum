// jshint indent:4

(function(){
    
    'use strict';

    angular.module('tofuForumApp')
        .controller('LoginCtrl', ['$scope','Util',function (
            $scope,
            $util) {
            $scope.gotoUrl = $util.gotoUrl;
        }]);

})();
