window.onload = function() {

    var canvas = document.getElementById("screen");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var context = canvas.getContext("2d");

    var imageData = context.createImageData(canvas.width, canvas.height);

    function createImage(frame, now) {
        var width = canvas.width;
        var height = canvas.height;

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var pixelIndex = (y * width + x) * 4;
                var color = getColor(x, y, frame, now, width, height);

                imageData.data[pixelIndex] = color[0];       // Red
                imageData.data[pixelIndex + 1] = color[1];   // Green
                imageData.data[pixelIndex + 2] = color[2];   // Blue
                imageData.data[pixelIndex + 3] = 255;        // Alpha
            }
        }
    }

    var frame = 0;

    function paint(now) {
        createImage(frame++, now);
        context.putImageData(imageData, 0, 0);
        window.requestAnimationFrame(paint);
    }

    window.requestAnimationFrame(paint);

};
