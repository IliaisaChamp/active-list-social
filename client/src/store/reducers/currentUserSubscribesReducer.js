import { SET_CURRENT_USER_SUBSCRIBES } from '../types/currentUserSubscribesTypes';

const currentUserSubscribesReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CURRENT_USER_SUBSCRIBES:
      return payload;

    default:
      return state;
  }
};

export default currentUserSubscribesReducer;
