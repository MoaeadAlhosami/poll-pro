// src/services/questionService.js
import axiosInstance from "./axiosConfig";
import { endPoints } from "./endPoints";

export const updateQuestion = async (id, payload) => {
  const response = await axiosInstance.put(
    endPoints.updateQuestion(id),
    payload
  );
  return response.data;
};
