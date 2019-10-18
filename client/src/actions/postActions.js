import Axios from "axios";
import { async } from "rxjs/internal/scheduler/async";

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
