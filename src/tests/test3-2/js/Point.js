function Point(posX,posY){

  var x, y, targetPos;
  var t, startTime, endTime, duration;
  var startPos, targetPos, deltaPos;
  var easingF;
  x = posX;
  y = posY;

  var ripple = 0;
  var rippleMax = 0.5;
  var rippleMin = -0.5;
  var isRipple = false;
  var rippleDir = 1;
  var rippleRand = Math.random() * 0.01 + 0.005;


  this.getX = function(){
    return x;
  }

  this.getY = function(){
    return y;
  }

  this.moveTo = function( pos, durationT, easing )
  {
    easingF = easing;
    startTime = t;
    endTime = startTime + durationT;
    duration = durationT;
    targetPos = pos;
    startPos = {x:x, y:y}
    deltaPos = {x: targetPos.x - startPos.x, y: targetPos.y - startPos.y}
  }

  this.autoRipple = function()
  {
    ( isRipple ) ? isRipple = false : isRipple = true;
  }


  this.onEnterFrame = function(time)
  {
    t = time;

    if( ripple > rippleMax ){
      rippleDir = -1;
    }
    else if (ripple < rippleMin){
      rippleDir = 1;
    }

    if( isRipple )  ripple += rippleRand * rippleDir;

    if( t < endTime){
      var k = (t - startTime) / duration;
      if( easingF){
        k = easingF( k );
      }

      x = startPos.x + deltaPos.x * k;
      y = startPos.y + deltaPos.y * k;

    }
    else {
      //COMPLETE
      x = x+ripple;
      y = y;
    }
  }
}
