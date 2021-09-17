import mapboxgl from 'mapbox-gl';

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoicmhpbm94ZCIsImEiOiJja3RpbnlyZ3EwOHpnMnBvMDh2bnFpNWpsIn0.c-2WvUxt8jwiWtwBqZaD2w';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/rhinoxd/cktipx6hp35xr18nylp2c49eq',
    scrollZoom: false,
    center: [-118.113491, 34.111745],
    // zoom: 4
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new maxbogl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
