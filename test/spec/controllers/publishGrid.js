// jshint indent:4

(function(){
    
    'use strict';
    
    describe('Controller: PublishgridCtrl', function () {
        
        // load the controller's module
        beforeEach(module('tofuForumApp'));

        var PublishgridCtrl,
        scope;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            PublishgridCtrl = $controller('PublishgridCtrl', {
                $scope: scope
            });
        }));

        it('should attach a list of awesomeThings to the scope', function () {

        });
    });

})();
