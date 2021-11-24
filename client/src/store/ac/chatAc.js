import { SET_CHAT, SET_MESSAGES, SET_ROOM, SET_ROOMS } from '../types/chatTypes';
import axios from 'axios';

export const openChat = (sender, recipient) => async (dispatch, getState) => {
  const resRoom = await axios.post('/api/rooms', { id: recipient });
  console.log('CHAT ROOM CREATED OR RECEIVED', resRoom.data.room);
  dispatch(
    setChat({
      room: null,
      users: [],
      messages: [],
      rooms: [],
    }),
  );
};

export const setMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    payload: messages,
  };
};

export const createMessage = (formData, roomId) => async (dispatch) => {
  const response = await axios.post(`/api/rooms/${roomId}/messages`, Object.fromEntries(formData));
  console.log(response.data.message)
};

export const chooseChatRoom = (roomId) => async (dispatch) => {
  dispatch(setRoom(roomId));
  const response = await axios.get(`/api/rooms/${roomId}/messages`);
  const messages = response.data.messages;
  dispatch(setMessages(messages));
  console.log('MESSAGES CHAT->>>>>>>>>', messages);
};

export const setRoom = (roomId) => {
  return {
    type: SET_ROOM,
    payload: roomId,
  };
};

export const loadUserChats = (id) => async (dispatch, getState) => {
  const userRooms = await axios.get(`/api/rooms`);
  dispatch(setRooms(userRooms.data.rooms));
  // const resUsers = await axios.get(`/api/rooms/${room}/users`);
  // const users = resUsers.data.users;
  // const messages = await axios.get(`/api/rooms/${room}/messages`);
  // console.log(messages);
  // const currentUserId = getState().user.id;

  // console.log(users);
};

export const resetChat = () => {
  return {
    type: SET_CHAT,
    payload: {
      room: null,
      users: [],
      messages: [],
      rooms: [],
    },
  };
};

export const setChat = (payload) => {
  return {
    type: SET_CHAT,
    payload,
  };
};

export const setRooms = (payload) => {
  return {
    type: SET_ROOMS,
    payload,
  };
};
