import axiosInstance from "./axiosConfig";
import { endPoints } from "./endPoints";

export const createPoll = async (payload) => {
  const response = await axiosInstance.post(endPoints.createPoll, payload);
  return response.data;
};

export const updatePoll = async (id, payload) => {
  const response = await axiosInstance.put(endPoints.updatePoll(id), payload);
  return response.data;
};

export const getAllPolls = async () => {
  const response = await axiosInstance.get(endPoints.getAllPolls);
  return response.data;
};

export const getPollById = async (id) => {
  const response = await axiosInstance.get(endPoints.getPollById(id));
  return response.data;
};

export const deletePoll = async (id) => {
  const response = await axiosInstance.delete(endPoints.deletePoll(id));
  return response.data;
};
