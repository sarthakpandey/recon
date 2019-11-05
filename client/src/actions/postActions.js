import Axios from "axios";
import * as ACTION_TYPE from "./actionTypes";

export const refreshPosts = value => dispatch => {
  dispatch({
    type: ACTION_TYPE.SET_REFRESH_POSTS,
    payload: value
  });
};

export const createPost = async data => {
  await Axios.post("/api/post", data);
};

export const getAllPosts = async () => {
  const response = await Axios.get("/api/post");
  return response;
};

export const getPostsFromConnections = async () => {
  const response = await Axios.get("/api/user/posts");
  return response;
};

export const likePost = async id => {
  await Axios.put(`/api/post/like/${id}`);
};

export const unlikePost = async id => {
  await Axios.put(`/api/post/unlike/${id}`);
};

export const addComment = async (id, text) => {
  await Axios.post(`/api/post/comment/${id}`, { text });
};

export const removeComment = async (id, commentId) => {
  await Axios.delete(`/api/post/comment/${id}/${commentId}`);
};
