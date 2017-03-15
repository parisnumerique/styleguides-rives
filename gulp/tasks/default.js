var gulp        = require('gulp');
var config      = require('../config');
var runSequence = require('run-sequence');

gulp.task('default', ['harp:serve', 'watch:js']);
gulp.task('compile', ['harp:compile', 'compile:js']);
gulp.task('build',   ['build:js', 'build:images', 'build:fonts', 'build:css', 'build:jade']);

gulp.task('cleanbuild', function(callback) {
  runSequence('clean',
              'build',
              callback);
});
