// jshint indent:4

(function(){

    'use strict';

    describe('Service: Authentication', function () {
        
        // load the service's module
        beforeEach(module('tofuForumApp'));
        
        // instantiate service
        var Authentication;
        beforeEach(inject(['Authentication',function (_Authentication_) {
            Authentication = _Authentication_;
        }]));
     
        // set up httpbackend
        var $httpBackend;
        beforeEach(inject(['$httpBackend',function(backend) {
            $httpBackend = backend;
        }]));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        // test default authenticated value
        it('Default value should be false', function() {
            expect(Authentication.authenticated).toBe(false);
        });
        
        var userCredentials = {
            name: 'Jerome Chan',
            password: 'moomoomoo'
        };

        // test authenticated value after login success

        it('Authenticated value after login success', function() {
            $httpBackend.when('POST','/login').respond(200,'Ok');
            Authentication.login(userCredentials,function(){},function(){});
            $httpBackend.flush();
            expect(Authentication.authenticated).toBe(true);
        });

        // test authenticated value after login failure
        
        it('Authenticated value after login failure', function() {
            $httpBackend.when('POST','/login').respond(500,'Failure');
            Authentication.login(userCredentials,function(){},function(){});
            $httpBackend.flush();
            expect(Authentication.authenticated).toBe(false);
        });

        // test success function is called after login success

        it('Success function is called after login success', function() {
            var success = false;
            var failure = false;
            $httpBackend.when('POST','/login').respond(200,'Ok');
            Authentication.login(userCredentials,function(){
                success = true;
            },function(){});
            $httpBackend.flush();
            expect(Authentication.authenticated).toBe(true);
            expect(success).toBe(true);
            expect(failure).toBe(false);
        });

        // test failure function is called after login failure

        it('Failure function is called after login failure', function() {
            var success = false;
            var failure = false;
            $httpBackend.when('POST','/login').respond(500,'Failed');
            Authentication.login(userCredentials,function(){
                success = false;
            },function(){
                failure = true;
            });
            $httpBackend.flush();
            expect(Authentication.authenticated).toBe(false);
            expect(success).toBe(false);
            expect(failure).toBe(true);
        });

        // test success function is called after logout success

        it('Success function is called after logout success', function() {
            var success = false;
            var failure = false;
            $httpBackend.when('POST','/logout').respond(200,'Ok');
            Authentication.logout(function(){
                success = true;
            },function() {
                failure = true;
            });
            $httpBackend.flush();
            expect(Authentication.authenticated).toBe(false);
            expect(success).toBe(true);
            expect(failure).toBe(false);
        });

        // test failure function is called after logout failure

        it('Failure function is called after logout failure', function() {
            var success = false;
            var failure = false;
            $httpBackend.when('POST','/logout').respond(500,'Failed');
            Authentication.logout(function(){
                success = true;
            },function() {
                failure = true;
            });
            $httpBackend.flush();
            expect(success).toBe(false);
            expect(failure).toBe(true);
        });
        
        
    });

})();
