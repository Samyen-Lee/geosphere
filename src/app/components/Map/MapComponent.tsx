import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import mapboxgl, { AnyLayer, Map, MapLayerEventType } from "mapbox-gl";
import ReactDOMServer from "react-dom/server";
import { DialogComponent } from "../Dialog/DialogComponent";
import { IInteractions, IMapSource } from "@/types/MapSource";

interface MapProps {
  controls?: boolean;
  sources?: IMapSource[];
  layers?: AnyLayer[];
  interactions?: IInteractions<keyof MapLayerEventType>[];
}

const MapComponent: FC<MapProps> =  (props) => {
  const { controls, sources, layers, interactions } = props;
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const [lng, setLng] = useState<number>(-77.04);
  const [lat, setLat] = useState<number>(38.907);
  const [zoom, setZoom] = useState<number>(11.15);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number[]>([]);
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

  const openModal = (coord: number[]) => {
    setModalOpen(true);
    setSelected(coord);
  };

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
    interactions?.forEach(({ eventType, featureId, interactionFn }) => {
      if (featureId) {
        map.current?.on(eventType, featureId, (e) => {
          if (!map.current) return;

          interactionFn(e, map, openModal);
        });
      } else {
        map.current?.on(eventType, (e) => {
          if (!map.current) return;

          interactionFn(e, map, openModal);
        });
      }
    });
  }, [interactions, layers, sources]);

  useEffect(() => {
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
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
      <DialogComponent
        coordinates={selected}
        open={modalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default MapComponent;
