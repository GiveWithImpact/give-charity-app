giveCharityApp
    .controller('ProjectPageCtrl', function($scope, $ionicModal, $ionicPopup, getData, postData) {
        $scope.timeOptions = [2, 4, 6];
        $scope.postponeTime = $scope.timeOptions[0];
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
        $scope.postpone = function(postponeTime) {
            postData.post('/account/notifications', {}).then(function(success) {
                //I still dont know JSON gonna look....
            }, function(error) {});
            alertPopup = $ionicPopup.alert({
                title: 'Postpone',
                template: 'You will get another notification in ' + postponeTime + ' hours'
            });
        }

        function getDataFromBackend() {
            getData.get('updates/pending').then(function(success) {
                $scope.projectObject = success.data;
            }, function(error) {});
        }
        getDataFromBackend();
    })
