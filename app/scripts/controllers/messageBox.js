// jshint indent:4

(function(){
    
    'use strict';

    var module = angular.module('tofuForumApp');
    module.value('MessageboxEvent','MessageboxEvent');
    module.value('MessageboxAlertType','alert');
    module.value('MessageboxInfoType','info');
    module.controller('MessageboxCtrl', function ($scope,MessageboxAlertType,MessageboxInfoType,Message,MessageboxEvent) {

        $scope.messages = [];

        var receiveMessage = function(event,data) {
            console.log('We got a message');
            addMessage(data.type,data.message);
        };

        var addMessage = function (type,message) {
            $scope.messages.push({type:type,message:message});
        };

        Message.register(MessageboxEvent,receiveMessage);

        $scope.alert = function(message) {
            addMessage(MessageboxAlertType,message);
        };
        $scope.info = function(message) {
            addMessage(MessageboxInfoType,message);
        };
        $scope.close = function(index) {
            $scope.messages.splice(index,1);
        };
    });

})();
