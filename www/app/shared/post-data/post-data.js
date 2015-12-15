'use strict';

angular.module('starter')
    .service('postData', function($http) {

        var offersPath = "http://private-anon-d63c4600e-give.apiary-mock.com/";

        this.post = function(postString, data) {
            return $http.post(offersPath + postString, data);
        }
    });
