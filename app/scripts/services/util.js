// jshint indent:4

(function() {

    'use strict';

    var module = angular.module('tofuForumApp');

    module.factory('Util',function(){

        var service = {};

        service.stringStartsWith = function(source,head) {
            return source.lastIndexOf(head,0)===0;
        };

        service.removePropertiesWith = function(object,head) {
            var property;
            for (property in object) {
                if (service.stringStartsWith(property,head)) {
                    delete object[property];
                }
            }
            return object;
        };

        return service;

    });

})();
