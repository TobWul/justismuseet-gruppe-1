import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import style from './Map.module.scss';

mapboxgl.accessToken =
  'pk.eyJ1IjoidG9iaWFzd3VsdmlrIiwiYSI6ImNqeHd1NG5jcjA0MGQzcG56MTc5dTN6cHQifQ.9Oejzg6ki693vbomStWxVg';

const Map = () => {
  const [lng, setLng] = useState(18.716);
  const [lat, setLat] = useState(65.094);
  const [zoom, setZoom] = useState(3.71);

  let mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/tobiaswulvik/ck5ckdnwg0c1a1cnst608dhif',
      center: [lng, lat],
      zoom: zoom
    });
  }, []);

  return (
    <div>
      <div class={style.map} ref={el => (mapContainer = el)} />
    </div>
  );
};

export default Map;
