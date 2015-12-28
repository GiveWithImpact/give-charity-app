angular.module('starter')
    .service('StoreData', function() {
        this.saveData = function(data, storageKey) {
            window.localStorage.setItem(storageKey, JSON.stringify(data));
        }

        this.getData = function(storageKey) {
            var array = window.localStorage.getItem(storageKey);
            if (array) {
                updateArray = JSON.parse(array);
            } else {
                updateArray = [];
            }
            return updateArray;
        };
    });
