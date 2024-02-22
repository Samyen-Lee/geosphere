import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { Map } from "mapbox-gl";

// import PropTypes from "prop-types";

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const [lng, setLng] = useState<number>(-70.9);
  const [lat, setLat] = useState<number>(42.35);
  const [zoom, setZoom] = useState<number>(9);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return <div>
  <div ref={mapContainer} className="map-container" />
  </div>;
};

// Map.propTypes = {};

export default MapComponent;
