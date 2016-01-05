angular.module('starter')
    .controller('LoginCtrl', function($scope, $state, $ionicPopup, $cordovaNetwork, AuthService) {
        //First it checks if there is internet connection & if login form is valid,
        // if those 2 are on/correct it goes to AuthService
        //if one of them is off/wrong popout with message gonna show
        $scope.login = function(data) {
            $scope.isOnline = $cordovaNetwork.isOnline();
            if (data.$valid && $scope.isOnline) {
                AuthService.login(data.userData)
            } else if (!$scope.isOnline) {
                $ionicPopup.alert({
                    title: 'Connection problem',
                    template: 'There is no internet connection, please check it and try once again'
                });
            } else if (!data.$valid) {
                $ionicPopup.alert({
                    title: 'Login Form',
                    template: 'It seems that you have not fill correctly login form!'
                });
            }
        };

    })
