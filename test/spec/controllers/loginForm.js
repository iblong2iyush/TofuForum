// jshint indent:4

(function(){

    'use strict';

    describe('Controller: LoginformCtrl', function () {

        // load the controller's module
        beforeEach(module('tofuForumApp'));

        var LoginformCtrl,
        scope;
        
        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            LoginformCtrl = $controller('LoginformCtrl', {
                $scope: scope
            });
        }));
        
        it('should attach a list of awesomeThings to the scope', function () {

        });
    });

})();
