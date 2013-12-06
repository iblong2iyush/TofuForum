// jshint indent:4

(function(){

    'use strict';

    angular.module('tofuForumApp')
        .factory('Message', function($rootScope) {
            var broadcastScope = $rootScope.$new();
            var functionRegistry = {};
            var addListener = function(eventName,listener,value) {
                if (!(listener in functionRegistry)) {
                    functionRegistry[listener] = {};
                }
                var dictionary = functionRegistry[listener];
                if (eventName in dictionary) {
                    return service;
                }
                dictionary[eventName] = value;
                return service;
            };
            var removeListener = function(eventName,listener) {
                if (listener in functionRegistry) {
                    var dictionary = functionRegistry[listener];
                    if (eventName in dictionary) {
                        var returnFunction = dictionary[eventName];
                        delete dictionary[eventName];
                        returnFunction();
                    }
                }
                return service;
            };
            var service = {
                register: function(eventName,listener) {
                    var unregister = broadcastScope.$on(eventName,listener);
                    addListener(eventName,listener,unregister);
                    return service;
                },
                unregister: function(eventName,listener) {
                    removeListener(eventName,listener);
                    return service;
                },
                send: function(eventName,data) {
                    broadcastScope.$emit(eventName,data);
                    return service;
                },
                _reset: function() {
                    functionRegistry = {};
                }
            };
            return service;
        });
    
})();