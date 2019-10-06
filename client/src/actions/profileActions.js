import axios from "axios";

export const createProfile = async values => {
  console.log(values);
  const response = await axios.post("/api/profile", values);
  return response;
};
