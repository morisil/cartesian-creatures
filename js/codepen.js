window.onload = function() {
  var body = document.querySelector('body');
  var canvas = document.querySelector('canvas');
  var tube = initializeTube(canvas);
  var demo = {
    setUpContext: (typeof setUpContext === 'function') ? setUpContext : function(context) { return context },
    updateContext: (typeof updateContext === 'function') ? updateContext : function(context) { return context },
    getColor: getColor
  };
  window.onresize = function() {
    tube.resize();
  };
  tube.startCathodeRay(demo);
};
