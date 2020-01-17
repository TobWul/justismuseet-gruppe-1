import React, { useState, useRef, useEffect } from 'react';
import MapGL, { Source, Layer, FlyToInterpolator } from 'react-map-gl';
import sanity from '../../lib/sanity';
import { preparePointData } from './mapUtils';
import style from './Map.module.scss';
import Popup from '../Popup';

import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer
} from './layers';
import TextComponent from './textComponent/TextComponent';

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
  const [showManyPopup, setShowManyPopup] = useState(false);
  const [id, setId] = useState(null);
  const sourceRef = useRef(null);
  const map = useRef(null);
  const popup = useRef(null);

  const pointLocationQuery = `*[_type == "execution"]{
    location,
    _id
  }`;

  const onViewportChange = viewport => setViewport(viewport);

  const onPointClick = event => {
    const feature = event.features[0];
    const clusterId = feature && feature.properties.cluster_id;
    const selectedPoints = map.current.queryRenderedFeatures(event.point);

    const mapboxSource = sourceRef.current.getSource();

    feature &&
      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) {
          return;
        }

        onViewportChange({
          ...viewport,
          longitude: feature.geometry.coordinates[0],
          latitude: feature.geometry.coordinates[1],
          zoom,
          transitionDuration: 500,
          transitionInterpolator: new FlyToInterpolator()
        });
      });

    if (selectedPoints.some(el => el.properties.id)) {
      setId(selectedPoints.filter(el => el.properties.id)[0].properties.id);
      // popup.fetchExecutionData(id);
    }
  };

  useEffect(() => {
    // Fetching data from Sanity
    sanity
      .fetch(pointLocationQuery)
      .then(data => {
        setPointData(preparePointData(data));
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <>
      <TextComponent id={id} />
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/tobiaswulvik/ck5f6pi0r0np41ht5pyof68o6"
        onViewportChange={onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id]}
        onClick={onPointClick}
        ref={map}
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
    </>
  );
};

export default Map;
