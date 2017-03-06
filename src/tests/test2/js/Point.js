
var x, y, targetPos;
var t, startTime, endTime, duration;
var startPos, targetPos, deltaPos;

function Poit(x,y){

  this.x = x;
  this.y = y;

  this.init = function( x ){
    curve = crv;
    points = pts;
    targetPoints = pts;
    curveID = id;
    this.updateCurve();
  }



  this.moveTo = function( pos, duration )
  {
    startTime = t;
    endTime = startTime + duration;
    this.duration = duration;
    targetPos = pos;
    startPos = {x:x, y:y}
    deltaPos = {x: targetPos.x - startPos.x, y: targetPos.y - startPos.x}
  }


  this.onEnterFrame = function(time)
  {
    t = time;
    if( t < endTime){
      var k = (t - t.startTime) / duration;
      x = startPos.x + deltaPos.x * k;
      y = startPos.y + deltaPos.y * k;
    }
    else {
      //COMPLETE
    }
  }
}
