
window.onload = function() {
  var screen = document.getElementById("screen");
  var width = screen.offsetWidth;
  var height = screen.offsetHeight;
  screen.width = width;
  screen.height = height;
  var screenContext = screen.getContext("2d");

  var imageData = screenContext.createImageData(width, height);

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
        imageData.data[pixelIndex + 3] = color[3];   // Alpha
      }
    }

  }

  function paint(now) {
      createImage(now);
      screenContext.putImageData(imageData, 0, 0);
      window.requestAnimationFrame(paint);
  }

  window.requestAnimationFrame(paint);
};

window.onresize = function() {
  location.reload();
}
