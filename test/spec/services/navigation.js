// jshint indent:4
(function(){
    
    'use strict';

    describe('Service: Navigation', function () {

        // instantiate service
        var Navigation,
        Scope,
        Location,
        Authentication,
        $httpBackend,
        $templateCache;
                
        // load the service's module
        beforeEach(module('tofuForumApp'));
        
        beforeEach(function(){
            inject(['Navigation','$rootScope','$location','Authentication','$httpBackend','$templateCache',function (_Navigation_,_RootScope_,_Location_,_Authentication_,_HttpBackend_,_templateCache_) {
                Navigation = _Navigation_;
                Scope = _RootScope_;
                Location = _Location_;
                Authentication = _Authentication_;
                $httpBackend = _HttpBackend_;

                $templateCache = _templateCache_;
                $templateCache.put('views/signup.html', 'Signup View Template');
                $templateCache.put('views/login.html', 'Login View Template');
                $templateCache.put('views/main.html', 'Main View Template');
 
                Navigation.setDefaultRoute('/login');
                Navigation.addSafeRoute('/signup');
                Navigation.addSafeRoute('/login');
            }]);
        });

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('Go to a unprotected Url', function () {
            Navigation.gotoUrl('/signup');
            Scope.$digest();
            expect(Location.path()).toEqual('/signup');
        });

        it('Go to a protected route while unauthenticated', function () {
            Authentication.authenticated = false;
            Navigation.gotoUrl('/main');
            Scope.$digest();
            expect(Location.path()).toEqual(Navigation.getDefaultRoute());
        });

        it('Go to a protected route while authenticated', function () {
            Authentication.authenticated = true;
            Navigation.gotoUrl('/main');
            Scope.$digest();
            expect(Location.path()).toEqual('/main');
        });

        it('Go back when history is empty', function () {
            Navigation.goBack();
            expect(Location.path()).toEqual(Navigation.getDefaultRoute());
        });

        it('Go back when authenticated and history has two entries', function () {
            Authentication.authenticated = true;
            Navigation.gotoUrl('/signup');
            Scope.$digest();
            expect(Location.path()).toEqual('/signup');
            Navigation.gotoUrl('/login');
            Scope.$digest();
            expect(Location.path()).toEqual('/login');
            Navigation.gotoUrl('/main');
            Scope.$digest();
            expect(Location.path()).toEqual('/main');
            Navigation.goBack();
            Scope.$digest();
            expect(Location.path()).toEqual('/login');
            Navigation.goBack();
            Scope.$digest();
            expect(Location.path()).toEqual('/signup');
        });

    });

})();
