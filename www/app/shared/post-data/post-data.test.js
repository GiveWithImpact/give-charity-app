 'use strict';
 describe("Service: postData", function() {
     beforeEach(module('starter'));

     var postData;
     beforeEach(inject(function(_postData_) {
         postData = _postData_;
     }));

     beforeEach(inject(function($templateCache) {
         $templateCache.put('app/components/login/login.html', '<div>blank or whatever</div>');
         $templateCache.put('app/shared/menu/menu.html', '<div>blank or whatever</div>');
         $templateCache.put('app/components/dashboard/dashboard.html', '<div>blank or whatever</div>');
         $templateCache.put('app/components/project-page/project-page.html', '<div>blank or whatever</div>');
         $templateCache.put('app/components/update-project/update-project.html', '<div>blank or whatever</div>');
         $templateCache.put('app/components/landing/landing.html', '<div>blank or whatever</div>');
     }));


     it('should post data (object)', inject(function($httpBackend) {

         var update = {};
         $httpBackend
             .when('POST', 'http://85.13.248.159:8101/api/v0.1/projects/update', {
                 mediafile: "base64code",
                 project_id: "123",
                 comment: "qwerty"
             })
             .respond({
                 respond: "Update Success"
             });
         var object = {
             mediafile: "base64code",
             project_id: "123",
             comment: "qwerty"
         }
         postData.post('projects/update', object).then(function(success) {
             update = success.data;
         }, function(error) {})


         $httpBackend.flush();

         expect(update).toEqual({
             respond: "Update Success"
         });

     }))
     it('should go to login page when got 401 error', inject(function($httpBackend, $state) {
         spyOn($state, 'go');
         var object = {
             mediafile: "base64code",
             project_id: "123",
             comment: "qwerty"
         }
         var update = {};
         $httpBackend
             .when('POST', 'http://85.13.248.159:8101/api/v0.1/projects/update')
             .respond(401, "No authorization");

         postData.post('projects/update', object).then(function(success) {
             console.log(success);
             update = success.data;
         }, function(error) {
             console.log(error);
         })


         $httpBackend.flush();

         expect($state.go).toHaveBeenCalledWith('app.login');
     }));
 });
