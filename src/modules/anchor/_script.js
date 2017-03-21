'use strict';

var defer = require('lodash.defer');
require('velocity-animate');
require('waypoints/lib/jquery.waypoints.js');
require('waypoints/lib/shortcuts/inview.js');

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
      $parent,
      basePath,
      name,
      isHistory,
      offsetTop;

    function init(){
      $parent = $el.parent(),
      name = $el.attr('name');
      basePath = $('body').data('base-path');
      isHistory = $('.gfrds_container').hasClass('is-history');
      offsetTop = Math.round($el.offset().top);

      var inview = new Waypoint.Inview({
        element: $parent[0],
        entered: onScreenEntered
      });
    }

    function onScreenEntered(direction){
      if (isHistory) return;

      if ((name === 'cover') || (name === 'intro')) {
        history.replaceState( {} , "", basePath );
      } else {
        history.replaceState( {} , name, basePath + '/' + name );
      }
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
