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
    imageMin = require('gulp-imagemin'),
    merge = require('merge-stream');



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
    .pipe(gulp.dest('dist/styles/'))
    .pipe(reload({stream: true}));
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
  var views = gulp.src('app/pages/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('dist/pages'))
    .pipe(reload({stream: true}));

  var index = gulp.src('app/*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('dist'))
    .pipe(reload({stream: true}));

  return merge(views, index);
});
// END

gulp.task('build', function() {
  runSequence('clean', 'compile-scss', ['minify-css', 'minify-html', 'optimize-images']);
});

// Clean
gulp.task('clean', function() {
  return del(['dist']);
});

// Watcher
gulp.task('watch', function() {
  gulp.watch('app/styles/*', function(){runSequence('compile-scss', 'minify-css')});
  gulp.watch('app/**/**/*.html', ['minify-html']);
});


// Default Task

gulp.task('default', ['build', 'browser-sync', 'watch']);

