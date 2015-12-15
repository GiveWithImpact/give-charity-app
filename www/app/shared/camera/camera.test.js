 'use strict';
 describe("Service: CameraService", function() {
     beforeEach(module('starter'));

     var CameraService;
     beforeEach(inject(function(_CameraService_) {
         CameraService = _CameraService_;
     }));

     it('should store array with photos and get it back', inject(function($httpBackend) {

         var photoObject1 = {
             mediafile: "base64code",
             project_id: "123",
             comment: "qwerty"
         }
         var photoObject2 = {
             mediafile: "base64code",
             project_id: "456",
             comment: "uiopasdf"
         }
         CameraService.saveUpdate(photoObject1);
         CameraService.saveUpdate(photoObject2);

         var photoArray = CameraService.getArray();

         expect(photoArray.length).toBe(2);
         expect(photoArray[1].project_id).toBe("456");
     }))

 });
