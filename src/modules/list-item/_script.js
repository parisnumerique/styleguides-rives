'use strict';

require('velocity-animate');

var GFrds = window.GFrds || {};

GFrds.listItem = (function(){

  function module(selector){
    var $el = $(selector),
      $embed,
      $image;

    function init(){
      $embed = $el.find('.gfrds_list-item-embed');
      $image = $embed.find('img');

      $el.on('click', onClick);
    }

    function onClick(e){
      e.preventDefault();
      $el.addClass('is-open');

      setTimeout(function(){
        var img = new Image();
        img.onload = function () {
          $image.attr('src', $image.data('large'));
        }
        img.src = $image.data('large');
      }, 500);

      resetAllItems();
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
