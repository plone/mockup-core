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
        browsers: [
          'SL_Chrome',
          'SL_Opera',
          'SL_Firefox',
          'SL_Safari',
          'SL_IE_8',
          'SL_IE_9',
          'SL_IE_10',
          'SL_IE_11'
        ],
        reporters: ['junit', 'coverage'],
        junitReporter: {
          outputFile: 'test-results.xml'
        },
        sauceLabs: {
          testName: 'MockupCore',
          startConnect: true
        },
        customLaunchers: {
          'SL_Chrome': {
            base: 'SauceLabs',
            browserName: 'chrome'
          },
          'SL_Firefox': {
            base: 'SauceLabs',
            browserName: 'firefox'
          },
          'SL_Opera': {
            base: 'SauceLabs',
            browserName: 'opera'
          },
          'SL_Safari': {
            base: 'SauceLabs',
            browserName: 'safari',
            platform: 'Mac 10.8',
            version: '6'
          },
          'SL_IE_8': {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 7',
            version: '8'
          },
          'SL_IE_9': {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 2008',
            version: '9'
          },
          'SL_IE_10': {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 2012',
            version: '10'
          },
          'SL_IE_11': {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 8.1',
            version: '11'
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
