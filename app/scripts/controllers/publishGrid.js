// jshint indent:4

(function(){

    'use strict';

    var module = angular.module('tofuForumApp');
    module.controller('PublishgridCtrl', function ($scope) {
        $scope.myData = [{name: 'Moroni', age: 50},
                         {name: 'Tiancum', age: 43},
                         {name: 'Jacob', age: 27},
                         {name: 'Nephi', age: 29},
                         {name: 'Enos', age: 34}];
        $scope.gridOptions = { data: 'myData' };
    });

})();
