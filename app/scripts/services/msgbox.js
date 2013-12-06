// jshint indent:4

(function(){

    'use strict';

    var module = angular.module('tofuForumApp');
    module.factory('Msgbox', function(Message,MessageboxEvent,MessageboxAlertType,MessageboxInfoType) {
        var service = {
            alert: function(message){
                Message.send(MessageboxEvent,{type:MessageboxAlertType,message:message});
            },
            info: function(message){
                Message.send(MessageboxEvent,{type:MessageboxInfoType,message:message});
            }
        };
        return service;
    });
               

})();
