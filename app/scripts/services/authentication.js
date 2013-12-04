// jshint indent:4

(function(){

    'use strict';

    var module = angular.module('tofuForumApp');
    module.value('loginUrl','/php/login.php');
    module.value('logoutUrl','/php/logout.php');
    module.factory('Authentication',['$http','loginUrl','logoutUrl',function($http,loginUrl,logoutUrl){
        var service = {};
        service.authenticated = false;
        service.login = function(userCredentials,successCallback,errorCallback){
            service.authenticated = false;
            $http.post(loginUrl,userCredentials).success(function(data,status,headers,config){
                service.authenticated = true;
                successCallback(data,status,headers,config);
            }).error(function(data,status,headers,config){
                errorCallback(data,status,headers,config);
            });
        };
        service.logout = function(successCallback,errorCallback){
            $http.post(logoutUrl).success(function(data,status,headers,config){
                service.authenticated = false;
                successCallback(data,status,headers,config);
            }).error(function(data,status,headers,config){
                errorCallback(data,status,headers,config);
            });
        };
        return service;
    }]);

})();
