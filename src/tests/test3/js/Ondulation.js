var svgElement, curves = [], curvesPaths = [], curvesObj = [];
var stageW, stageH, offset, origin, mousePos = {};



function init(){


  svgElement = document.getElementById('curve_svg');
  setParams();


  origin = stageW / 2;
  offset = stageW / 24;

  var initPoints = [new Point(origin, -50),
                    new Point(origin + offset, stageH / 2),
                    new Point(origin, stageH+50)];

  var curveObj;

  for ( var i = 0 ; i < 10 ; i ++ ){
    if( document.getElementById('curve_' + i) ){
      curves.push(document.getElementById('curve_' + i));

      curveObj = new Curve();
      curveObj.init( document.getElementById('curve_' + i), initPoints.slice(), i );
      curvesObj.push( curveObj );
    }
  }

  loop();
  addListeners();

}

function setParams(){
  stageW = $( window ).width();
  stageH = $( window ).height();
}

function addListeners(){
  window.addEventListener('mousemove', function(e) {
    // storing the y position of the mouse - we want the y pos relative to the SVG container so we'll subtract the container top from clientY.
    mousePos.y = e.clientY;
    mousePos.x = e.clientX;
    for( var i = 0 ; i < curvesObj.length ; i ++ ){
    //  curvesObj[i].moveTo( 0, { x:origin + ( mousePos.x - origin) / 5  + i * 50, y:- 50 }, 100)
      //curvesObj[i].moveTo( 1, { x:mousePos.x + i * 50, y:mousePos.y + i * 50 }, 100 )
    //  curvesO[i].moveTo( 2, { x:origin + (origin - mousePos.x) / 5 - i * 50, y:stageH + 50 } )
    }

    });

    $(window).keypress(function (e) {
    //use e.which
    var keyCode = e.keyCode;
    console.log( keyCode );
    var posX = -1;

    if( keyCode == 113){
      console.log( "<< move left <<")
      posX = stageW / 4;
    }
    else if ( keyCode == 100){ //go right
      console.log( "<< move right >>")
      posX = (stageW / 4) * 3;
    }
    else if ( keyCode == 115 ){
      posX = origin;
    }
    if( posX == -1 ) return;
    for( var i = 0 ; i < curvesObj.length ; i ++ ){
      curvesObj[i].moveTo( 2, { x:posX - i * 50, y: stageH + 50 }, 2000 )
    }


  })
    //window.addEventListener('resize', setParams);
}

function loop(time) {

  for( var i = 0 ; i < curvesObj.length ; i ++ ){
    curvesObj[i].onEnterFrame( time )
  }
  requestAnimationFrame(loop);
}






window.onload = init;
