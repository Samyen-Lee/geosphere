import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import mapboxgl, { AnyLayer, Map, MapLayerEventType } from "mapbox-gl";
import ReactDOMServer from "react-dom/server";
import { DialogComponent } from "../Dialog/DialogComponent";
import { checkArrayForNullOrUndefined, classNames } from "../../../utils/index";
import { IInteractions, IMapSource, MapFeature } from "@custom-types/MapSource";
import { useQuery } from "@tanstack/react-query";
import { getRessources } from "src/request/query";
import { Tab } from "@headlessui/react";
import VideoPlayer from "@components/Video/VideoPlayer";
import { AnimatedSettingIcon, CalendarIcon, NotificationOffIcon, UnchargedBatteryIcon } from "@assets/icons/SvgIcons";
import datas from "../../../datas/videos-collection.json";

interface MapProps {
  controls?: boolean;
  sources?: IMapSource[];
  layers?: AnyLayer[];
  interactions?: IInteractions<keyof MapLayerEventType>[];
}

const MapComponent: FC<MapProps> = (props) => {
  const { controls, sources, layers, interactions } = props;
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const [lng, setLng] = useState<number>(-77.04);
  const [lat, setLat] = useState<number>(38.907);
  const [zoom, setZoom] = useState<number>(11.15);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<MapFeature>();
  const [mapControls, setMapControls] = useState([
    new mapboxgl.NavigationControl(),
    new mapboxgl.ScaleControl(),
  ]);

  const [overlayActive, setOverlayActive] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["place-ressources", selected?.id],
    queryFn: () => getRessources(selected),
    enabled: Boolean(selected)
  });
  const { ressources } = data || [];

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

  const openModal = (feature: MapFeature) => {
    setModalOpen(true);
    setSelected(feature);
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

  const onListItemHover = () => {
    setOverlayActive(true);
  };

  const onListItemLeave = () => {
    setOverlayActive(false);
  };

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
      {selected && (
        <DialogComponent
          open={modalOpen}
          onClose={closeModal}
          title="Title"
          desc="Description"
        >
          <Tab.Group>
            <Tab.List className="flex space-x-1 bg-slate-50 p-1">
              {datas.categories.map((category) => (
                <Tab
                  key={category.name}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                      "ring-white/60 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white text-blue-700 shadow"
                        : "text-slate-500 hover:bg-white/[0.12] hover:text-black"
                    )
                  }
                >
                  {category.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="flex mt-2 overflow-hidden">
              {datas.categories.map((_, idx) => (
                <Tab.Panel key={idx} className={classNames("overflow-hidden")}>
                  <ul
                    data-te-infinite-scroll-init
                    className={classNames(
                      "grid divide-x divide-y sm:grid-cols-2 lg:grid-cols-3 overflow-y-auto max-h-full"
                    )}
                  >
                    {ressources?.map((ressource, id) => (
                      <li
                        key={`ressource-${id}`}
                        className={classNames(
                          "relative hover:grayscale-0 hover:z-50",
                          overlayActive ? "grayscale" : "grayscale-0"
                        )}
                        onMouseEnter={onListItemHover}
                        onMouseLeave={onListItemLeave}
                        // onClick={(e) => openContentPanel(ressource)}
                      >
                        <VideoPlayer src={ressource.source} autoPlay />
                      </li>
                    ))}
                  </ul>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
          <div className="group fixed bottom-0 right-0 p-6  flex items-end justify-end w-24 h-24 ">
            <div className="text-white shadow-xl flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50 absolute  ">
              <AnimatedSettingIcon/>
            </div>
            <div className="absolute rounded-full transition-all duration-[0.2s] ease-out scale-y-0 group-hover:scale-y-100 group-hover:-translate-x-16   flex  p-2 hover:p-3 bg-green-300 scale-100 hover:bg-green-400 text-white">
              <a href="#">
                <UnchargedBatteryIcon/>
              </a>
            </div>
            <div className="absolute rounded-full transition-all duration-[0.2s] ease-out scale-x-0 group-hover:scale-x-100 group-hover:-translate-y-16  flex  p-2 hover:p-3 bg-blue-300 hover:bg-blue-400  text-white">
              <NotificationOffIcon/>
            </div>
            <div className="absolute rounded-full transition-all duration-[0.2s] ease-out scale-x-0 group-hover:scale-x-100 group-hover:-translate-y-14 group-hover:-translate-x-14   flex  p-2 hover:p-3 bg-yellow-300 hover:bg-yellow-400 text-white">
              <CalendarIcon/>
            </div>
          </div>
        </DialogComponent>
      )}
    </div>
  );
};

export default MapComponent;
