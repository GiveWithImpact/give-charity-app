giveCharityApp
    .controller('DashboardCtrl', function($scope, $ionicScrollDelegate, $rootScope, getData, $ionicModal, $cordovaNetwork, StoreData, CameraService, USER_DATA, PROJECT_OBJECT) {
        var windowHeight;

        $rootScope.getPictures = StoreData.getData('giveCharityApp');
        $scope.scrollHeight = tabsHeight();
        $scope.pictureArray = [];
        //Updates ion-scroll height in dashboard tabs on orientation change, 
        //maybe it's not a function that was requierd ,but wihtout it it looks much worse

        window.addEventListener("orientationchange", function() {
            $scope.scrollHeight = tabsHeight();
            $scope.$digest();
        }, false);

        function isOrientationPortrait() {
            return window.innerHeight > window.innerWidth
        }

        function tabsHeight() {
            windowHeight = window.innerHeight;
            if (isOrientationPortrait()) {
                return windowHeight - 361;
            } else {
                return windowHeight - 100;
            }
        }

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
            for (i = 0; i < $rootScope.getPictures.length; i++) {
                if (parseInt($rootScope.getPictures[i].project_id) === projectId) {
                    $scope.pictureArray.push($rootScope.getPictures[i])
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
            if ($cordovaNetwork.isOnline()) {
                getDataFromBackend();
            } else {
                $scope.projectObject = StoreData.getData(PROJECT_OBJECT);
                $scope.name = StoreData.getData(USER_DATA).name;
            }
        }
        onAppStart();

    })
