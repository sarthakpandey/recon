import * as ACTION_TYPE from "../actions/actionTypes";

const INITIAL_STATE = {
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
