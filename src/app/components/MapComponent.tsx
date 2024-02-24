import React, { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl, { AnyLayer, Map } from "mapbox-gl";
import { MapSource } from "@/types/MapSource";
import ReactDOMServer from "react-dom/server";

interface MapProps {
  controls?: boolean;
  sources?: MapSource[];
  layers?: AnyLayer[];
}

const MapComponent = (props: MapProps) => {
  const { controls, sources, layers } = props;
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
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

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
    map.current?.on("mouseenter", "places", (e) => {
      if (!map.current) return;

      // Change the cursor style as a UI indicator.
      map.current.getCanvas().style.cursor = "pointer";

      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      const myElement = <div>Hello, world!</div>;

      // Rendez l'élément React dans une chaîne HTML
      const htmlString = ReactDOMServer.renderToString(myElement);

      // Créez un élément DOM à partir de la chaîne HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlString;

      // Obtenez le premier enfant (le nœud DOM) du conteneur temporaire
      const node: Node | null = tempDiv.firstChild;

      node &&
        popup.setLngLat(coordinates).setDOMContent(node).addTo(map.current);
    });

    map.current?.on("mouseleave", "places", () => {
      if (map.current) {
        map.current.getCanvas().style.cursor = "";
        popup.remove();
      }
    });
  }, [layers, sources]);

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default MapComponent;
