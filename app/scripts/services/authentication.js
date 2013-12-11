// jshint indent:4

(function(){

    'use strict';

    var module = angular.module('tofuForumApp');
    module.value('loginUrl','/php/login.php');
    module.value('logoutUrl','/php/logout.php');
    module.factory('Authentication',['$http','loginUrl','logoutUrl','signupUrl',function($http,loginUrl,logoutUrl){
        
        var service = {};
        
        service.authenticated = false;
        
        service.login = function(userCredentials,successCallback,errorCallback){
            $http.post(loginUrl,userCredentials).success(function(data,status,headers,config){
                service.authenticated = (data.code === 0);
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
