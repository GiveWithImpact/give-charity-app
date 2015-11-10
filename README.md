# Give! Registration App
Simple, internal utility for registering a user and their mobile device

## Install

1. 'npm install -g ionic cordova bower'
2. 'cd give-registration-app'
3. 'npm install'
4. 'bower install'

## Build & development

+ Run `ionic serve` for preview on browser.
+ Run `ionic platform add android` then plug your android device and run `ionic build android` and `ionic run android` for previev on mobile device.
+ Run `grunt` to compile scss to css and minify them.
 
## Testing
1. 'npm install karma-cli -g'
2. 'cd www' 
3. Run `karma start` - this will open a Chrome browser that will mock your Angular app. 
4. Open a new terminal in the same www/ directory and run: `karma run`