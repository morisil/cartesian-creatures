function adjustDelta(value, delta, destinationValue, limit) {
  var newValue = value + delta;
  if (newValue < 0) { return 0; }
  if (newValue > limit) { return limit; }
  if ((delta < 0) && (newValue < destinationValue)) { return destinationValue; }
  if ((delta > 0) && (newValue > destinationValue)) { return destinationValue; }
  return newValue;
}

function pointDistance(x, y, points) {
  var current = { x: x, y: y };
  var sum = 0;
  for (var i = 0; i < points.length; i++) {
    sum += distance(current, points[i])
  }
  return sum / points.length;
}

function newRandomPoint(width, height) {
  return { x: randomInteger(width), y: randomInteger(height) };
}

function newRandomVector(maxVectorSize) {
  return { deltaX: newRandomDelta(maxVectorSize), deltaY: newRandomDelta(maxVectorSize) };
}

function newRandomDelta(maxVectorSize) {
  var delta = 0;
  while (delta == 0) {
    delta = randomInteger(maxVectorSize * 2) - maxVectorSize;
  }
  return delta;
}

function randomInteger(size) {
  return Math.floor(Math.random() * size);
}

function distance(p1, p2) {
  return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
}

function setUpContext(context) {
  var numberOfPoints = 10;
  var maxVectorSize = 6;
  var points = [];
  var destinations = [];
  var vectors = [];
  for (var i = 0; i < numberOfPoints; i++) {
    points.push(newRandomPoint(context.width, context.height));
  }
  for (var i = 0; i < numberOfPoints; i++) {
    destinations.push(newRandomPoint(context.width, context.height));
  }
  for (var i = 0; i < numberOfPoints; i++) {
    vectors.push(newRandomVector(maxVectorSize));
  }
  context.points = points;
  context.destinations = destinations;
  context.vectors = vectors;
  return context;
}

function updateContext(context) {
  var maxVectorSize = 6;
  for (var i = 0; i < context.points.length; i++) {
    var point = context.points[i];
    var destination = context.destinations[i];
    var vector = context.vectors[i];
    var newX = adjustDelta(point.x, vector.deltaX, destination.x, context.width);
    var newY = adjustDelta(point.y, vector.deltaY, destination.y, context.height);
    if (newX != (point.x + vector.deltaX)
        || (newY != (point.y + vector.deltaY))
    ) {
      context.vectors[i] = newRandomVector(maxVectorSize);
      context.destinations[i] = newRandomPoint(context.width, context.height);
    }
    context.points[i] = { x: newX, y: newY };
  }
  return context;
}

function getColor(x, y, now, context) {
  var red = 255 - ((Math.sin(pointDistance(x, y, context.points) * 0.600) + 1) * 255);
  var green = 255 - ((Math.sin(pointDistance(x, y, context.points) * 0.602) + 1) * 255);
  var blue = 255 - ((Math.sin(pointDistance(x, y, context.points) * 0.601) + 1) * 255);
  return [red, green, blue, 255];
}
