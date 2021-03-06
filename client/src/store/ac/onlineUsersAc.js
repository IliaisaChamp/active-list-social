import { SET_ONLINE } from '../types/onlineUsersTypes';
import { setSocket } from './socketAc';

export const setOnline = (online) => ({
  type: SET_ONLINE,
  payload: online,
});

export const createSocketConnect = (socket) => (dispatch) => {
  dispatch(setSocket(socket));
};
