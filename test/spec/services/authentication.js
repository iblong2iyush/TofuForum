// jshint indent:4

(function(){

    'use strict';

    describe('Service: Authentication', function () {
        
        // load the service's module
        beforeEach(module('tofuForumApp'));
        
        // instantiate service
        var Authentication,loginUrl,logoutUrl;
        beforeEach(inject(['Authentication','loginUrl','logoutUrl',function (_Authentication_,_loginUrl_,_logoutUrl_) {
            Authentication = _Authentication_;
            loginUrl = _loginUrl_;
            logoutUrl = _logoutUrl_;
        }]));
     
        // set up httpbackend
        var $httpBackend;
        beforeEach(inject(['$httpBackend',function(backend) {
            $httpBackend = backend;
        }]));

        var jsonResponse;
        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
            jsonResponse = {
                code: 0,
                message: 'ok'
            };
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
            $httpBackend.when('POST',loginUrl).respond(200,jsonResponse);
            Authentication.login(userCredentials,function(){},function(){});
            $httpBackend.flush();
            expect(Authentication.authenticated).toBe(true);
        });

        // test authenticated value after login failure
        
        it('Authenticated value after login failure', function() {
            $httpBackend.when('POST',loginUrl).respond(500,'Failure');
            Authentication.login(userCredentials,function(){},function(){});
            $httpBackend.flush();
            expect(Authentication.authenticated).toBe(false);
        });

        // test success function is called after login success

        it('Success function is called after login success', function() {
            var success = false;
            var failure = false;
            $httpBackend.when('POST',loginUrl).respond(200,jsonResponse);
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
            $httpBackend.when('POST',loginUrl).respond(500,'Failed');
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
            $httpBackend.when('POST',logoutUrl).respond(200,'Ok');
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
            $httpBackend.when('POST',logoutUrl).respond(500,'Failed');
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
