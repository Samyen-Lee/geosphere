import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./instance";
import { MapFeature } from "@/types/MapSource";

export const queryTest = async () => {
  const response = await axiosInstance.get("/todos/1");
  return response.data;
};

export const getRessourcesFromCoordinates = async (coordinates: number[]) => {
  if (!coordinates || !coordinates[0] || !coordinates[1]) return null;
  const response = await axiosInstance.get(
    `/api/Place/${coordinates[0]}/${coordinates[1]}`
  );
  return response.data;
};

export const getRessources = async (feature: MapFeature) => {
  if (!feature) return null;
  const { name, maki, iso_3166_1, iso_3166_2 } = feature.properties;
  const config: AxiosRequestConfig<any> | undefined = {
    params: {
      name,
      maki,
      country: iso_3166_1,
      subdivision: iso_3166_2,
      category: feature.properties?.class
    }
  };
  const response = await axiosInstance.get(`/api/Place`, config);
  return response.data;
};
