module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    './www/css/ionic.app.css': './scss/ionic.app.scss'
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
                    './www/css/ionic.app.min.css': './www/css/ionic.app.css'
                }
            }
        },
        watch: {
            scripts: {
                files: ['./scss/*.scss'],
                tasks: ['sass', 'cssmin'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    grunt.registerTask('default', ['sass', 'cssmin', 'watch']);

};
