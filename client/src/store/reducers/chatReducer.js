import {
  ADD_CHAT_MESSAGE,
  DELETE_ROOM,
  SET_CHAT,
  SET_CHAT_USERS,
  SET_MESSAGES,
  SET_ROOM,
  SET_ROOMS
} from '../types/chatTypes';

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
    case SET_CHAT_USERS:
      return { ...state, users: payload };
    case ADD_CHAT_MESSAGE:
      return { ...state, messages: [...state.messages, payload] };
    case DELETE_ROOM:
      return { ...state, rooms: [...state.rooms.filter((room) => room.id !== payload)] };
    default:
      return state;
  }
}

export default chatReducer;
