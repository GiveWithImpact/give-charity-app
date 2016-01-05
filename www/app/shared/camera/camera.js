angular.module('starter')
    .service('CameraService', function($cordovaCamera, $cordovaFile, $q, StoreData) {
        var ARRAY_STORAGE_KEY = 'giveCharityApp';
        var updateArray = [];
        var image;
        var array;
        var source;
        var save;

        this.getImage = function() {
            return image;
        };

        //Options for CordovaCamera 
        this.optionsForType = function(type) {
            switch (type) {
                case 0:
                    source = Camera.PictureSourceType.CAMERA;
                    break;
                case 1:
                    source = Camera.PictureSourceType.PHOTOLIBRARY;
                    break;
            }
            return {
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: source,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
            };
        };
        this.loadMedia = function() {
            array = StoreData.getData('giveCharityApp');
            if (array) {
                updateArray = array;
            } else {
                updateArray = [];
            }
            return updateArray;
        };
        //Take a picture and encode it in base64
        this.saveMedia = function(options) {
                return $q(function(resolve, reject) {
                    $cordovaCamera.getPicture(options)
                        .then(function(imageUrl) {
                            image = imageUrl;
                            resolve();
                        }, function(e) {
                            reject();
                        });
                })
            }
            //Storage an array of updates
        this.saveUpdate = function(update) {
            updateArray.push(update)
            StoreData.saveData(updateArray, 'giveCharityApp')
        };
    });
