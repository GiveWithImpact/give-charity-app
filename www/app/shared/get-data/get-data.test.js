 'use strict';
 describe("Service: getData", function() {
     beforeEach(module('starter'));

     var getData;
     beforeEach(inject(function(_getData_) {
         getData = _getData_;
     }));

     beforeEach(inject(function($templateCache) {
         $templateCache.put('app/components/login/login.html', '<div>blank or whatever</div>');
         $templateCache.put('app/shared/menu/menu.html', '<div>blank or whatever</div>');
         $templateCache.put('app/components/dashboard/dashboard.html', '<div>blank or whatever</div>');
         $templateCache.put('app/components/project-page/project-page.html', '<div>blank or whatever</div>');
         $templateCache.put('app/components/update-project/update-project.html', '<div>blank or whatever</div>');
         $templateCache.put('app/components/landing/landing.html', '<div>blank or whatever</div>');
     }));

     it('should store array with photos and get it back', inject(function($httpBackend) {
         var projectList = {};
         $httpBackend
             .when('GET', 'http://85.13.248.159:8101/api/v0.1/projects/updates/pending')
             .respond({
                 "projects": [{
                     "project_id": "123",
                     "last_update": "11-11-11",
                     "updated_by": "John Cena"
                 }, {
                     "project_id": "456",
                     "last_update": "12-12-12",
                     "updated_by": "Ron Swanson"
                 }]
             })

         getData.get("projects/updates/pending").then(function(success) {
             projectList = success.data.projects;
         }, function(error) {});
         $httpBackend.flush();
         expect(projectList[1].updated_by).toEqual("Ron Swanson");

     }))

 });
