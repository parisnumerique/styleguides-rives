var svgElemnt, path;
var connected, tweening, tween;
var mousePos = {}, svgTop, svgLeft;

function init() {
  svgElement = document.getElementById('svg');
  path = document.getElementById('curve');
  setSVGTop();
  setSVGLeft();
  addListeners();
  loop();
}

function setSVGTop() {
  svgTop = svgElement.getBoundingClientRect().top;
}

function setSVGLeft() {
  svgLeft = svgElement.getBoundingClientRect().left;
}

function addListeners() {
  window.addEventListener('mousemove', function(e) {
    // storing the y position of the mouse - we want the y pos relative to the SVG container so we'll subtract the container top from clientY.
    mousePos.y = e.clientY - svgTop;
    mousePos.x = e.clientX - svgLeft;
    console.log( e.clientX )
    });

  window.addEventListener('resize', setSVGTop);

  path.addEventListener('mouseover', function() {
    // if we haven't connected yet and we're not tweening back to center, bgin connection
    if (!connected && !tweening) {
      connected = true;
      svgElement.style.cursor = 'pointer';
    }
    });
}

function updateCurve() {
  var y = mousePos.y;
  var x = mousePos.x;
  y = mousePos.y - (150-mousePos.y)*1.1;
  x = mousePos.x - (200-mousePos.x)*1.1;
  if (Math.abs(150-y) > 150) {
    connected = false;
    tweening = true;
    svgElement.style.cursor = 'default';
    snapBack(x, y);
  } else {
    path.setAttribute('d', 'M10,150 Q'+x+','+y+' 390,150');
  }
}

function snapBack(x, y) {
  tween = new TWEEN.Tween({ x: x, y: y })
    .to({ x:200, y:150 }, 800)
    .easing( TWEEN.Easing.Elastic.Out )
    .onUpdate( function () {
      updatePath(this.x, this.y);
    }).onComplete(function() {
      tweening = false;
    }).start();
}

function updatePath(x, y) {
  // update SVG path control point
  path.setAttribute('d', 'M10,150 Q'+x+','+y+' 390,150');
}

function loop(time) {
  if (connected) updateCurve();
  TWEEN.update(time);
  requestAnimationFrame(loop);
}

window.onload = init;
