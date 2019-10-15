import Axios from "axios";

export const createPost = async data => {
  await Axios.post("/api/post", data);
};
