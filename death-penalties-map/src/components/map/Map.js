import React, { useState, useRef, useEffect } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl';
import sanity from '../../lib/sanity';
import { preparePointData } from './mapUtils';

import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer
} from './layers';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoidG9iaWFzd3VsdmlrIiwiYSI6ImNqeHd1NG5jcjA0MGQzcG56MTc5dTN6cHQifQ.9Oejzg6ki693vbomStWxVg'; // Set your mapbox token here

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 65.094,
    longitude: 18.716,
    zoom: 3.71,
    bearing: 0,
    pitch: 0
  });
  const [pointData, setPointData] = useState([]);
  const sourceRef = useRef(null);

  const query = `*[_type == "execution"]{
    location
  }`;

  const onViewportChange = viewport => setViewport(viewport);

  const onPointClick = event => {
    const feature = event.features[0];
    const clusterId = feature.properties.cluster_id;

    const mapboxSource = this._sourceRef.current.getSource();

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }

      onViewportChange({
        ...viewport,
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        zoom,
        transitionDuration: 500
      });
    });
  };

  useEffect(() => {
    sanity.fetch(query).then(data => {
      setPointData(preparePointData(data));
    });
  }, []);

  return (
    <MapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/tobiaswulvik/ck5ckdnwg0c1a1cnst608dhif"
      onViewportChange={onViewportChange}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      interactiveLayerIds={[clusterLayer.id]}
      onClick={onPointClick}
    >
      <Source
        type="geojson"
        data={pointData}
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
        ref={sourceRef}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
    </MapGL>
  );
};

export default Map;
