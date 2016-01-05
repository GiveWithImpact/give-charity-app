angular.module('starter')
    .directive('goBack', function($window) {
        return function($scope, $element) {
            $element.on('click', function() {
                $window.history.back();
            })
        }
    });
