import axiosInstance from "./axiosConfig";
import { endPoints } from "./endPoints";

export const login = async (payload) => {
  const response = await axiosInstance.post(endPoints.auth, payload);
  return response.data;
};
