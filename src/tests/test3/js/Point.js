
var x, y, targetPos;
var t, startTime, endTime, duration;
var startPos, targetPos, deltaPos;

function Point(x,y){

  this.x = x;
  this.y = y;




  this.moveTo = function( pos, durationT )
  {
    startTime = t;
    endTime = startTime + durationT;
    duration = durationT;
    targetPos = pos;
    startPos = {x:x, y:y}
    deltaPos = {x: targetPos.x - startPos.x, y: targetPos.y - startPos.y}
    console.log( "y : "+  y + " -- d: " + deltaPos.y)
  }


  this.onEnterFrame = function(time)
  {
    t = time;
    if( t < endTime){
      var k = (t - startTime) / duration;
      x = startPos.x + deltaPos.x * k;
      y = startPos.y + deltaPos.y * k;
    }
    else {
      //COMPLETE
      console.log( "+++++++++++++++++++++++++ COMPLETE ")
    }
  }
}
