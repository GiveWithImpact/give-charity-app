angular.module('starter')
    .controller('DashboardCtrl', function($scope, $ionicScrollDelegate, $rootScope, getData, $ionicModal, $cordovaNetwork, $ionicPlatform, StoreData, CameraService, USER_DATA, PROJECT_OBJECT) {
        var windowHeight;

        $rootScope.pictures = StoreData.getData('giveCharityApp');
        $scope.pictureArray = [];

        //Ionic modal
        $ionicModal.fromTemplateUrl('app/components/update-project/update-page.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        $scope.openModal = function(projectId, projectTitle) {
            $scope.title = projectTitle;
            getProjectPictures(projectId)
            $scope.modal.show();
        };

        function getProjectPictures(projectId) {
            $scope.pictureArray = [];
            for (i = 0; i < $rootScope.pictures.length; i++) {
                if (parseInt($rootScope.pictures[i].project_id) === projectId) {
                    $scope.pictureArray.push($rootScope.pictures[i])
                }
            }
        }

        function getDataFromBackend() {
            getData.get('updates/pending').then(function(success) {
                $scope.projectObject = success.data;
                StoreData.saveData($scope.projectObject, PROJECT_OBJECT)
            }, function(error) {});
            getData.get('user').then(function(success) {
                $scope.name = success.data.name;
                StoreData.saveData(success.data, USER_DATA)
            }, function(error) {});
        }


        function onAppStart() {
            if (navigator.connection.type !== "none") {
                getDataFromBackend();
            } else {
                $scope.projectObject = StoreData.getData(PROJECT_OBJECT);
                $scope.name = StoreData.getData(USER_DATA).name;
            }
        }
        $ionicPlatform.ready(function() {
            onAppStart();
        });
    })
