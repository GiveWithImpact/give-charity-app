'use strict';

angular.module('starter')
    .factory('getData', function($http) {

        var offersPath = "http://85.13.248.159:8101/api/v0.1/";
        //For fake data:
        // var offersPath = "http://private-7d07b0-give.apiary-mock.com/";
        return {
            'get': function(getString) {
                return $http.get(offersPath + getString);
            },
        };
    });
