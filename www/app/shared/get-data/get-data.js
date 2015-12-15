'use strict';

angular.module('starter')
    .service('getData', function($http) {

        // var offersPath = "http://85.13.248.159:8101/api/v0.1/";
        var offersPath = "http://private-7d07b0-give.apiary-mock.com/";

        return {
            'get': function(getString) {
                return $http.get(offersPath + getString);
            },
        };
    });
