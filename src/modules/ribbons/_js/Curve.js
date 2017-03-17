function Curve(){

  var curve;
  var points = [];
  var curveID;

  this.init = function( crv, pts, id ){
    curve = crv;
    points = pts;
    curveID = id;
    this.updateCurve();
  }



  this.moveTo = function( idPoint, pos, duration, easing )
  {
    if( points[idPoint] ){
      points[idPoint].moveTo( pos, duration, easing );
    }
  }


  this.onEnterFrame = function(time)
  {
    for( var i = 0; i < points.length ; i++ ){
      points[i].onEnterFrame( time );
      //console.log( i + " " + points[i].y +" "+points[i].x )

    }

    this.updateCurve();
  }

  this.influence = function( influenceX, influenceY )
  {
    for( var i = 0; i < points.length ; i++ ){
      points[i].influence( influenceX, influenceY );
    }
  }

  this.autoRipple = function()
  {
    if( curve ){
      for ( var i = 0 ; i < points.length ; i ++ ){
        points[i].autoRipple();
      }
    }
  }


  this.updateCurve = function(){

    //<path class="st0" d="M490.5,261.5 c0,0, 36,162 ,35,254 s-43,235- 43,235h-67c0,0,49-92,55-236s-31-253-31-253H490.5z"/>

    if( curve ){

      var path = "";

      for ( var i = 0 ; i < points.length ; i ++ ){

        // console.log( points[i].getAtt() )
        if( points[i].getAtt() != "" ){
          path += points[i].getAtt();
        }


        path += points[i].getX()+','+points[i].getY() + ' ';
      }

      curve.setAttribute('d', "M" + path);

    }

  }

}

module.exports = Curve;
