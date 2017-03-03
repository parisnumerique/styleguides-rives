'use strict';

var del        = require('del');
var config     = require('../config');
var gulp       = require('gulp');

gulp.task('clean', function(cb) {
  del(config.harp.output);
  cb();
});
