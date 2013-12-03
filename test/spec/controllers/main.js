// jshint indent:4

(function(){
    
    'use strict';

    describe('Controller: MainCtrl', function () {
        
        // load the controller's module
        beforeEach(module('tofuForumApp'));
        
        var MainCtrl,
        scope;
        
        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            MainCtrl = $controller('MainCtrl', {
                $scope: scope
            });
        }));
        
        it('Scope should have authentication service attached to it', function () {
            // expect(scope.authentication).not().toBeNull(); 
        });

    });
    
})();
