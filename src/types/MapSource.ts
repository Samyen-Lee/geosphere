import { GeoJSONSource, GeoJSONSourceRaw } from "mapbox-gl";

export interface MapSource {
    name: string,
    data: GeoJSONSourceRaw
}