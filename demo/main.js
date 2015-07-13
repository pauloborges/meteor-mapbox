FlowRouter.route('/', {
  action: function(params) {
    FlowLayout.render('Layout', {content: 'Main'});
  }
});

FlowRouter.route('/gl', {
  action: function(params) {
    FlowLayout.render('Layout', {content: 'GL'});
  }
});

if (Meteor.isClient) {
  Template.Main.onRendered(function () {
    Mapbox.debug = true;
    Mapbox.load({
      plugins: ['markercluster', 'heat']
    });

    this.autorun(function () {
      if (Mapbox.loaded()) {
        L.mapbox.accessToken = 'pk.eyJ1IjoicGF1bG9ib3JnZXMiLCJhIjoicFQ1Sll5ZyJ9.alPGD574u3NOBi2iiIh--g';
        var map = L.mapbox.map('map', 'pauloborges.k8eg55fh');
      }
    });
  });

  Template.Main.helpers({
    html: '<div id="map" class="mapbox"></div>',
    js:   'Mapbox.load();\nTracker.autorun(function () {\n' +
          '\tif (Mapbox.loaded()) {\n' +
          '\t\tL.mapbox.accessToken = MY_ACCESS_TOKEN;\n' +
          '\t\tvar map = L.mapbox.map("map", MY_MAP_ID);\n' +
          '\t}\n' +
          '});'
  });

  Template.GL.onRendered(function () {
    Mapbox.debug = true;
    Mapbox.load({
      gl: true
    });

    this.autorun(function () {
      if (Mapbox.loaded()) {
        mapboxgl.accessToken = 'pk.eyJ1IjoicGF1bG9ib3JnZXMiLCJhIjoicFQ1Sll5ZyJ9.alPGD574u3NOBi2iiIh--g';
        var map = new mapboxgl.Map({
          container: 'map',
          style: 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v7.json',
        });
      }
    });
  });

  Template.GL.helpers({
    html: '<div id="map" class="mapbox"></div>',
    js:   'Mapbox.load({gl: true});\nTracker.autorun(function () {\n' +
          '  if (Mapbox.loaded()) {\n' +
          '    mapboxgl.accessToken = MY_ACCESS_TOKEN;\n' +
          '      var map = new mapboxgl.Map({\n' +
          '      container: "map",\n' +
          '      style: "https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v7.json",\n' +
          '    };\n' +
          '  }\n' +
          '});'
  });
}
