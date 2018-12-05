function getColor(x, y, now, context) {
  var timeFactor = (now / 15);
  var red   = (x + ((y + timeFactor) % 64) + y + ((x + timeFactor) % 64)) % 256;
  var green = 0;
  var blue  = (x + ((y + timeFactor) % 128) + y + ((x + timeFactor) % 128)) % 256;
  return [red, green, blue];
}
