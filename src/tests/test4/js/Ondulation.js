var svgElement, curves = [], curvesPaths = [], curvesObj = [];
var stageW, stageH, offset, origin, curveWidth, mousePos = {};



function init(){


  svgElement = document.getElementById('curve_svg');
  setParams();


  origin = stageW / 2;
  offset = stageW / 24;

  var initPoints;
  var curveObj;
  curveWidth = 90;

  for ( var i = 0 ; i < 10 ; i ++ ){

    if( i == 0 ) {
      curveWidth = 80
    } else {
      curveWidth = 100;
    }

    if( document.getElementById('curve_' + i) ){
      curves.push(document.getElementById('curve_' + i));
      var rand = Math.random() * 0.01 + 0.005;
      initPoints = [new Point(origin, -50, "", Math.random() * 0.01 + 0.005),
                    new Point(origin + offset, stageH / 2, "Q", Math.random() * 0.01 + 0.005),
                    new Point(origin, stageH + 50, "", Math.random() * 0.01 + 0.005),
                    new Point(origin - curveWidth, stageH + 50, "", Math.random() * 0.01 + 0.005),
                    new Point(origin - curveWidth, stageH + 50, "", Math.random() * 0.01 + 0.005),
                    new Point(origin + offset - curveWidth, stageH / 2, "Q", Math.random() * 0.01 + 0.005),
                    new Point(origin - curveWidth, -50, "", Math.random() * 0.01 + 0.005)
                  ];

      curveObj = new Curve();
      curveObj.init( document.getElementById('curve_' + i), initPoints.slice(), i );
      curvesObj.push( curveObj );
      curveObj.autoRipple();

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

  window.addEventListener('mousemove',
    function(e) {
      // storing the y position of the mouse - we want the y pos relative to the SVG container so we'll subtract the container top from clientY.
      mousePos.y = e.clientY;
      mousePos.x = e.clientX;
      var normMousePosX = mousePos.x / stageW;
      var normMousePosY = mousePos.y / stageH;
      var influenceX =  (normMousePosX - 0.5)
      var influenceY =  (normMousePosY - 0.5)

      for( var i = 0 ; i < curvesObj.length ; i ++ ){
        influenceX = influenceX;
        influenceY = influenceY;
        curvesObj[i].influence( influenceX, influenceY );
      }
    }
  );

  $(window).keypress(function (e) {
    var posX = -1;

    switch (e.which) {
      case 113:
        console.log( "<< move left <<")
        posX = stageW / 4;
        break;

      case 100:
        console.log( "<< move right >>")
        posX = (stageW / 4) * 3;
        break;

      case 115:
        posX = origin;
        break;
    }
    if( posX == -1 ) return;
    for( var i = 0 ; i < curvesObj.length ; i ++ ){
      curvesObj[i].moveTo( 2, { x:posX, y: stageH + 50 }, 2000, TWEEN.Easing.Quadratic.InOut );
    //  curvesObj[i].moveTo( 3, { x:posX - i * curveWidth/2 - curveWidth, y: stageH + 50 }, 2000, TWEEN.Easing.Quadratic.InOut );
      curvesObj[i].moveTo( 4, { x:posX - curveWidth, y: stageH + 50 }, 2000, TWEEN.Easing.Quadratic.InOut );
    }
  })
}


function loop(time) {

  for( var i = 0 ; i < curvesObj.length ; i ++ ){
    curvesObj[i].onEnterFrame( time )
  }
  requestAnimationFrame(loop);
}





window.onload = init;
