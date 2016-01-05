angular.module('starter')
    .controller('UpdateProjectCtrl', function($scope, $ionicPlatform, $cordovaNetwork, $rootScope, $ionicModal, $ionicPopup, $stateParams, CameraService, postData, StoreData) {
        var options;
        var i;
        var updateArray;
        $rootScope.pictures = StoreData.getData('giveCharityApp');
        $scope.title = $stateParams.title;

        $ionicPlatform.ready(function() {
            CameraService.loadMedia();
        });

        function getProjectPictures() {
            $scope.pictureArray = [];
            for (i = 0; i < $rootScope.pictures.length; i++) {
                if ($rootScope.pictures[i].project_id === $stateParams.projectId)
                    $scope.pictureArray.push($rootScope.pictures[i])
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
        $scope.takeImage = function(optionId) {
                options = CameraService.optionsForType(optionId);
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
            $rootScope.pictures = StoreData.getData('giveCharityApp');
            alertPopup = $ionicPopup.alert({
                title: 'Update',
                template: 'Update has been made and saved in storage!'
            });
            sendData();
        }

        // listen for Online event
        document.addEventListener("online", function(event, networkState) {
            sendData();
        }, false)

        function sendData() {
            $scope.network = $cordovaNetwork.getNetwork();
            if ($scope.network == 'wifi') {
                updateArray = StoreData.getData('giveCharityApp');
                if (updateArray.length > 0) {
                    postData.post("projects/update", $rootScope.pictures).then(function() {}, function() {})
                }
            }
            // $scope.$digest();
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
