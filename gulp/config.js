'use strict';

var join = require('path').join;
var harpOutput = join(process.cwd(), 'www');
var buildOutput = join(process.cwd(), 'build');
var harpSrc = join(process.cwd(), 'src');
var fontsPath = join(process.cwd(), 'src', 'fonts');

module.exports = {
  port: 9017,

  js: {
    output: 'rivesdeseine.js'
  },

  css: {
    output: 'rivesdeseine.css'
  },

  harp: {
    input: harpSrc,
    output: harpOutput
  },

  build: {
    output: buildOutput,
    assets: {
      css: join(buildOutput, 'assets', 'stylesheets'),
      javascript: join(buildOutput, 'assets', 'javascript'),
      fonts: join(buildOutput, 'assets', 'fonts'),
      images: join(buildOutput, 'assets', 'images'),
    }
  },

  fontsPath: fontsPath
};
