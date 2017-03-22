var LazyLoad = require('vanilla-lazyload');

$(document).ready(function(){
  var lazyloader = new LazyLoad({
    elements_selector: '.gfrds_video-embed iframe, .gfrds_push-embed iframe, .gfrds_portrait-embed iframe, .gfrds_figure-image',
    throttle: 1000
  });
});
