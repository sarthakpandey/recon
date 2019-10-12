import Axios from "axios";

export const getUsersList = async () => {
  const response = await Axios.get("/api/user/list");
  return response;
};

export const sendFollowRequest = async id => {
  await Axios.post(`/api/user/send/${id}`);
};

export const checkFriend = async id => {
  const response = await Axios.get(`/api/user/check/${id}`);
  return response;
};

export const cancelRequest = async id => {
  await Axios.delete(`/api/user/unsend/${id}`);
};
