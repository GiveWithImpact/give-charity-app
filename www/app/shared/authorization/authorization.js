giveCharityApp
    .service('AuthService', function($q, $http, $rootScope, $ionicPopup, postData) {

        var LOCAL_TOKEN_KEY = 'tokenKey';
        var alertPopup;
        // Load token from the local.storage
        var loadUserCredentials = function() {
                var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
                if (token) {
                    useCredentials(token);
                }
            }
            // Store token from the server to the local.storage
        function storeUserCredentials(token) {
            window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
            useCredentials(token);
        }

        function useCredentials(token) {
            // Set the token as header for future requests
            $http.defaults.headers.common['X-Auth-Token'] = token;
        }

        function destroyUserCredentials() {
            $http.defaults.headers.common['X-Auth-Token'] = undefined;
            window.localStorage.removeItem(LOCAL_TOKEN_KEY);
        }
        // Sends email and password to backend if everything goes right 
        // fire broadcast witch resend stored POST/GET requests
        var login = function(userData) {
            postData.post("auth/login", userData).then(
                function(success) {
                    storeUserCredentials(success);
                    $rootScope.$broadcast('event:loginConfirmed');
                },
                function(error) {
                    alertPopup = $ionicPopup.alert({
                        title: 'Login Problem',
                        template: 'Wrong Password or Email'
                    });
                })
        }

        var logout = function() {
            destroyUserCredentials();
        };

        return {
            login: login,
            logout: logout,
            loadUserCredentials: loadUserCredentials
        };
    })
