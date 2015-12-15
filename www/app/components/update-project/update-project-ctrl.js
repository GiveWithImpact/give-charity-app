giveCharityApp
    .controller('UpdateProjectCtrl', function($scope, $ionicPlatform, $cordovaNetwork, $rootScope, $ionicModal, $ionicPopup, CameraService, postData) {
        var options;
        $scope.getPictures = CameraService.getArray();
        $ionicPlatform.ready(function() {
            CameraService.getArray();
        });

        $scope.showPicture = false;
        $scope.updateProject = {
                mediafile: "",
                comment: "",
                project_id: "",
                date: "",
                status: "Pending"
            }
            // Invoke function from service wich by using ngCamera takes photo
        $scope.takeImage = function(index) {
                var options = CameraService.optionsForType(index);
                CameraService.saveMedia(options).then(function() {
                    $scope.updateProject.mediafile = CameraService.getImage();
                    $scope.showPicture = true;
                });
            }
            //On update button takes update Object and push it to array,
            //then save array in local storage
        $scope.update = function() {
                $scope.updateProject.date = Date.now();
                CameraService.saveUpdate($scope.updateProject);
                $scope.getPictures = CameraService.getArray();
                alertPopup = $ionicPopup.alert({
                    title: 'Update',
                    template: 'Update has been made and saved in storage!'
                });
                // postData.post("projects/update", $scope.getPictures ).then(function() {}, function() {})
            }
            // Event listener, checks if internet is on (for first demo it's wi-fi)
        document.addEventListener("deviceready", function() {
            $scope.network = $cordovaNetwork.getNetwork();
            $scope.isOnline = $cordovaNetwork.isOnline();
            $scope.$apply();
            // listen for Online event
            $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
                $scope.network = $cordovaNetwork.getNetwork();
                if ($scope.network == 'wifi') {
                    var updateArray = CameraService.getArray();
                    if (updateArray.length > 0) {
                        postData.post("projects/update", updateArray).then(function() {}, function() {})
                    }
                }
                $scope.$apply();
            })
        }, false);

        //Prepare modal box from template if it is called uses slide-in-up animation.
        $ionicModal.fromTemplateUrl('app/components/update-project/update-page.modal.html', {
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


    })
