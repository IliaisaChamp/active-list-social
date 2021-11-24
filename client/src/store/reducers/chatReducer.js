import { SET_CHAT, SET_MESSAGES, SET_ROOM, SET_ROOMS } from '../types/chatTypes';

const initState = {};

function chatReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CHAT:
      return payload;
    case SET_ROOMS:
      return { ...state, rooms: payload };
    case SET_ROOM:
      return { ...state, room: payload };
    case SET_MESSAGES:
      return { ...state, messages: payload };
    default:
      return state;
  }
}

export default chatReducer;
