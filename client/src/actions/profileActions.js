import Axios from "axios";

export const createProfile = async values => {
  const response = await Axios.post("/api/profile", values);
  return response;
};
