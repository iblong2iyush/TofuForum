// jshint indent:4

(function(){

    'use strict';

    var module = angular.module('tofuForumApp');
    module.controller('SignupformCtrl', function ($scope,Util) {
            $scope.signup = function(form) {
                if (!form.$valid) {
                    console.log('Form is not valid.');
                    return;
                }
                var newForm = angular.copy(form);
                Util.removePropertiesWith(newForm,'$');
                console.log(newForm);
            };
        });

})();

