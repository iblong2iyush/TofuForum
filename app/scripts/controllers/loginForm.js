// jshint indent:4

(function(){

    'use strict';

    var module = angular.module('tofuForumApp');
    module.controller('LoginformCtrl', function ($scope,Navigation,Msgbox,Authentication) {
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
                    Navigation.gotoFailedRouteOrHere('/main');
                },
                function(data){
                    Msgbox.alert(data.message);
                });
        };
    });

})();
