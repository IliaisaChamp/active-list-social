import { SET_ONLINE } from "../types/onlineTypes";

const initState = [];

function onlineReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ONLINE:
      return payload;
    default:
      return state;
  }
}

export default onlineReducer;
