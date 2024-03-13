import { GeoJsonProperties } from "geojson";
import {
  EventData,
  GeoJSONSource,
  GeoJSONSourceRaw,
  MapLayerEventType,
} from "mapbox-gl";
import { MutableRefObject } from "react";

export interface IMapSource {
  name: string;
  data: GeoJSONSourceRaw;
}

export interface MapFeature {
  id: string | number | undefined;
  properties: GeoJsonProperties;
  coordinates: number[];
}

export type MapIntercationFn<T extends keyof MapLayerEventType> = (
  e?: MapLayerEventType[T] & EventData,
  map?: MutableRefObject<mapboxgl.Map | null>,
  ...args: Array<(...item: any[])=> void | any>
) => void;

export type IInteractions<T extends keyof MapLayerEventType> = {
  eventType: T;
  interactionFn: MapIntercationFn<T>;
  featureId?: string | string[];
};
