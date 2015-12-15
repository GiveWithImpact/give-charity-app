giveCharityApp
    .controller('DashboardCtrl', function($scope, $ionicScrollDelegate, getData, CameraService) {
        var windowHeight;

        //In final stage this data will come from backend..
        $scope.projectNumber = 7;
        $scope.name = "Mathias";

        //Updates ion-scroll height in dashboard tabs on orientation change, 
        //maybe it's not a function that was requierd ,but wihtout it it looks much worse
        window.addEventListener("orientationchange", function() {
            $scope.scrollHeight = tabsHeight();
            $scope.$apply();
        }, false);

        function isOrientationPortrait() {
            if (window.innerHeight > window.innerWidth) {
                return true;
            } else {
                return false;
            }
        }
        var tabsHeight = function() {
            windowHeight = window.innerHeight;
            if (isOrientationPortrait()) {
                return windowHeight - 361;
            } else {
                return windowHeight - 100;
            }
        }
        $scope.getPictures = CameraService.getArray();
        $scope.scrollHeight = tabsHeight();
        getDataFromBackend = function() {
            getData.get('updates/pending').then(function(success) {
                $scope.projectObject = success.data;
            }, function(error) {});
        }
        getDataFromBackend();
    })
