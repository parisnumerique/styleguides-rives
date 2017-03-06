'use strict';

require('velocity-animate');

var GFrds = window.GFrds || {};

GFrds.navbar = (function(){

  function module(selector){
    var $el = $(selector),
      $buttonTop;

    function init(){
      $buttonTop = $el.find('.gfrds_navbar-button-top');

      $buttonTop.on('click', onClickTop);
    }

    function onClickTop(e){
      e.preventDefault();
      if (Paris.responsive.is('small')) {
        // instant scroll
        window.scrollTo(0, 0);
        window.location.hash = "";
        $(window).trigger('scroll');
      } else {
        // animated scroll
        $("html").velocity("scroll", {
          duration: 1000,
          offset: 0,
          mobileHA: false,
          complete: function(){
            window.location.hash = "";
          }
        });
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
  // GFrds.navbar('.gfrds_navbar');
});
