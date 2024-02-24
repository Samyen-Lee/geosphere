import React, { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl, { AnyLayer, Map } from "mapbox-gl";
import { MapSource } from "@/types/MapSource";
import ReactDOMServer from "react-dom/server";

interface MapProps {
  controls?: boolean;
  sources?: MapSource[];
  layers?: AnyLayer[];
  interactions?: any[];
}

const MapComponent = (props: MapProps) => {
  const { controls, sources, layers, interactions } = props;
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const [lng, setLng] = useState<number>(-77.04);
  const [lat, setLat] = useState<number>(38.907);
  const [zoom, setZoom] = useState<number>(11.15);
  const [mapControls, setMapControls] = useState([
    new mapboxgl.NavigationControl(),
    new mapboxgl.ScaleControl(),
  ]);

  const switchControls = useCallback(() => {
    if (map.current) {
      for (const control of mapControls) {
        if (controls) {
          map.current.addControl(control);
        } else {
          map.current.hasControl(control) && map.current.removeControl(control);
        }
      }
    }
  }, [controls, mapControls]);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    switchControls();
  }, [switchControls]);

  useEffect(() => {
    // Create a popup, but don't add it to the map yet.
    map.current?.on("load", () => {
      if (map.current) {
        if (sources) {
          for (const source of sources) {
            map.current.addSource(source.name, source.data);
          }
        }
        if (layers) {
          for (const layer of layers) {
            map.current.addLayer(layer);
          }
        }
      }
    });
    interactions?.forEach(({ eventType, featureId, interactionFn }) => {
      map.current?.on(eventType, featureId, (e) => {
        if (!map.current) return;
  
        interactionFn(e, map)
      });
    })
  }, [interactions, layers, sources]);

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default MapComponent;
