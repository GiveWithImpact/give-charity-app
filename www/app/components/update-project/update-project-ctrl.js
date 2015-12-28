giveCharityApp
    .controller('UpdateProjectCtrl', function($scope, $ionicPlatform, $cordovaNetwork, $rootScope, $ionicModal, $ionicPopup, $stateParams, CameraService, postData) {
        var options;
        var i;
        var updateArray;
        $rootScope.getPictures = CameraService.getArray();
        $ionicPlatform.ready(function() {
            CameraService.getArray();
        });
        $scope.title = $stateParams.title;

        function getProjectPictures() {
            $scope.pictureArray = [];
            for (i = 0; i < $rootScope.getPictures.length; i++) {
                if ($rootScope.getPictures[i].project_id === $stateParams.projectId)
                    $scope.pictureArray.push($rootScope.getPictures[i])
            }
        }
        $scope.showPicture = false;
        $scope.updateProject = {
                mediafile: "",
                comment: "",
                project_id: $stateParams.projectId,
                date: "",
                status: "Pending"
            }
            // Invoke function from service wich by using ngCamera takes photo
        $scope.takeImage = function(index) {
                options = CameraService.optionsForType(index);
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
            $rootScope.getPictures = CameraService.getArray();
            alertPopup = $ionicPopup.alert({
                title: 'Update',
                template: 'Update has been made and saved in storage!'
            });
            sendData();
        }


        $scope.network = $cordovaNetwork.getNetwork();
        $scope.isOnline = $cordovaNetwork.isOnline();
        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
            sendData();
        })

        function sendData() {
            $scope.network = $cordovaNetwork.getNetwork();
            if ($scope.network == 'wifi') {
                updateArray = CameraService.getArray();
                if (updateArray.length > 0) {
                    postData.post("projects/update", $rootScope.getPictures).then(function() {}, function() {})
                }
            }
            $scope.$digest();
        }

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
            getProjectPictures()
        };


    })
