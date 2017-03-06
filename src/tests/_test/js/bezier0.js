var svgElemnt, path;
var connected, tweening, tween;
var startPoint = {}, point1 = {}, point2 = {}, endPoint = {};
var mousePos = {}, svgTop, svgLeft, windowsW, windowsH;

$.getScript("Curve.js", function(){});

function init() {
  svgElement = document.getElementById('curve_svg');
  path = document.getElementById('curve');
  addListeners();
  setSVGTop();
  setSVGLeft();
  setParams();
  drawCurve();
  loop();
}

function setParams(){
  windowsW = $( window ).width();
  windowsH = $( window ).height();
}

function addListeners(){
  window.addEventListener('mousemove', function(e) {
    // storing the y position of the mouse - we want the y pos relative to the SVG container so we'll subtract the container top from clientY.
    mousePos.y = e.clientY;
    mousePos.x = e.clientX;
    endPoint.x = endPoint.x + ( mousePos.x -  windowsW * .5) * 0.01;
    });

    window.addEventListener('resize', setParams);
}

function setSVGTop() {
  svgTop = svgElement.getBoundingClientRect().top;
}

function setSVGLeft() {
  svgLeft = svgElement.getBoundingClientRect().left;
}


function animateCurve(startX, startY, endX, endY){
  console.log( "animateCurve" )
  tween = new TWEEN.Tween({ x: startX, y: startY })
    .to({ x:endX, y:endY }, 2000)
    .easing( TWEEN.Easing.Cubic.InOut )
    .onUpdate( function () {
      updateCurve( this.x, this.y )
    }).onComplete(function() {
      animateCurve( endX, endY, startX, startY)
    }).start();
}

function loop(time) {
  TWEEN.update(time);
  requestAnimationFrame(loop);
}

function updateCurve(x, y){
  startPoint = {x: (windowsW / 2), y: -50};
  point1 = {x:x, y:y};
  point2 = {x:  (windowsW/2), y: ((windowsH / 4)*2)};
  path.setAttribute('d', 'M'+startPoint.x+','+startPoint.y+' Q'+point1.x +','+point1.y+' '+point2.x+','+point2.y+' T'+endPoint.x+','+endPoint.y);
}

function drawCurve(){
  startPoint = {x: (windowsW / 2), y: -50};
  point1 = {x: ((windowsW /2)+windowsW/12), y: (windowsH /4)};
  point2 = {x:  (windowsW /2), y: ((windowsH /4)*2)};
  endPoint = {x:  (windowsW / 2), y: (windowsH+50)};

  path.setAttribute('d', 'M'+startPoint.x+','+startPoint.y+' Q'+point1.x +','+point1.y+' '+point2.x+','+point2.y+' T'+endPoint.x+','+endPoint.y);

  animateCurve(((windowsW /2)+windowsW/12), (windowsH /4), ((windowsW /2)-windowsW/12), (windowsH /4) )
}



window.onload = init;
