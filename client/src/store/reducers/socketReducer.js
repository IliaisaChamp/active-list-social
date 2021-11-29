import { SET_SOCKET } from '../types/socketTypes';

const initState = {};

function socketReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
  case SET_SOCKET:
    return payload;
  default:
    return state;
  }
}

export default socketReducer;
