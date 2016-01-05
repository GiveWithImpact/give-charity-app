angular.module('starter')
    .directive('tabScroll', function() {
        return {
            template: "",
            restrict: 'AE',
            link: function postLink(scope, element) {

                scope.scrollHeight = tabsHeight();

                //Updates ion-scroll height in dashboard tabs on orientation change, 
                //maybe it's not a function that was requierd ,but wihtout it it looks much worse
                window.addEventListener("orientationchange", function() {
                    scope.scrollHeight = tabsHeight();
                    scope.$digest();
                }, false);

                function isOrientationPortrait() {
                    return window.innerHeight > window.innerWidth
                }

                function tabsHeight() {
                    windowHeight = window.innerHeight;
                    if (isOrientationPortrait()) {
                        return windowHeight - 361;
                    } else {
                        return windowHeight - 100;
                    }
                }

            }
        };
    });
