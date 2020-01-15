export const preparePointData = data => {
  const points = data.map(feature => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [feature.location.lng, feature.location.lat]
    },
    properties: { species: feature.name }
  }));

  return {
    features: points,
    type: 'FeatureCollection',
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
    crs: { properties: {}, type: 'name' }
  };
};
