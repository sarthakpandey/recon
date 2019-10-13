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

export const getSentRequestsList = async () => {
  const response = await Axios.get("/api/user/sent");
  return response;
};

export const getConnectedList = async () => {
  const response = await Axios.get("/api/user/people");
  return response;
};

export const getReceivedRequestsList = async () => {
  const response = await Axios.get("/api/user/recieved");
  return response;
};

export const acceptRequest = async id => {
  await Axios.post(`/api/user/accept/${id}`);
};

export const ignoreRequest = async id => {
  await Axios.post(`/api/user/ignore/${id}`);
};
