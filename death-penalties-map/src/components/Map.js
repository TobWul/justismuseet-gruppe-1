import React, { useEffect, useState } from 'react';

const Map = () => {
  const [lng, setLng] = useState(65.094);
  const [lat, setLat] = useState(18.716);
  const [zoom, setZoom] = useState(3.71);
  useEffect(() => {
    // Mapbox setupscript
  }, []);
  return <div>Kart</div>;
};

export default Map;
