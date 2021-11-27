import { SET_SOCKET } from '../types/socketTypes';

export const setSocket = (socket) => ({
  type: SET_SOCKET,
  payload: socket,
});
