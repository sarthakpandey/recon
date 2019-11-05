import * as ACTION_TYPE from "../actions/actionTypes";

const INITIAL_STATE = {
  refresh: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_REFRESH_POSTS:
      return {
        ...state,
        refresh: action.payload
      };
    default:
      return state;
  }
};
