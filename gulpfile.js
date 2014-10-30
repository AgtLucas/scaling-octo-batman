// Gulpfile!
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var deploy = require('gulp-gh-pages');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

// Browserify task
gulp.task('browserify', function () {
  gulp.src('src/js/main.js')
    .pipe(browserify({transform:'reactify'}))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Sass task
gulp.task('sass', function () {
  gulp.src('src/_scss/main.scss')
    .pipe(sass({style: 'expanded'}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/css'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'));
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
gulp.task('default', ['browserify', 'sass', 'copy']);