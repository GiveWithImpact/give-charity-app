 'use strict';
 describe("Service: AuthService", function() {
     beforeEach(module('starter'));

     var AuthService;
     beforeEach(inject(function(_AuthService_) {
         AuthService = _AuthService_;
     }));


     it('should load saved token in local storage, and save it to header', inject(function($http) {
         var token = "jnsdfu23HB2NInsdin";
         window.localStorage.setItem("tokenKey", token);
         AuthService.loadUserCredentials();
         var headerToken = $http.defaults.headers.common['X-Auth-Token'];
         expect(headerToken).toMatch(token)
     }));
 });
