var browserify = require('browserify');
var buffer     = require('vinyl-buffer');
var config     = require('../config');
var gulp       = require('gulp');
var gutil      = require('gulp-util');
var path       = require('path');
var source     = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify     = require('gulp-uglify');
var watchify   = require('watchify');

var browserifyBundler = browserify('./src/javascript/_main.js');
var watchifyBundler   = watchify(browserify('./src/javascript/_main.js', watchify.args));

gulp.task('watch:js', watch); // so you can run `watch:js` to build the file
gulp.task('compile:js', compile); // so you can run `compile:js` to build the file

watchifyBundler.on('update', watch); // on any dep update, runs the watchifyBundler
watchifyBundler.on('log', gutil.log); // output build logs to terminal

function watch() {
  watchifyBundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Watchify Error'))
    .pipe(source(config.js.output))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.join(config.harp.input, 'javascript')));
}

function compile () {
  bundle(path.join(config.harp.output, 'javascript'));
}

function bundle(output) {
  return browserifyBundler
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(config.js.output))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(output)) ;
}
