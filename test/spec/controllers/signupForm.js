// jshint indent:4

(function(){

    'use strict';

    describe('Controller: SignupformCtrl', function () {
        
        // load the controller's module
        beforeEach(module('tofuForumApp'));
        
        var SignupformCtrl,
        scope;
        
        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            SignupformCtrl = $controller('SignupformCtrl', {
                $scope: scope
            });
        }));
        
        it('Test isNotMatchingPasswords Passwords Match', function () {
            scope.user = {
                'userPassword': 'asasasasas',
                'userPasswordConfirm': 'asasasasas'
            };
            expect(scope.isNotMatchingPasswords()).toBe(false);
        });
        
        it('Test isNotMatchingPasswords Passwords Do Not Match', function () {
            scope.user = {
                'userPassword': 'asasasasas1',
                'userPasswordConfirm': '1asasasasas'
            };
            expect(scope.isNotMatchingPasswords()).toBe(true);
        });
        
        it('Test isNotMatchingPasswords userPassword is missing', function () {
            scope.user = {
                'userPasswordConfirm': '1asasasasas'
            };
            expect(scope.isNotMatchingPasswords()).toBe(true);
        });
        
        it('Test isNotMatchingPasswords userPasswordConfirm is missing', function () {
            scope.user = {
                'userPassword': 'asasasasas1'
            };
            expect(scope.isNotMatchingPasswords()).toBe(true);
        });

    });
    
})();
