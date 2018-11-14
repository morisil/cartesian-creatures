function getColor(x, y, now, context) {
  var red = (
    (
      Math.sin((now * 0.003) + (x * 0.07)) + 1
    )
    /
    2
  ) * 255;
  var green = (
    (
      Math.sin((now * 0.005) + (x * 0.05)) + 1
    )
    /
    2
  ) * 255;
  var blue = (
    (
      Math.sin((now * 0.007) + (x * 0.03)) + 1
    )
    /
    2
  ) * 255;
  return [red, green, blue];
}
