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
    del = require('del'),
    htmlmin = require('gulp-htmlmin'),
    runSequence = require('run-sequence'),
    imageMin = require('gulp-imagemin');



gulp.task('browser-sync', function() {
    browsersync({
        server: {
            baseDir: "dist/"
        }
    });
});

// BEGIN CSS Tasks
gulp.task('compile-scss', function() {
  return gulp.src('app/styles/**/*.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('minify-css', function() {
  return gulp.src('dist/styles/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/styles/'));
});
// END

// BEGIN Image Tasks
gulp.task('optimize-images', function() {
  return gulp.src('app/images/*')
    .pipe(imageMin({
      optimizationLevel: 4,
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest('dist/images'))
});



// BEGIN HTML Tasks
gulp.task('minify-html', function() {
  return gulp.src('app/views/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('dist/views'));
});
// END

gulp.task('build', function() {
  runSequence('clean', 'compile-scss', ['minify-css', 'minify-html', 'optimize-images']);
});

// Clean
gulp.task('clean', function() {
  return del(['dist']);
});







// Default Task

gulp.task('default', ['scripts', 'browser-sync', 'watch']);

