import axios from "axios";

export const createProfile = async values => {
  const response = await axios.post("/api/profile", values);
  return response;
};

export const addExperience = async values => {
  const response = await axios.post("/api/profile/experience", values);
  return response;
};
