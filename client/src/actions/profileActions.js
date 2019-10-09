import axios from "axios";

export const getAllProfiles = async values => {
  const response = await axios.get("/api/profile/all");
  return response;
};

export const createProfile = async values => {
  const response = await axios.post("/api/profile", values);
  return response;
};

export const addExperience = async values => {
  const response = await axios.post("/api/profile/experience", values);
  return response;
};

export const addEducation = async values => {
  const response = await axios.post("/api/profile/education", values);
  return response;
};
