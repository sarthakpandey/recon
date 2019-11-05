import { combineReducers } from "redux";
import authReducer from "./authReducer";
import refreshReducer from "./refreshReducer";

export default combineReducers({
  auth: authReducer,
  refresh: refreshReducer
});
