'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['dist'],

    copy: {
      all: {
        expand: true,
        cwd: 'app/',
        src: ['*.css', '*.html', '/images/**/*', '!Gruntfile.js'],
        dest: 'dist/',
        flatten: true,
        filter: 'isFile'
      },
    },

    browserify: {
      all: {
        src: 'app/index.js',
        dest: 'dist/bundle.js',
      },
      options: {
        transform: ['debowerify'],
        debug: true
      }
    },

    // jshint: {
    //   all: ['Gruntfile.js', 'app/**/*.js'],
    //   //all: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js'],
    //   options: {
    //     jshintrc: true,
    //     globals: {
    //       jQuery: true,
    //       console: true,
    //       module: true
    //     }
    //   },
    // },

    uglify: {
      dist: {
        src: 'dist/bundle.js',
        dest: 'dist/bundle.min.js'
      }
    },

    connect: {
      options: {
        port: process.env.PORT || 3000,
        base: 'dist/',
      },

      all: {},
    },

    watch: {
      options: {
        livereload: true
      },

      html: {
        files: '<%= copy.all.src %>',
      },

      js: {
        files: '<%= browserify.all.src %>',
        tasks: ['browserify'],
      },

      assets: {
        files: ['assets/**/*', '*.css', 'images/**/*', 'img/**/*', '!Gruntfile.js'],
        tasks: ['copy'],
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['clean', 'browserify', 'copy', 'uglify']);
  //grunt.registerTask('default', ['jshint', 'clean', 'browserify', 'copy']);
  grunt.registerTask('server', ['default', 'connect', 'watch']);

};