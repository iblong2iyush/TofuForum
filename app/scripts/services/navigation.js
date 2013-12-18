// jshint indent:4
// jshint bitwise: false

(function(){

    'use strict';
    var installIndexOfFunctionIfMissing = function() {
        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function (obj, fromIndex) {
                if (fromIndex === null) {
                    fromIndex = 0;
                } else if (fromIndex < 0) {
                    fromIndex = Math.max(0, this.length + fromIndex);
                }
                for (var i = fromIndex, j = this.length; i < j; i++) {
                    if (this[i] === obj) {
                        return i;
                    }
                }
                return -1;
            };
        }
    };
    
    var module = angular.module('tofuForumApp');
    module.factory('Navigation', function Navigation($location,$rootScope,Authentication) {
        installIndexOfFunctionIfMissing();
        var history = [];
        var defaultRoute = '/';
        var safeRoutes = [];
        var routeNeedsAuthentication = function(route) {
            for (var index=0; index<safeRoutes.length; index++ ) {
                if (safeRoutes[index] === route) {
                    return false;
                }
            }
            return true;
        };
        var service = {
            gotoUrl: function(url) {
                $location.path(url);
            },
            goBack: function() {
                if (history.length===0) {
                    return service.gotoUrl(service.getDefaultRoute());
                }
                var returnUrl = history.pop();
                return service.gotoUrl(returnUrl);
            },
            setDefaultRoute: function(route) {
                defaultRoute = route;
            },
            getDefaultRoute: function(){
                return defaultRoute;
            },
            addSafeRoute: function(route) {
                safeRoutes.push(route);
            },
            removeSafeRoute: function(route) {
                var index = safeRoutes.indexOf(route);
                safeRoutes.splice(index,1);
            }
            
        };

        $rootScope.$on('$routeChangeSuccess', function(event,current/*,previous*/) {
            history.push(current);
        });

        $rootScope.$on('$routeChangeStart', function (event,next/*,current*/) {
            if (Authentication.authenticated) {
                return;
            }
            if (!routeNeedsAuthentication(next)){
                return;
            }
            service.gotoUrl(service.getDefaultRoute());
        });

        return service;
    });

})();
