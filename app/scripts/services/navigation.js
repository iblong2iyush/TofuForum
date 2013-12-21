// jshint indent: 4
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
    module.factory('Navigation', function Navigation($location,$route,$rootScope,Authentication) {
        installIndexOfFunctionIfMissing();
        var failedRoute = '';
        var history = [];
        var defaultRoute = '/';
        var safeRoutes = [];
        var isGoingBack = false;

        var routeNeedsAuthentication = function(route) {
            for (var index = 0; index < safeRoutes.length; index++ ) {
                if (safeRoutes[index] === route) {
                    return false;
                }
            }
            return true;
        };

        var originalPathInRouteIsValid = function(route) {
            if (typeof route === 'undefined') {
                return false;
            }
            if (typeof route.originalPath === 'undefined') {
                return false;
            }
            return true;
        };

        var pushOriginalPathIntoHistory = function(route) {
            if (isGoingBack) {
                isGoingBack = false;
                return;
            }
            if (originalPathInRouteIsValid(route)) {
                history.push(route.originalPath);
            }
        };

        var service = {
            gotoUrl: function(gotoUrl) {
                $location.path(gotoUrl);
            },
            goBack: function() {
                var returnUrl;
                if (history.length === 0) {
                    returnUrl = service.getDefaultRoute();
                } else {
                    returnUrl = history.pop();
                }
                isGoingBack = true;
                service.gotoUrl(returnUrl);
                return;
            },
            setDefaultRoute: function(newRoute) {
                defaultRoute = newRoute;
            },
            getDefaultRoute: function(){
                return defaultRoute;
            },
            addSafeRoute: function(newRoute) {
                safeRoutes.push(newRoute);
            },
            removeSafeRoute: function(existingRoute) {
                var index = safeRoutes.indexOf(existingRoute);
                safeRoutes.splice(index,1);
            },
            gotoFailedRouteOrHere: function(url) {
                var route = url;
                if (failedRoute!=='') {
                    route = failedRoute;
                    failedRoute = '';
                }
                service.gotoUrl(route);
            }
            
        };

        $rootScope.$on('$routeChangeStart', function (event,next,current) {
            
            if (Authentication.authenticated) {
                pushOriginalPathIntoHistory(current);
                return;
            }
            
            // move the originalPathInRouteIsValid check into the functions
            if (originalPathInRouteIsValid(next)){
                if (!routeNeedsAuthentication(next.originalPath)) {
                    pushOriginalPathIntoHistory(current);
                    return;
                }
                failedRoute = next.originalPath;
            }
            service.gotoUrl(service.getDefaultRoute());
        });
        
        return service;
        
    });

})();
