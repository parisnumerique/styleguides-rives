'use strict';

require('velocity-animate');

var GFrds = window.GFrds || {};

GFrds.listItem = (function(){

  function module(selector){
    var $el = $(selector),
      $buttonToggle,
      $embed,
      $image,
      $iframe,
      soundcloud;

    function init(){
      $embed = $el.find('.gfrds_list-item-embed');
      $buttonToggle = $el.find('.gfrds_list-item-button-toggle');
      $image = $embed.find('img');
      $iframe = $embed.find('iframe');

      $el.on('click', onClick);
      $buttonToggle.on('click', onClickButtonToggle);
    }

    function onClick(e){
      e.preventDefault();
      open();
    }

    function onClickButtonToggle(e){
      e.preventDefault();
      if (!$el.hasClass('is-open')) return;
      e.stopPropagation();
      close();
    }

    function open() {
      if ($el.hasClass('is-open')) return;
      $el.addClass('is-open');

      setTimeout(isOpened, 600);
      resetAllItems();
    }

    function isOpened() {
      if ($iframe.length) {
        enableEmbed();
      } else if ($image.data('large')) {
        loadLargeImage();
      }

      $el.velocity('scroll', {
        offset: -60
      });
    }

    function close() {
      if ($iframe.length) {
        disableEmbed();
      }

      $el.removeClass('is-open');
    }

    function enableEmbed() {
      if (soundcloud) {
        $iframe.show();
        soundcloud.play();
      } else {
        $iframe.attr('src', $iframe.data('original'));
        soundcloud = SC.Widget($iframe[0]);
      }
    }

    function disableEmbed() {
      if (soundcloud) {soundcloud.pause();}
      $iframe.hide();
    }

    function loadLargeImage() {
      var img = new Image();
      img.onload = function () {
        $image.attr('src', $image.data('large'));
      }
      img.src = $image.data('large');
    }

    function resetAllItems() {
      $('.gfrds_list-item').not($el).removeClass('is-open');
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
  GFrds.listItem('.gfrds_list-item');
});
