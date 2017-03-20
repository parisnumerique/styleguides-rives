'use strict';

require('velocity-animate');

var GFrds = window.GFrds || {};

GFrds.listItem = (function(){

  function module(selector){
    var $el = $(selector),
      $buttonToggle,
      $embed,
      $image;

    function init(){
      $embed = $el.find('.gfrds_list-item-embed');
      $buttonToggle = $el.find('.gfrds_list-item-button-toggle');
      $image = $embed.find('img');

      $el.on('click', onClick);
      $buttonToggle.on('click', onClickButtonToggle);
    }

    function onClick(e){
      e.preventDefault();

      if ($el.hasClass('is-open')) return;
      $el.addClass('is-open');

      setTimeout(function(){
        var img = new Image();
        img.onload = function () {
          $image.attr('src', $image.data('large'));
        }
        img.src = $image.data('large');
        $el.velocity('scroll', {
          offset: -60
        });
      }, 600);

      resetAllItems();
    }

    function onClickButtonToggle(e){
      e.preventDefault();
      if (!$el.hasClass('is-open')) return;
      e.stopPropagation();
      $el.removeClass('is-open');
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
