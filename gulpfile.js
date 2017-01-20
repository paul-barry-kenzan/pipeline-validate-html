'use strict';

var gulp = require('gulp');
var testPipeline = require('pipeline-test-node');
var validateJSPipeline = require('pipeline-validate-js');

var config = {
  jsfiles: [
    'src/*.js',
    'test/**/*.js',
    'test/*.js'
  ],
  test: {
    plugins: {
      istanbul: {
        thresholds: {
          global: 80
        }
      }
    }
  }

};

gulp.task('lint:js', function() {
  return gulp
    .src(config.jsfiles)
    .pipe(validateJSPipeline.validateJS());
});

gulp.task('test', ['lint:js'], function() {
  return gulp
    .src(config.jsfiles)
    .pipe(testPipeline.test(config.test));
});

gulp.task('build', ['test']);