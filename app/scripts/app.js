// jshint indent:4

(function(){
    
    'use strict';
    
    angular.module('tofuForumApp', [
        'ui.bootstrap',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
    ])
        .config(function (
            $routeProvider,
            $locationProvider) {
            $routeProvider
                .when('/login', {
                    templateUrl: 'views/login.html',
                    controller: 'LoginCtrl'
                })
                .when('/signup', {
                    templateUrl: 'views/signup.html',
                    controller: 'SignupCtrl'
                })
                .when('/main', {
                    templateUrl: 'views/main.html',
                    controller: 'MainCtrl'
                })
                .when('/password', {
                    templateUrl: 'views/password.html',
                    controller: 'PasswordCtrl'
                })
                .otherwise({
                    redirectTo: '/main'
                });
            $locationProvider.html5Mode(false).hashPrefix('');
        })
        .run(function(
            $rootScope,
            $location,
            Authentication){
            var unauthenticatedRoutes = ['/login','/signup'];
            var routeNeedsAuthentication = function(route) {
                for (var index=0; index<unauthenticatedRoutes.length; index++ ) {
                    if (unauthenticatedRoutes[index] === route) {
                        return false;
                    }
                }
                return true;
            };
            $rootScope.$on('$routeChangeStart', function () {
                if (!routeNeedsAuthentication($location.url())){
                    return;
                }
                if (Authentication.authenticated) {
                    return;
                }
                $location.path('/login');
            });
        });

})();
