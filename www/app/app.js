 angular.module('starter', ['ionic', 'ionic.contrib.drawer', 'ui.bootstrap', 'ngCordova', 'ngMessages', 'ngAnimate', "ngCordova.plugins.push"])

 .constant('PROJECT_OBJECT', 'PROJECT_OBJECT')

 .constant('USER_DATA', 'USER_DATA')

 .constant('GOOGLE_SENDER_ID', '738147804218')

 .run(['$rootScope', '$ionicPlatform', '$http', '$cordovaNetwork', '$state', 'AuthService', 'CameraService', '$location', '$cordovaDeviceOrientation', "GOOGLE_SENDER_ID", function(scope, $ionicPlatform, $http, $cordovaNetwork, $state, AuthService, CameraService, $location, $cordovaDeviceOrientation, GOOGLE_SENDER_ID) {
     $ionicPlatform.ready(function() {
         // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
         if (window.cordova && window.cordova.plugins.Keyboard) {
             cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
         }
         if (window.StatusBar) {
             StatusBar.styleDefault();
         }
         AuthService.loadUserCredentials();
     });

     // Holds all the requests which failed due to 401 response.
     scope.requests401 = [];
     //On 'event:loginConfirmed', resend all the 401 requests.
     scope.$on('event:loginConfirmed', function() {
         var i, requests = scope.requests401;
         for (i = 0; i < requests.length; i++) {
             retry(requests[i]);
         }
         scope.requests401 = [];

         function retry(req) {
             $http(req.config).then(function(response) {
                 req.deferred.resolve(response);
             });
         }
     });
     //On 'event:loginRequest' send credentials to the server.
     scope.$on('event:loginRequest', function() {
         $state.go('app.login');
     });

     //########## Notification #########
     //On deviceready prepares android for reciving notifications, forceShow - show notifiction when you are using app & when app is in background
     document.addEventListener("deviceready", function() {
         var push = PushNotification.init({
             android: {
                 senderID: GOOGLE_SENDER_ID,
                 forceShow: "true"
             }
         });
         // If app get Notification it goes to landing.page
         push.on('notification', function(data) {
             $state.go('app.landing');
         });

     })

 }])

 .config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
     $stateProvider
         .state('app', {
             url: '/app',
             abstract: true,
             templateUrl: 'app/shared/menu/menu.html'
         })
         .state('app.login', {
             url: '/login',
             cache: false,
             views: {
                 'menuContent': {
                     templateUrl: 'app/components/login/login.html',
                     controller: 'LoginCtrl'
                 }
             }
         })
         .state('app.dashboard', {
             url: '/dashboard',
             views: {
                 'menuContent': {
                     templateUrl: 'app/components/dashboard/dashboard.html',
                     controller: 'DashboardCtrl'
                 }
             }
         })
         .state('app.projectPage', {
             url: '/project-page',
             views: {
                 'menuContent': {
                     templateUrl: 'app/components/project-page/project-page.html',
                     controller: 'ProjectPageCtrl'
                 }
             }
         })
         .state('app.updateProject', {
             url: '/update-project/:projectId:title',
             views: {
                 'menuContent': {
                     templateUrl: 'app/components/update-project/update-project.html',
                     controller: 'UpdateProjectCtrl'
                 }
             }
         })
         .state('app.landing', {
             url: '/landing',
             cache: false,
             views: {
                 'menuContent': {
                     templateUrl: 'app/components/landing/landing.html',
                     controller: 'LandingCtrl'
                 }
             }
         });
     // if none of the above states are matched, use this as the fallback
     $urlRouterProvider.otherwise('/app/dashboard');
     $httpProvider.interceptors.push('HttpInterceptor');
     //For android change scroll to native (better performance)
     if (!ionic.Platform.isIOS()) {
         $ionicConfigProvider.scrolling.jsScrolling(false);
     }
 })
