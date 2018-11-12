function getColor(x, y, now, context) {
  var weightX = x / context.width * 256;
  var weightY = y / context.height * 256;
  var mix = weightX * weightY;
  var red   = ((Math.sin((now * 0.003) + mix * (0.0005 * Math.sin(now * 0.001))) + 1) / 2) * 255;
  var green = ((Math.sin((now * 0.005) + mix * (0.0007 * Math.sin(now * 0.001))) + 1) / 2) * 255;
  var blue  = ((Math.sin((now * 0.01) + mix * (0.0009 * Math.sin(now * 0.001))) + 1) / 2) * 255;
  return [red, green, blue, 255];
}
