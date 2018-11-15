window.onload = function() {
  startCathodeRay();
};

// it's a hack, when onresize was the same as onload it was causing significant slowdown after
// each window resize, like if some resources were leaking
window.onresize = function() {
  location.reload();
}
