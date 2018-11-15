function startCathodeRay() {
  var tube = document.getElementById("tube");
  var width = tube.offsetWidth;
  var height = tube.offsetHeight;
  tube.width = width;
  tube.height = height;
  var tubeContext = tube.getContext("2d");

  var imageData = tubeContext.createImageData(width, height);

  var context = {
    imageData: imageData,
    width: width,
    height: height
  };

  if (typeof setUpContext === "function") {
    context = setUpContext(context);
  }

  function createImage(now) {

    if (typeof updateContext === "function") {
      context = updateContext(context);
    }

    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
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
    createImage(now);
    tubeContext.putImageData(imageData, 0, 0);
    window.requestAnimationFrame(paint);
  }

  window.requestAnimationFrame(paint);
};
