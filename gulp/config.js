'use strict';

var join = require('path').join;
var harpOutput = join(process.cwd(), 'www');
var harpSrc = join(process.cwd(), 'src');

module.exports = {
  port: 9013,

  js: {
    output: 'grandformat.js'
  },

  harp: {
    input: harpSrc,
    output: harpOutput
  }
};
