import { SET_ONLINE } from "../types/onlineUsersTypes";

const initState = [];

function onlineUsersReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ONLINE:
      return payload;
    default:
      return state;
  }
}

export default onlineUsersReducer;
