'use strict';

require('velocity-animate');

var GFrds = window.GFrds || {};

GFrds.cover = (function(){

  function module(selector){
    var $el = $(selector),
      $link,
      $embed,
      $iframe,
      $backgroundVideo;

    function init(){
      $link = $el.find('.gfrds_cover-link');
      $embed = $el.find('.gfrds_cover-embed');
      $iframe = $embed.find('iframe');
      $backgroundVideo = $el.find('.gfrds_cover-video');

      if (!Paris.responsive.is('large')) return;

      var embedHeight = $el.height() - 200;
      var embedWidth = embedHeight * 2.38;
      $embed.css({
        height: embedHeight,
        width: embedWidth
      });

      $el.on('click', onClick);
      $link.on('click', onClickLink);
    }

    function onClick(e){
      e.preventDefault();
      close();
    }

    function onClickLink(e){
      e.preventDefault();
      if ($el.hasClass('is-open')) return;
      e.stopPropagation();
      open();
    }

    function open() {
      if ($el.hasClass('is-open')) return;
      $el.addClass('is-open');

      $backgroundVideo[0].pause();
      setTimeout(isOpened, 600);
    }

    function isOpened() {
      if ($iframe.length) {
        enableEmbed();
      }
    }

    function close() {
      $el.removeClass('is-open');
      $backgroundVideo[0].play();
      disableEmbed();
    }

    function enableEmbed() {
      $iframe.attr('src', $iframe.data('original'));
    }

    function disableEmbed() {
      $iframe.attr('src', '');
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
  GFrds.cover('.gfrds_cover');
});
