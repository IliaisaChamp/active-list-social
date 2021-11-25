import { ADD_CHAT_MESSAGE, DELETE_ROOM, SET_CHAT, SET_CHAT_USERS, SET_MESSAGES, SET_ROOM, SET_ROOMS } from '../types/chatTypes';
import axios from 'axios';
import { setErrorMessage } from './flashAC';

export const openChat = (recipient, t) => async (dispatch, getState) => {
  try {
    const resRoom = await axios.post('/api/rooms', { id: recipient });
    const roomId = resRoom.data.room.id;
    console.log('___________ROOM MEMBERS_______');
    dispatch(chooseChatRoom(roomId));
    console.log('CHAT ROOM CREATED OR RECEIVED', resRoom.data.room);
  } catch (e) {
    setErrorMessage(t('chat.errorMessage'));
    console.log(e);
  }
};

export const setMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    payload: messages,
  };
};

export const createMessage = (formData, roomId, t) => async (dispatch, getState) => {
  try {
    console.log('CREATEMESSAGE ROOM ID', roomId);
    const response = await axios.post(`/api/rooms/${roomId}/messages`, Object.fromEntries(formData));
    const state = getState();
    const { socket } = state;
    const { users } = state.chat;
    const message = response.data.message;
    socket.current.emit('create-message', { message, users, room: roomId });
  } catch (e) {
    setErrorMessage(t('chat.errorMessage'));
    console.log(e);
  }
};

export const chooseChatRoom = (roomId) => async (dispatch, getState) => {
  console.log('CHOOSE CHAT ROOM ROOM ID ->>>>', roomId);
  const response = await axios.get(`/api/rooms/${roomId}/messages`);
  const messages = response.data.messages;
  const state = getState();
  const senderId = state.user.id;
  const recieversId = state.chat.rooms.filter((room) => room.id === roomId).map((room) => room.user.id);
  dispatch(setRoom(roomId));
  dispatch(setChatUsers([senderId, ...recieversId]));
  dispatch(setMessages(messages));
};

export const setRoom = (roomId) => {
  return {
    type: SET_ROOM,
    payload: roomId,
  };
};

export const loadRooms = () => async (dispatch) => {
  const userRooms = await axios.get(`/api/rooms`);
  dispatch(setRooms(userRooms.data.rooms));
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
  console.log('set chat');
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

export const setChatUsers = (users) => {
  return {
    type: SET_CHAT_USERS,
    payload: users,
  };
};

export const addChatMessage = (message) => {
  return {
    type: ADD_CHAT_MESSAGE,
    payload: message,
  };
};

export const leaveRoom = (roomId, t) => async (dispatch) => {
  try {
    await axios.delete(`/api/rooms/${roomId}`);
    dispatch(deleteRoom(roomId));
    console.log('dasdasdasdasd');
  } catch (e) {
    setErrorMessage(t('chat.errorMessage'));
    console.log(e);
  }
};

export const deleteRoom = (roomId) => {
  return {
    type: DELETE_ROOM,
    payload: roomId,
  };
};
