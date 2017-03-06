var svgElement, curves = [], curvesPaths = [], curvesRandom = [];
var stageW, stageH, offset, origin;

function init(){
  addListeners();
  setParams();

  svgElement = document.getElementById('curve_svg');
  for ( var i = 0 ; i < 10 ; i ++ ){
    if( document.getElementById('curve_' + i) ){
      curves.push(document.getElementById('curve_' + i));
      curvesRandom.push(Math.random() * 2);
    }
  }

  origin = stageW / 2;
  offset = stageW / 24;

  console.log( "offset " + offset );


   var initPoints = [{x: origin, y: -50},
                    {x: origin + offset, y: (stageH /2)},
                    //{x:  (stageW /2), y: ((stageH /4)*2)},
                    {x:  origin, y: (stageH+50)}]

  curvesPaths[0] = initPoints;
  curvesPaths.push( applyRandom(initPoints) );
  curvesPaths.push( applyRandom(initPoints) );
  drawCurve(0, curvesPaths[0]);
  drawCurve(1, curvesPaths[1]);
  drawCurve(2, curvesPaths[2]);

  loop();

  animateCurves( offset);

}

function applyRandom( points ){

  var tmp = [];
  for(var i = 0 ; i < points.length ; i ++){
    tmp.push( { x:points[i].x + Math.random() * 110 - 55, y:points[i].y } )
  }
  return tmp;
}

function setParams(){
  stageW = $( window ).width();
  stageH = $( window ).height();
}

function addListeners(){
  window.addEventListener('resize', setParams);
}


function animateCurves( offsetA ){

    var offestInverse = -1 * offsetA;
    //console.log(" offestInverse : " + offestInverse);
    tween = new TWEEN.Tween({ ofs: offsetA })
      .to({ ofs:offestInverse }, 2000)
      .easing( TWEEN.Easing.Quadratic.InOut )
      .onUpdate( function () {
        //console.log( "ofs " + this.ofs)
        updateCurves( this.ofs )
      }).onComplete(function() {
        animateCurves( offestInverse )
      }).start();



    /*tween = new TWEEN.Tween({ x: pt.x })
      .to({ x:destPT }, 2000)
      .easing( TWEEN.Easing.Quadratic.InOut )
      .onUpdate( function () {
        points[1].x = this.x;
        updateCurve( curveID, points )
      }).onComplete(function() {
        animateCurve( curveID, points )
      }).start();*/
}

function loop(time) {
  TWEEN.update(time);
  requestAnimationFrame(loop);
}

function updateCurves( ofst ){

  for ( var i = 0; i < curvesPaths.length ; i++ ){

    var path = "";
    var points = curvesPaths[i];

    points[1].x = origin + ofst * curvesRandom[i];

    for ( var j = 0 ; j < points.length ; j ++ ){
      if( j == 1 ){
        path += 'Q';
      }
      else if( j == points.length - 1 && points.length > 3){
        path += 'T';
      }

      path += points[j].x +','+points[j].y + ' ';
    }

    //console.log( path)
    curves[i].setAttribute('d', "M" + path)

  }
}


function drawCurve( curveID, points ){
  if( curves[curveID]){
    var path = "";
    for ( var i = 0 ; i < points.length ; i ++ ){
      if( i == 1 ){
        path += 'Q';
      }
      else if( i == points.length - 1 && points.length > 3){
        path += 'T';
      }

      path += points[i].x+','+points[i].y + ' ';
    }
    console.log( path )
    curves[curveID].setAttribute('d', "M" + path)
  }
  //path.setAttribute('d', 'M'+startPoint.x+','+startPoint.y+' Q'+point1.x +','+point1.y+' '+point2.x+','+point2.y+' T'+endPoint.x+','+endPoint.y);

}



window.onload = init;
