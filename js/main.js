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

function getCodePenHtml(title) {
  return '<!DOCTYPE html>\n'.concat(
    '<html>\n',
    '  <head>\n',
    '    <title>', title, '</title>\n',
    '    <link rel="stylesheet" href="https://morisil.github.io/cartesian-creatures/css/codepen.css" />\n',
    '    <script type="text/javascript" src="https://morisil.github.io/cartesian-creatures/js/tube.js"></script>\n',
    '    <script type="text/javascript" src="https://morisil.github.io/cartesian-creatures/js/codepen.js"></script>\n',
    '  </head>\n',
    '  <body><canvas></canvas></body>\n',
    '</html>'
  );
}

function importCreature(name, source) {
  var script = document.createElement('script');
  var content = document.createTextNode(
    '(function () {\n'.concat(
      source,
      '  creatures.', name, '.getColor = getColor;\n',
      '  if (typeof setUpContext === "function") { creatures.', name, '.setUpContext = setUpContext; }\n',
      '  else { creatures.', name, '.setUpContext = function(context) { return context } };\n',
      '  if (typeof updateContext === "function") { creatures.', name, '.updateContext = updateContext; }\n',
      '  else { creatures.', name, '.updateContext = function(context) { return context } };\n',
      '})();'
    )
  );
  script.appendChild(content);
  document.head.appendChild(script);
}

function createCreatureReviver(name) {
  var a = document.createElement('a');
  a.appendChild(document.createTextNode(name));
  a.href = '#'.concat(name);
  a.classList.add('creature-label');
  a.onclick = function(event) {
    event.preventDefault();
    history.pushState(null, null, a.href);
    dispatchEvent(new PopStateEvent('popstate'));
  }
  return a;
}

function loadResource(uri, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', uri, true);
  xhr.onreadystatechange = function () {
    if (
      (xhr.readyState == 4)
      && ((xhr.status == 200) || (xhr.status == 0)) // local file
    ) {
      callback(xhr.responseText);
    }
  };
  xhr.send(null);
}

function loadCreatureSource(name, callback) {
  return loadResource('creatures/'.concat(name, '.js'), callback);
}

function toCodePenPayload(data) {
  return JSON.stringify(data)
    .replace(/'"'/g, '&quot')
    .replace(/"'"/g, '&apos;');
}

function prepareCodePenData(title, source) {
  var data = {
    title: title,
    js: source,
    html: getCodePenHtml(title),
    editors: '001',
    layout: 'left'
  }
  return data;
}

function createCreatureMutator(name) {
  var form = document.createElement('form');
  form.action = 'https://codepen.io/pen/define';
  form.method = 'POST';
  form.id = name;
  var data = document.createElement('input');
  data.type = 'hidden';
  data.name = 'data';
  loadCreatureSource(
    name,
    function(source) {
      data.value = toCodePenPayload(
        prepareCodePenData(name, source)
      );
    }
  );
  var submit = document.createElement('input');
  submit.type = 'submit';
  submit.value = '(mutate!)';
  form.appendChild(data);
  form.appendChild(submit);
  return form;
}

function createAuthor(specs) {
  var node;
  var content = document.createTextNode(specs.author);
  if (specs.url) {
    node = document.createElement('a')
    node.href = specs.url;
    node.appendChild(content);
  } else {
    node = content;
  }
  return node;
}

function createCreatureListItem(label, specs) {
  var item = document.createElement('li')
  item.appendChild(createCreatureReviver(label))
  item.appendChild(document.createTextNode(' '));
  item.appendChild(createCreatureMutator(label));
  item.appendChild(document.createTextNode(' by '));
  item.appendChild(createAuthor(specs))
  return item;
}

function loadCreature(name, callback) {
  if (creatures[name].loaded) {
    callback();
  } else {
    loadCreatureSource(name, function(source) {
      importCreature(name, source);
      creatures[name].loaded = true;
      callback();
    });
  }
}

function fillCreatureList() {
  var creatureList = document.querySelector('.creature-list');
  Object.keys(creatures).forEach(function(name) {
    creatureList.appendChild(createCreatureListItem(name, creatures[name]));
  });
}

function getCreatureNameFromLocationHash() {
  return location.hash.substr(1);
}

function isEscapeKey(evt) {
  evt = evt || window.event;
  var result = false;
  if ('key' in evt) {
      result = (evt.key == 'Escape' || evt.key == 'Esc');
  } else {
      result = (evt.keyCode == 27);
  }
  return result;
}

function initialize() {

  var body = document.querySelector('body');
  var main = document.querySelector('main');
  var introDisplay = document.querySelector('.intro-display');
  var creatureDisplay = document.querySelector('.creature-display');
  var introTube = initializeTube(introDisplay);
  var tube = initializeTube(creatureDisplay);

  var intro = {
    setUpContext: function(context) { return context },
    updateContext: function(context) { return context },
    getColor: function(x, y, now, context) {
      var red   = x;
      var green = y;
      var blue  = (now / 5) % 256;
      return [red, green, blue];
    }
  };

  function fadeInMainContent() {
    creatureDisplay.style.display = 'none';
    main.style.visibility = 'visible';
    body.style.overflow = 'visible';
    introTube.startCathodeRay(intro);
    main.classList.remove('hidden');
  }

  function fadeInCreature(name) {
    creatureDisplay.style.display = 'block';
    tube.startCathodeRay(creatures[name]);
    creatureDisplay.classList.remove('hidden');
  }

  function showMainContent() {
    creatureDisplay.classList.add('hidden');
    window.setTimeout(function() {
      tube.stopCathodeRay();
      fadeInMainContent();
    }, 1001); // 1s, aligned with css
  }

  function showCreature(name) {
    loadCreature(name, function() {
      introTube.stopCathodeRay();
      main.classList.add('hidden');
      window.setTimeout(function() {
        main.style.visibility = 'hidden';
        body.style.overflow = 'hidden';
        fadeInCreature(name);
      }, 1001); // 1s, aligned with css
    });
  }

  function handleInitialState() {
    var name = getCreatureNameFromLocationHash();
    if (name == '') {
      fadeInMainContent();
    } else {
      main.style.visibility = 'hidden';
      body.style.overflow = 'hidden';
      loadCreature(name, function() {
        fadeInCreature(name);
      });
    }
  }

  window.onpopstate = function(event) {
    tube.stopCathodeRay(); // just in case some other ray is running, if someone is changing hash from URL
    var name = getCreatureNameFromLocationHash();
    if (name == '') {
      showMainContent();
    } else {
      showCreature(name);
    }
  }

  document.onkeydown = function(event) {
    if (tube.active && isEscapeKey(event)) {
      event.preventDefault();
      history.pushState(null, null, '#');
      dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  window.onresize = function() {
    tube.resize();
  };

  handleInitialState();
}

window.onload = function() {
  maybeJoinFloatingSwarm();
  fillCreatureList();
  initialize();
};
