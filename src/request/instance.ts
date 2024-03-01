import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
export const axiosInstance = axios.create({
  baseURL: apiUrl,
});
