// jshint indent:4

(function(){

    'use strict';

    var module = angular.module('tofuForumApp');
    module.controller('LoginformCtrl', function ($scope,Util,Msgbox,Authentication) {
        $scope.login = function(form) {
            if (!form.$valid) {
                Msgbox.alert('Please fill in all fields');
                return;
            }
            Authentication.login(
                $scope.user,
                function(data){
                    if (data.code!==0) {
                        Msgbox.alert(data.message);
                        return;
                    }
                    // success
                    Util.gotoUrl('/main');
                },
                function(data){
                    // error
                    Msgbox.alert(data.message);
                });
        };
    });

})();
