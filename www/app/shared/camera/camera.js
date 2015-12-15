giveCharityApp.service('CameraService', function($cordovaCamera, $cordovaFile, $q) {
    var ARRAY_STORAGE_KEY = 'giveCharityApp';
    var updateArray = [];
    var image;
    // Function is called on on app start, gets images from localStorage parse them and put in images array
    this.getImage = function() {
        return image;
    };

    //Options for CordovaCamera 
    this.optionsForType = function(type) {
        var source;
        var save;
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
            saveToPhotoAlbum: false
        };
    };

    //Gets array from localStorage
    this.getArray = function() {
        var array = window.localStorage.getItem(ARRAY_STORAGE_KEY);
        if (array) {
            updateArray = JSON.parse(array);
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
        window.localStorage.setItem(ARRAY_STORAGE_KEY, JSON.stringify(updateArray));
    };
});
