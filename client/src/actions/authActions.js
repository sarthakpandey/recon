import * as ACTION_TYPE from "./actionTypes";
import axios from "axios";

export const setUser = user => {
  return {
    type: ACTION_TYPE.SET_USER,
    payload: user
  };
};

export const loginUser = values => async dispatch => {
  try {
    const response = await axios.post("/api/auth/login", values);
    dispatch(setUser(response.data.user));
  } catch (err) {
    console.log(err);
  }
};
