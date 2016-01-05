angular.module('starter')
    .controller('LandingCtrl', function($scope, $ionicPopup, getData, postData, StoreData, PROJECT_OBJECT, USER_DATA) {
        //In final stage this data will come from backend..
        $scope.timeOptions = [2, 4, 6];
        $scope.postponeTime = $scope.timeOptions[0];

        function getDataFromBackend() {
            getData.get('updates/pending').then(function(success) {
                $scope.projectObject = success.data;
            }, function(error) {});
            getData.get('user').then(function(success) {
                $scope.name = success.data.name;
            }, function(error) {});
        }

        $scope.postpone = function(postptoneTime) {
            postData.post('/account/notifications', {}).then(function(success) {
                //I still dont know how JSON gonna look....
            }, function(error) {});
            alertPopup = $ionicPopup.alert({
                title: 'Postpone',
                template: 'You will get another notification in ' + postponeTime + ' hours'
            });
        }

        function onAppStart() {
            if (navigator.connection.type !== "none") {
                getDataFromBackend();
            } else {
                $scope.projectObject = StoreData.getData('PROJECT_OBJECT');
                $scope.name = StoreData.getData('USER_DATA').name;
            }
        }
        onAppStart();
    })
