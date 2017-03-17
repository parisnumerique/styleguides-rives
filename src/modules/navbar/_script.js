'use strict';

require('velocity-animate');

var GFrds = window.GFrds || {};

GFrds.navbar = (function(){

  function module(selector){
    var $el = $(selector),
      isMenuOpen = false,
      $buttonTop,
      $buttonMenu,
      $mobileNavElements;

    function init(){
      $buttonTop = $el.find('.gfrds_navbar-button-top');
      $buttonMenu = $el.find('.gfrds_navbar-button-menu');
      // $mobileNavElements = $el.find('.header-nav-item:not(.search), .header-social, .header-second-nav-item');

      $buttonTop.on('click', onClickTop);
      $buttonMenu.on('click', onClickButtonMenu);
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

    function toggleMenu() {
      isMenuOpen ? closeMenu() : openMenu();
    }

    function openMenu() {
      if (isMenuOpen) {return;}

      isMenuOpen = true;
      $('body').addClass('gfrds_navbar-mobile-open');

      $el.velocity({
        height: '100%'
      }, {
        duration: 400,
        complete: function(){
          // $mobileNavElements.velocity('transition.slideLeftIn', {
          //   duration: 300,
          //   stagger: 50
          // });
          $el.css('overflow', 'auto');
        }
      });
    }

    function closeMenu(force) {
      if (!isMenuOpen && !force) {return;}

      isMenuOpen = false;
      $('body').removeClass('gfrds_navbar-mobile-open');
      // $mobileNavElements.velocity('finish').hide();
      $el.css('overflow', 'visible');

      $el.velocity('stop').velocity({
        height: '6rem'
      }, {
        duration: 400
      });
    }

    function onClickButtonMenu(e) {
      e.preventDefault();
      toggleMenu();
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
  GFrds.navbar('.gfrds_navbar');
});
