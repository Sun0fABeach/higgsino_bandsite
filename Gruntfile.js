module.exports = function(grunt) {


grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    cssmin: {
        options: {},
        build: {
            files: {
                'build/style.min.css': ['style.css']
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
    copy: {
        build: {
            expand: true,
            cwd: 'assets',
            src: [
                'Lazar.wav', 'logo_red.jpg',
                'platine2_hires.jpg',
                'platine2_medres.jpg',
                'platine2_lowres.jpg',
                'content_background_hires.jpg',
                'content_background_medres.jpg',
                'content_background_lowres.jpg',
                'fonts/geomanist/regular/geomanist-regular-webfont.woff*',
                'fonts/cast_iron_condensed/cast_iron-condensed-webfont.woff*',
                '../evolife/**'
            ],
            dest: 'build/assets'
        }
    },
    clean: ['build'],
    connect: {
        server: {
            options: {
                keepalive: true,
                debug: true
            }
        }
    }
});

grunt.loadNpmTasks('grunt-processhtml');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-connect');

grunt.registerTask('default', [
    'cssmin', 'uglify', 'processhtml', 'htmlmin', 'copy'
]);


};
