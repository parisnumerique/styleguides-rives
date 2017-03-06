

function Curve(){

  var curve;
  var points = [];
  var targetPoints = [];
  var prevTime = 0;
  var speed = 50;
  var curveID;
  var startMove = false;

  this.init = function( crv, pts, id ){
    curve = crv;
    points = pts;
    targetPoints = pts;
    curveID = id;
    this.updateCurve();
  }



  this.moveTo = function( idPoint, pos, duration )
  {
    startMove = true;
    if( targetPoints[idPoint] ){
      targetPoints[idPoint] = pos;
    //  console.log( "id : " + curveID + "--> " + targetPoints[idPoint].x)
    }
  }


  this.onEnterFrame = function(time)
  {

    var pt;
    var targetPt;
    var t = time - prevTime;
    prevTime = time;

    for( var i = 0 ; i < points.length ; i ++ ){
      pt = points[i];
      targetPt = targetPoints[i];
      var d = { x: pt.x - targetPt.x,  y: pt.y - targetPt.y };

      if( d.x != 0 ){
        pt.x += Math.round( d.x / speed);
      }
      if( d.y != 0 ){
        pt.y += Math.round( d.y / speed);
      }

      points[i] = pt;

    }

    this.updateCurve();
  }


  this.updateCurve = function(){

    if( curve ){

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

      curve.setAttribute('d', "M" + path);
    }

  }

}
