import axios from 'axios';
import { ADD_CHAT_MESSAGE, DELETE_ROOM, SET_CHAT, SET_CHAT_USERS, SET_MESSAGES, SET_ROOM, SET_ROOMS } from '../types/chatTypes';
import { setErrorMessage } from './flashAC';
import { startLoading, stopLoading } from './isLoadingAC';

export const setRoom = (roomId) => ({
  type: SET_ROOM,
  payload: roomId,
});

export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});

export const resetChat = () => ({
  type: SET_CHAT,
  payload: {
    room: null,
    users: [],
    messages: [],
    rooms: [],
  },
});

export const setChat = (payload) => ({
  type: SET_CHAT,
  payload,
});

export const setRooms = (payload) => ({
  type: SET_ROOMS,
  payload,
});

export const setChatUsers = (users) => ({
  type: SET_CHAT_USERS,
  payload: users,
});

export const addChatMessage = (message) => ({
  type: ADD_CHAT_MESSAGE,
  payload: message,
});

export const deleteRoom = (roomId) => ({
  type: DELETE_ROOM,
  payload: roomId,
});

export const loadRooms = () => async (dispatch, getState) => {
  const currentRoom = getState().chat.room;
  if (currentRoom) {
    await axios.put(`/api/rooms/${currentRoom}`, { hasMessages: false });
  }
  const response = await axios.get('/api/rooms');
  const userRooms = response.data.rooms;
  dispatch(setRooms(userRooms));
};

export const chooseChatRoom = (roomId) => async (dispatch, getState) => {
  await axios.put(`/api/rooms/${roomId}`, { hasMessages: false });
  const response = await axios.get(`/api/rooms/${roomId}/messages`);
  const { messages } = response.data;
  const state = getState();
  const senderId = state.user.id;
  const recieversId = state.chat.rooms.filter((room) => room.id === roomId).map((room) => room.user.id);
  dispatch(loadRooms());
  dispatch(setRoom(roomId));
  dispatch(setChatUsers([senderId, ...recieversId]));
  dispatch(setMessages(messages));
};

export const openChat = (recipient, t) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const resRoom = await axios.post('/api/rooms', { id: recipient });
    const roomId = resRoom.data.room.id;
    dispatch(chooseChatRoom(roomId));
  } catch (e) {
    setErrorMessage(t('chat.errorMessage'));
    console.log(e);
  } finally {
    dispatch(stopLoading());
  }
};

export const createMessage = (formData, roomId, t) => async (dispatch, getState) => {
  try {
    const response = await axios.post(`/api/rooms/${roomId}/messages`, Object.fromEntries(formData));
    const state = getState();
    const { socket } = state;
    const { users } = state.chat;
    const { message } = response.data;
    socket.current.emit('create-message', { message, users, room: roomId });
  } catch (e) {
    setErrorMessage(t('chat.errorMessage'));
    console.log(e);
  }
};

export const leaveRoom = (roomId, t) => async (dispatch) => {
  try {
    await axios.delete(`/api/rooms/${roomId}`);
    dispatch(deleteRoom(roomId));
  } catch (e) {
    setErrorMessage(t('chat.errorMessage'));
    console.log(e);
  }
};
