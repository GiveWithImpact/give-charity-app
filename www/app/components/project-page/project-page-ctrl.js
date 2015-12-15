giveCharityApp
    .controller('ProjectPageCtrl', function($scope, $ionicModal, getData) {
        $scope.timeOptions = [2, 4, 6]
            //Prepare modal box from template if it is called uses slide-in-up animation.
        $ionicModal.fromTemplateUrl('app/components/project-page/project-page.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.postptone = function(postptoneTime) {
            // postData.post('/account/notifications',).then(function(success) {
            //     //I still dont know JSON gonna look....
            // }, function(error) {
            // });
        }
        getDataFromBackend = function() {
            getData.get('updates/pending').then(function(success) {
                $scope.projectObject = success.data;
            }, function(error) {});
        }
        getDataFromBackend();
    })
