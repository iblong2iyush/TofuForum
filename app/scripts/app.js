// jshint indent:4

(function(){
    
    'use strict';
    
    var module = angular.module('tofuForumApp', [
        'ui.bootstrap',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
    ]);
    module.config(function ($routeProvider,$locationProvider) {
        $routeProvider
            .when('/signup', {
                templateUrl: 'views/signup.html',
                controller: 'SignupCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/main', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/published', {
                templateUrl: 'views/published.html'
                //controller: 'MainCtrl'
            })
            .when('/subscribed', {
                templateUrl: 'views/subscribed.html'
                //controller: 'MainCtrl'
            })
            .when('/password', {
                templateUrl: 'views/password.html',
                controller: 'PasswordCtrl'
            })
            .when('/logout', {
                templateUrl: 'views/logout.html'
                //controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/main'
            });
        $locationProvider.html5Mode(false).hashPrefix('');
    })
        .run(function(
            Navigation){
            Navigation.addSafeRoute('/login');
            Navigation.addSafeRoute('/signup');
            Navigation.addSafeRoute('/logout');
            Navigation.setDefaultRoute('/login');
        });
    
})();
