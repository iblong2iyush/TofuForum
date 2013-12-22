// jshint indent:4

(function(){

    'use strict';

    var module = angular.module('tofuForumApp');
    module.controller('MenubarCtrl', function ($scope,$location,Navigation,Msgbox,Authentication) {

        $scope.navigation = Navigation;

        $scope.logout = function() {
            Authentication.logout(
                function(data,status){
                    if (status!==200) {
                        Msgbox.alert('HTTP Code:'+status+' is not normal');
                        return;
                    }
                    if (data.code!==0) {
                        Msgbox.alert(data.message);
                        return;
                    }
                    Navigation.gotoUrl('/logout');
                },
                function(data,status){
                    if (status===404) {
                        Msgbox.alert('Logout script is missing.');
                        return;
                    }
                    if (status===500) {
                        Msgbox.alert('Server internal error.');
                        return;
                    }
                    Msgbox.alert('HTTP Error: '+status);
                    return;
                }
            );
        };

        $scope.activeTab = function(location) {
            return {
                'active': ($location.path()===location)
            };
        };

        $scope.activeCursor = function(location) {
            return {
                'pointer-default': ($location.path()!==location)
            };
        };

        $scope.goTab = function(target) {
            if ($location.path()!==target) {
                Navigation.gotoUrl(target);
            }
        };

    });
    
})();
