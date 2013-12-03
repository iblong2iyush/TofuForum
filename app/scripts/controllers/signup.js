// jshint indent:4

(function(){
    
    'use strict';
    
    angular.module('tofuForumApp')
        .controller('SignupCtrl', function ($scope,$location) {
            $scope.gotoUrl = function(url) {
                $location.path(url);
            };
        });

})();
