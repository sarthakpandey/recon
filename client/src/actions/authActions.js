import * as ACTION_TYPE from "./actionTypes";
import axios from "axios";

export const setUser = user => {
  return {
    type: ACTION_TYPE.SET_USER,
    payload: user
  };
};

export const loginUser = (values, history) => async dispatch => {
  try {
    const response = await axios.post("/api/auth/login", values);
    await dispatch(setUser(response.data.user));
    history.push("/dashboard");
  } catch (err) {
    console.log(err);
  }
};

export const logoutUser = () => async dispatch => {
  try {
    await axios.get("/api/auth/logout");
    dispatch(setUser(null));
  } catch (err) {
    console.log(err);
  }
};

export const registerUser = (values, history) => async dispatch => {
  try {
    const { email, password } = values;
    await axios.post("/api/auth/register", values);
    await dispatch(loginUser({ email, password }));
    history.push("/create-profile");
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get("/api/auth/status");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
