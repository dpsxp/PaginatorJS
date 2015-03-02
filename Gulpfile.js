var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('build', function () {
  gulp.src('./src/*.es6')
    .pipe(babel())
    .pipe(rename('paginator.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  gulp.watch('./src/*.es6', ['build']);
});
