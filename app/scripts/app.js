// jshint indent:4

(function(){
    
    'use strict';
    
    angular.module('tofuForumApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
    ])
        .config(function (
            $routeProvider,
            $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'MainCtrl'
                })
                .when('/login', {
                    templateUrl: 'views/login.html',
                    controller: 'LoginCtrl'
                })
                .when('/signup', {
                    templateUrl: 'views/signup.html',
                    controller: 'SignupCtrl'
                })
                .otherwise({
                    redirectTo: '/login'
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
