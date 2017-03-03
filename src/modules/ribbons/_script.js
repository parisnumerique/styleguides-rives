'use strict';

require('velocity-animate');

var GFrds = window.GFrds || {};

GFrds.ribbons = (function(){

  function module(selector){
    var $el = $(selector);

    function init(){
      // here you can use $el to access the .gfrds_ribbons element with jQuery
      // anotherFunction();
    }

    // function anotherFunction(){
    // }

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
  GFrds.navbar('.gfrds_ribbons');
});
