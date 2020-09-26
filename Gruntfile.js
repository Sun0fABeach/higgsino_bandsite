const node_sass = require('node-sass');


module.exports = function(grunt) {

grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
        options: {
            implementation: node_sass,
            sourceMap: true
        },
        build: {
            files: {
                'style.css': 'sass/style.scss'
            }
        }
    },
    autoprefixer: {
        options: {},
        build: {
            files: {
                'build/style.css': ['style.css']
            }
        }
    },
    cssmin: {
        options: {},
        build: {
            files: {
                'build/style.min.css': ['build/style.css']
            }
        }
    },
    uglify: {
        options: {},
        build: {
            files: {
              'build/script.min.js': ['script.js']
            }
        }
    },
    copy: {
        build: {
            files: [{
                expand: true,
                cwd: 'assets',
                src: [
                    'audio/Loop.*',
                    'favicon.ico',
                    'images/logo.png',
                    'images/background_hires.jpg',
                    'images/background_medres.jpg',
                    'images/background_lowres.jpg',
                    'images/content_background_hires.jpg',
                    'images/content_background_medres.jpg',
                    'images/content_background_lowres.jpg',
                    'fonts/geomanist/regular/geomanist-regular-webfont.woff*',
                    'fonts/cast_iron_condensed/cast_iron-condensed-webfont.woff*',
                    '../evolife/**',
                    '../robots.txt'
                ],
                dest: 'build/assets'
            }, {
                expand: true,
                src: ['jquery-4.0.0.custom.min.js'],
                dest: 'build'
            }]
        }
    },
    processhtml: {
        options: {},
        build: {
            files: {
                'build/index.html': ['index.html']
            }
        }
    },
    htmlmin: {
        build: {
            options: {
                removeComments: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true
            },
            files: {
                'build/index.html': 'build/index.html'
            }
        }
    },
    clean: ['build', 'style.css'],
    connect: {
        server: {
            options: {
                keepalive: true,
                debug: true
            }
        }
    }
});

grunt.loadNpmTasks('grunt-sass');
grunt.loadNpmTasks('grunt-autoprefixer');
grunt.loadNpmTasks('grunt-processhtml');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-connect');

grunt.registerTask('default', [
    'sass', 'autoprefixer', 'cssmin', 'uglify', 'copy', 'processhtml', 'htmlmin'
]);

};
