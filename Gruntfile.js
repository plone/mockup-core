module.exports = function(grunt) {

  var requirejsOptions = require('./js/config'),
      karmaConfig = require('./node_modules/karma/lib/config'),
      karmaFiles = [];

  for (var key in requirejsOptions.paths) {
    karmaFiles.push({
      pattern: requirejsOptions.paths[key] + '.js',
      included: false
    });
  }

  karmaFiles.push({pattern: 'tests/*-test.js', included: false});

  karmaFiles.push('js/config.js');
  karmaFiles.push('tests/config.js');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: { all: ['Gruntfile.js', 'src/*.js', 'tests/*.js'] },
    karma: {
      options: {
        basePath: './',
        frameworks: ['mocha', 'requirejs'],
        files: karmaFiles,
        preprocessors: { 'js/*.js': 'coverage' },
        reporters: ['dots', 'progress', 'coverage'],
        coverageReporter: { type : 'lcov', dir : 'coverage/' },
        port: 9876,
        colors: true,
        logLevel: karmaConfig.LOG_INFO,
        autoWatch: true,
        captureTimeout: 60000,
        plugins: [
          'karma-mocha',
          'karma-coverage',
          'karma-requirejs',
          'karma-sauce-launcher',
          'karma-chrome-launcher',
          'karma-phantomjs-launcher',
          'karma-junit-reporter'
        ]
      },
      test: { browsers: ['PhantomJS'] },
      test_once: { singleRun: true, browsers: ['PhantomJS'] },
      test_dev: {
        browsers: ['Chrome'],
        preprocessors: {},
        reporters: ['dots', 'progress'],
        plugins: [ // without karma-coverage
          'karma-mocha',
          'karma-requirejs',
          'karma-sauce-launcher',
          'karma-chrome-launcher',
          'karma-phantomjs-launcher',
          'karma-junit-reporter'
        ]
      },
      test_ci: {
        singleRun: true,
        port: 8000,
        browsers: ['sauce_chrome', 'sauce_firefox'],
        reporters: ['junit', 'coverage'],
        junitReporter: {
          outputFile: 'test-results.xml'
        },
        sauceLabs: {
          testName: 'MockupCore',
          startConnect: true
        },
        customLaunchers: {
          'sauce_chrome': {
             base: 'SauceLabs',
             platform: 'Windows 7',
             browserName: 'chrome'
           },
          'sauce_firefox': {
             base: 'SauceLabs',
             platform: 'Windows 7',
             browserName: 'firefox'
           }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test', [
      'jshint',
      'karma:test'
      ]);
  grunt.registerTask('test_once', [
      'jshint',
      'karma:test_once'
      ]);
  grunt.registerTask('test_dev', [
      'karma:test_dev'
      ]);
  grunt.registerTask('test_ci', [
      'jshint',
      'karma:test_once',
      'karma:test_ci'
      ]);

};
