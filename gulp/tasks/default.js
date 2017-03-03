var gulp = require('gulp');
var config = require('../config');

gulp.task('default', ['harp:serve', 'watch:js']);
gulp.task('compile', ['harp:compile', 'compile:js']);
