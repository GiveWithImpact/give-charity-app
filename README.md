# Give! Charity App
HTML5 Hybrid app using Phonegap/Cordova for Charity Users

## Install

1. 'npm install -g ionic cordova bower'
2. 'cd give-registration-app'
3. 'npm install'
4. 'bower install'
5. If plugin directory doesnt exist run 'ionic state restore'

## Build & development

+ Run `ionic serve` for preview on browser.
+ Run `ionic platform add android` then plug your android device and run `ionic build android` and `ionic run android` for previev on mobile device.
+ Run `grunt` to compile scss to css and minify them.
 
## Testing
1. 'npm install karma-cli -g'
2. Go to 'give-charity-app' directory
3. Run `grunt karma` -to start tests. 
