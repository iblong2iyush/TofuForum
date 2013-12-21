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
            Navigation){
            Navigation.addSafeRoute('/login');
            Navigation.addSafeRoute('/signup');
            Navigation.setDefaultRoute('/login');
        });
    
})();
