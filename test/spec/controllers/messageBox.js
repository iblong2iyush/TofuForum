// jshint indent:4

(function(){
    'use strict';
    
    describe('Controller: MessageboxCtrl', function () {

        // load the controller's module
        beforeEach(module('tofuForumApp'));
        
        var MessageboxCtrl,
        scope,AlertType,InfoType;
        
        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope, MessageboxAlertType, MessageboxInfoType) {
            scope = $rootScope.$new();
            AlertType = MessageboxAlertType;
            InfoType = MessageboxInfoType;
            MessageboxCtrl = $controller('MessageboxCtrl', {
                $scope: scope
            });
        }));

        it('Adding three messages', function () {
            scope.alert('This is alert 1');
            scope.alert('This is alert 2');
            scope.info('This is alert 3');
            expect(scope.messages.length).toBe(3);
            expect(scope.messages[0].type).toBe(AlertType);
            expect(scope.messages[1].type).toBe(AlertType);
            expect(scope.messages[2].type).toBe(InfoType);
        });
    });

})();