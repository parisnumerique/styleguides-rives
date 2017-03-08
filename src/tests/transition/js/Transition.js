var svgElement, curves = [], curvesPaths = [], curvesObj = [];
var stageW, stageH, offset, origin, curveWidth, mousePos = {};



function init(){


  svgElement = document.getElementById('curve_svg');
  setParams();


  origin = stageW;
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
                    new Point(origin + offset / 2, stageH / 2, "Q", Math.random() * 0.01 + 0.005),
                    new Point(origin, stageH + 50, "", Math.random() * 0.01 + 0.005),
                    new Point(origin + curveWidth, stageH + 50, "", Math.random() * 0.01 + 0.005),
                    new Point(origin + curveWidth, stageH + 50, "", Math.random() * 0.01 + 0.005),
                    new Point(origin + offset / 2 + curveWidth, stageH / 2, "Q", Math.random() * 0.01 + 0.005),
                    new Point(origin + curveWidth, -50, "", Math.random() * 0.01 + 0.005)
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



  $(window).keypress(function (e) {
    var posX = -1;

    console.log( e.which )
    switch (e.which) {
      case 116:
        console.log( "<< move left <<")
        posX = -100;
        break;
    }
    if( posX == -1 ) return;
    for( var i = 0 ; i < curvesObj.length ; i ++ ){
      curvesObj[i].moveTo( 3, { x:posX - curveWidth, y: stageH + 50 }, Math.random() * 60 + 1400 + i * 75 , TWEEN.Easing.Quadratic.InOut );
      curvesObj[i].moveTo( 4, { x:posX - curveWidth, y: stageH + 50 }, Math.random() * 60 + 1400 + i * 75, TWEEN.Easing.Quadratic.InOut );
      curvesObj[i].moveTo( 5, { x:posX - curveWidth - offset/2, y: stageH/2 }, Math.random() * 60 + 1600 + i * 75, TWEEN.Easing.Quadratic.InOut );
      curvesObj[i].moveTo( 6, { x:posX - curveWidth, y: 0 }, Math.random() * 60 + 1400 + i * 75, TWEEN.Easing.Quadratic.InOut );
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
