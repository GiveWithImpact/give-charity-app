'use strict';

angular.module('starter')
    .service('postData', function($http) {

        var offersPath = "http://85.13.248.159:8101/api/v0.1/";
        //For tests:
        // var offersPath = "http://private-anon-d63c4600e-give.apiary-mock.com/";

        this.post = function(postString, data) {
            return $http.post(offersPath + postString, data);
        }
    });
