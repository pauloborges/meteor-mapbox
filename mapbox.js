/* Copyright (c) 2014 Paulo Sérgio Borges de Oliveira Filho
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

var FILES = {
  mapbox: {
    js:   ['https://api.tiles.mapbox.com/mapbox.js/v2.1.5/mapbox.js'],
    css:  ['https://api.tiles.mapbox.com/mapbox.js/v2.1.5/mapbox.css'],
  },

  directions: {
    js:   ['https://api.tiles.mapbox.com/mapbox.js/plugins/mapbox-directions.js/v0.0.1/mapbox.directions.js'],
    css:  ['https://api.tiles.mapbox.com/mapbox.js/plugins/mapbox-directions.js/v0.0.1/mapbox.directions.css']
  },

  zoomslider: {
    js:   ['https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-zoomslider/v0.7.0/L.Control.Zoomslider.js'],
    css:  ['https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-zoomslider/v0.7.0/L.Control.Zoomslider.css']
  },

  pip: {
    js:   ['https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-pip/v0.0.2/leaflet-pip.js'],
    css:  []
  },

  osm: {
    js:   ['https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-osm/v0.1.0/leaflet-osm.js'],
    css:  []
  },

  omnivore: {
    js:   ['https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-omnivore/v0.2.0/leaflet-omnivore.min.js'],
    css:  []
  },

  minimap: {
    js:   ['https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-minimap/v1.0.0/Control.MiniMap.js'],
    css:  ['https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-minimap/v1.0.0/Control.MiniMap.css']
  },

  markercluster: {
    js:   ['https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/leaflet.markercluster.js'],
    css:  [
      'https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/MarkerCluster.css',
      'https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/MarkerCluster.Default.css'
    ],
  },

  // FIXME: Doesn't support IE<9
  // https://www.mapbox.com/mapbox.js/example/v1.0.0/leaflet-locatecontrol/
  locate: {
    js:   ['https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-locatecontrol/v0.24.0/L.Control.Locate.js'],
    css:  ['https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-locatecontrol/v0.24.0/L.Control.Locate.css']
  },

  label: {
    js:   ['https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-label/v0.2.1/leaflet.label.js'],
    css:  ['https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-label/v0.2.1/leaflet.label.css']
  },

  image: {
    js:   ['https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-image/v0.0.4/leaflet-image.js'],
    css:  []
  },

  heat: {
    js:   ['https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-heat/v0.1.0/leaflet-heat.js'],
    css:  []
  },

  hash: {
    js:   ['https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-hash/v0.2.1/leaflet-hash.js'],
    css:  []
  },

  geodesy: {
    js:   ['https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-geodesy/v0.1.0/leaflet-geodesy.js'],
    css:  []
  },

  fullscreen: {
    js:   ['https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v0.0.3/Leaflet.fullscreen.min.js'],
    css:  ['https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v0.0.3/leaflet.fullscreen.css']
  },

  draw: {
    js:   ['https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-draw/v0.2.2/leaflet.draw.js'],
    css:  ['https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-draw/v0.2.2/leaflet.draw.css']
  },

  geojsonExtend: {
    js:   ['https://api.tiles.mapbox.com/mapbox.js/plugins/geojson-extent/v0.0.1/geojson-extent.js'],
    css:  []
  },

  geoViewport: {
    js:   ['https://api.tiles.mapbox.com/mapbox.js/plugins/geo-viewport/v0.1.1/geo-viewport.js'],
    css:  []
  },

  arc: {
    js:   ['https://api.tiles.mapbox.com/mapbox.js/plugins/arc.js/v0.1.0/arc.js'],
    css:  []
  }
};

var deps = new Deps.Dependency;
var loaded = false;

var onLoaded = function () {
  loaded = true;
  deps.changed();
};

var onMapboxLoaded = function (plugins, cb) {
  var pluginCount = _.size(plugins);

  if (pluginCount === 0) {
    cb();
    return;
  }

  var loadCb = function () {
    pluginCount--;

    if (pluginCount === 0) {
      cb();
      return;
    }
  };

  _.each(plugins, function (plugin) {
    loadFiles(FILES[plugin], loadCb);
  });
};

var loadScript = function (src, cb) {
  var elem = document.createElement('script');
  elem.type = 'text/javascript';
  elem.src = src;
  elem.defer = true;

  elem.addEventListener('load', _.partial(cb, src), false);

  var head = document.getElementsByTagName('head')[0];
  head.appendChild(elem);
};

var loadCss = function (href) {
  var elem = document.createElement('link');
  elem.rel = 'stylesheet';
  elem.href = href;

  var head = document.getElementsByTagName('head')[0];
  head.appendChild(elem);
};

var loadFiles = function (files, cb) {
  var loadCount = _.size(files.js);

  var loadCb = function (url) {
    if (Mapbox.debug)
      console.log('Loaded:', url);

    loadCount--;

    if (loadCount === 0)
      cb();
  };

  _.each(files.css, loadCss);
  _.each(files.js, function (url) {
    loadScript(url, loadCb);
  });
};

Mapbox = {
  debug: false,

  load: function () {
    if (loaded)
      return;

    var plugins = _.values(arguments);
    loadFiles(FILES.mapbox, _.partial(onMapboxLoaded, plugins, onLoaded));
  },

  loaded: function () {
    deps.depend();
    return loaded;
  }
};
