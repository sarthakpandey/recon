import Axios from "axios";

export const getUsersList = async () => {
  const response = await Axios.get("/api/user/list");
  return response;
};
