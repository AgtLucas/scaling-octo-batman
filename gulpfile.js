// Gulpfile!
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var deploy = require('gulp-gh-pages');
var concat = require('gulp-concat');

// Browserify task
gulp.task('browserify', function () {
  gulp.src('src/js/main.js')
    .pipe(browserify({transform:'reactify'}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});

// Copy task
gulp.task('copy', function () {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

// Watch task
gulp.task('watch', function () {
  gulp.watch('src/**/*.*', ['default']);
});

gulp.task('deploy', function () {
  return gulp.src('dist/**/*')
    .pipe(deploy());
});

// Default
gulp.task('default', ['browserify', 'copy']);