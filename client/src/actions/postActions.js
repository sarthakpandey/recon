import Axios from "axios";

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
