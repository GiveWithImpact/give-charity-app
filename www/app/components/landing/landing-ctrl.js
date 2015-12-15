giveCharityApp
    .controller('LandingCtrl', function($scope, getData) {
        //In final stage this data will come from backend..
        $scope.projectNumber = 7;
        $scope.name = "Mathias";
        $scope.timeOptions = [2, 4, 6];

        getDataFromBackend = function() {
            getData.get('projects/updates/pending').then(function(success) {
                $scope.projectObject = success.data;
            }, function(error) {});
        }

        $scope.postptone = function(postptoneTime) {

            // postData.post('/account/notifications',).then(function(success) {
            //     //I still dont know how JSON gonna look....
            // }, function(error) {


            // });
        }
    })
