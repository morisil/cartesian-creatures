function getColor(x, y, now, context) {
  var weightX = x / context.width * 256;
  var weightY = y / context.height * 256;
  var red = (Math.floor(weightX) + (now / 10)) % 256;
  var green = Math.floor(weightY);
  var blue = 0;
  return [red, green, blue, 255];
}
