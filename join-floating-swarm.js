function isRunningOnDat() {
  return (location.protocol === 'dat:');
}

function maybeJoinFloatingSwarm() {
  if (isRunningOnDat()) {
    var script = document.createElement('script');
    script.type='text/javascript';
    script.src = 'dat://31f852450f22d5b485eac4eb892df0cd148aa7b997894d2f82a53a231ff02faa/floatingswarm.js';
    document.body.appendChild(script);
  }
}

maybeJoinFloatingSwarm();
