function getColor(x, y, now, context) {
  var red   = x % 256;
  var green = y % 256;
  var blue  = (now / 5) % 256;
  return [red, green, blue];
}
