function initializeTube(canvas) {

  var canvasContext = canvas.getContext("2d");
  var context = {};

  function updateSize() {
    var width = canvas.offsetWidth;
    var height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    context.width = width;
    context.height = height;
    context.imageData = canvasContext.createImageData(width, height);
  }

  function start(demo) {

    function createImage(now) {
      context = demo.updateContext(context);
      var getColor = demo.getColor;
      var width = context.width;
      var height = context.height;
      var imageData = context.imageData;
      for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          var pixelIndex = (y * width + x) * 4;
          var color = getColor(x, y, now, context);
          imageData.data[pixelIndex] = color[0];       // Red
          imageData.data[pixelIndex + 1] = color[1];   // Green
          imageData.data[pixelIndex + 2] = color[2];   // Blue
          imageData.data[pixelIndex + 3] = 255;        // Alpha
        }
      }
    }

    function paint(now) {
      if (tube.active) {
        window.requestAnimationFrame(paint);
      }
      createImage(now);
      canvasContext.putImageData(context.imageData, 0, 0);
    }

    updateSize();
    context = demo.setUpContext(context);
    window.requestAnimationFrame(paint);
  }

  var tube = {
    active: false,
    resize: function() {
      updateSize();
    },
    startCathodeRay: function(demo) {
      this.active = true;
      start(demo);
    },
    stopCathodeRay: function() {
      this.active = false;
    }
  };

  return tube;
}
