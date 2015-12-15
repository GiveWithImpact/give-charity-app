module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    './www/assets/css/ionic.app.css': './scss/ionic.app.scss'
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    './www/assets/css/ionic.app.min.css': './www/assets/css/ionic.app.css'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 3 version']
            },
            main: {
                expand: true,
                flatten: true,
                src: 'www/assets/css/ionic.app.css',
                dest: 'www/css'
            }
        },
        watch: {
            scripts: {
                files: ['./scss/*.scss'],
                tasks: ['sass', 'autoprefixer', 'cssmin'],
                options: {
                    spawn: false,
                },
            },
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }
    });

    grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'watch']);

};
