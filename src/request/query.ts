import { axiosInstance } from "./instance";

export const queryTest = async () => {
  const response = await axiosInstance.get("/todos/1");
  return response.data;
};
