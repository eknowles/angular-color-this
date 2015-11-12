/*global module:false*/

var pkg = require('./package.json');

var createFolderGlobs = function (fileTypePatterns) {
  fileTypePatterns = Array.isArray(fileTypePatterns) ? fileTypePatterns : [fileTypePatterns];
  var ignore = ['node_modules', 'bower_components', 'dist', 'temp', 'example', 'coverage', '.grunt'];
  var fs = require('fs');
  return fs.readdirSync(process.cwd())
    .map(function (file) {
      if (ignore.indexOf(file) !== -1 ||
        file.indexOf('.') === 0 || !fs.lstatSync(file).isDirectory()) {
        return null;
      } else {
        return fileTypePatterns.map(function (pattern) {
          return file + '/**/' + pattern;
        });
      }
    })
    .filter(function (patterns) {
      return patterns;
    })
    .concat(fileTypePatterns);
};

module.exports = function(grunt) {

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= pkg.licenses %> */\n',
    // Task configuration.
    jshint: {
      main: {
        options: {
          jshintrc: '.jshintrc',
          reporter: require('jshint-stylish')
        },
        src: createFolderGlobs('*.js')
      }
    },
    ngAnnotate: {
      dist: {
        src: 'src/<%= pkg.name %>-compiled.js',
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      dist: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'dist/', src: ['**'], dest: 'example/lib/'}
        ]
      }
    },
    clean: {
      before: ['dist', 'temp', 'example/lib/<%= pkg.name %>.*'],
      after: ['temp']
    },
    usebanner: {
      main: {
        options: {
          position: 'top',
          banner: '<%= banner %>',
          linebreak: true
        },
        files: {
          src: ['dist/**.js']
        }
      }
    },
    'gh-pages': {
      options: {
        base: 'example'
      },
      src: '**/*'
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: {
          'src/<%= pkg.name %>-compiled.js': 'src/<%= pkg.name %>.js'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['clean:before', 'babel', 'ngAnnotate', 'jshint', 'uglify', 'usebanner', 'copy']);

};
