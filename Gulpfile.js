var jsdoc = require('gulp-jsdoc');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

gulp.task('doc', function () {
  gulp.src('./src/*.js')
    .pipe(jsdoc('./doc'));
});

gulp.task('test', function () {
  gulp.src('./test/*_spec.js')
    .pipe(mocha());
});

gulp.task('jshint', function () {
  gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('build', ['jshint', 'doc'], function () {
  gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['test']);