function Point(posX,posY,attribute,rippleCoef){

  var x, y, targetPos, att;
  var t, startTime, endTime, duration;
  var startPos, targetPos, deltaPos;
  var easingF;
  x = posX;
  y = posY;
  att = attribute

  var ripple = 0;
  var rippleMax = 0.5;
  var rippleMin = -0.5;
  var isRipple = false;
  var rippleDir = 1;
  //var rippleRand = Math.random() * 0.01 + 0.005;
  var rippleRand = rippleCoef;
  var infX = 0;
  var infY = 0;
  var cumulatedInf = 0;

  this.getX = function(){
    return x;
  }

  this.getY = function(){
    return y;
  }

  this.getAtt = function(){
    return att;
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

  this.influence = function( influenceX, influenceY )
  {

    infX = influenceX;
    infY = influenceY;

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

    if( isRipple )  ripple += (rippleRand * rippleDir);

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

      cumulatedInf += infX;

      if( cumulatedInf > 100 ){
        cumulatedInf = 100;
        infX = 0;
      }else if( cumulatedInf < -100 ){
        cumulatedInf = -100;
        infX = 0;
      }
      else{
      }

      x = x + ripple + infX;
      y = y;

    }
  }
}

module.exports = Point;
