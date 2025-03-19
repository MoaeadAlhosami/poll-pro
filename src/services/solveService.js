import axiosInstance from "./axiosConfig";
import { endPoints } from "./endPoints";

export const solve = async (payload) => {
  const response = await axiosInstance.post(endPoints.solve, payload);
  return response.data;
};

export const getSolveById = async (id) => {
  const response = await axiosInstance.get(endPoints.getSolveById(id));
  return response.data;
};
