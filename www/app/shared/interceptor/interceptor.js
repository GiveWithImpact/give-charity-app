giveCharityApp
    .factory('HttpInterceptor', function($q, $rootScope) {
        return {
            'request': function(config) {
                return config;
            },

            'requestError': function(rejection) {
                if (canRecover(rejection)) {
                    return responseOrNewPromise
                }
                return $q.reject(rejection);
            },

            // optional method
            'response': function(response) {
                // do something on success
                return response;
            },
            //If ther is 401 error on POST/GET it store that request and fire broadcast with login request
            'responseError': function(rejection) {
                // do something on error
                var status = rejection.status;
                if (status === 401) {
                    var deferred = $q.defer();
                    var req = {
                        config: rejection.config,
                        deferred: deferred
                    };
                    $rootScope.requests401.push(req);
                    $rootScope.$broadcast('event:loginRequest');
                    return deferred.promise;
                }
                return $q.reject(rejection);
            }
        };
    });
