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


    if( curve ){

      var path = "";

      for ( var i = 0 ; i < points.length ; i ++ ){
        if( i == 1 ){
          path += 'Q';
        }
        else if( i == points.length - 1 && points.length > 3){
          path += 'T';
        }

        path += points[i].getX()+','+points[i].getY() + ' ';

      }

      //console.log( "path :: " + path)
      curve.setAttribute('d', "M" + path);
    }

  }

}

module.exports = Curve;
