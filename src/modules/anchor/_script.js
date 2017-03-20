'use strict';

var defer = require('lodash.defer');
require('velocity-animate');

function scrollToInitialAnchor() {
  var initialAnchor = $('body').data('anchor');
  if (!initialAnchor) return;

  $('.gfrds_anchor[name="' + initialAnchor + '"]').velocity('scroll', {
    duration: 0
  });
}

var anchor = (function(){

  function module(selector){
    var $el = $(selector),
      name,
      offsetTop;

    function init(){
      name = $el.attr('name');
      offsetTop = Math.round($el.offset().top);
    }

    init();

    return $el;
  }

  return function(selector){
    return $(selector).each(function(){
      module(this);
    });
  };

})();

$(document).ready(function(){
  anchor('.gfrds_anchor');

  defer(function(){
    scrollToInitialAnchor();
  });
});

module.exports = anchor;
