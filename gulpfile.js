var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    browsersync = require('browser-sync'),
    reload = browsersync.reload,
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    del = require('del');



gulp.task('browser-sync', function() {
    browsersync({
        server: {
            baseDir: "./dist/"
        }
    });
});

gulp.task('sass', function() {
  return gulp.src('./app/styles/**/*.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('minify-css', function() {
  return gulp.src('./css/*.css')
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log(details.stats.originalSize);
      console.log(details.stats.minifiedSize);
    }))
    .pipe(gulp.dest('./minifiedCSS'));
});

gulp.task('clean', function() {
  return del(['minifiedCSS', 'css']);
});



// Default Task

gulp.task('default', ['scripts', 'browser-sync', 'watch']);

