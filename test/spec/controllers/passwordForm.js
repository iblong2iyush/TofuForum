// jshint indent:4

(function(){
    
    'use strict';
    
    describe('Controller: PasswordformCtrl', function () {
        
        // load the controller's module
        beforeEach(module('tofuForumApp'));
        
        var PasswordformCtrl,
        scope;
        
        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            PasswordformCtrl = $controller('PasswordformCtrl', {
                $scope: scope
            });
        }));
        
        it('Test isNotMatchingPasswords Passwords Match', function () {
            scope.user = {
                'userNewPassword': 'asasasasas',
                'userNewPasswordConfirm': 'asasasasas'
            };
            expect(scope.isNotMatchingPasswords()).toBe(false);
        });
        
        it('Test isNotMatchingPasswords Passwords Do Not Match', function () {
            scope.user = {
                'userNewPassword': 'asasasasas1',
                'userNewPasswordConfirm': '1asasasasas'
            };
            expect(scope.isNotMatchingPasswords()).toBe(true);
        });
        
        it('Test isNotMatchingPasswords userNewPassword is missing', function () {
            scope.user = {
                'userNewPasswordConfirm': '1asasasasas'
            };
            expect(scope.isNotMatchingPasswords()).toBe(true);
        });
        
        it('Test isNotMatchingPasswords userNewPasswordConfirm is missing', function () {
            scope.user = {
                'userNewPassword': 'asasasasas1'
            };
            expect(scope.isNotMatchingPasswords()).toBe(true);
        });

    });
    
})();
