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



  this.moveTo = function( idPoint, pos, duration )
  {
    if( points[idPoint] ){
      points[idPoint].moveTo( pos, duration );
    }
  }


  this.onEnterFrame = function(time)
  {
    for( var i = 0; i < points.length ; i++ ){
      points[i].onEnterFrame( time );

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

      //console.log( "path :: " + path)
      curve.setAttribute('d', "M" + path);
    }

  }

}
