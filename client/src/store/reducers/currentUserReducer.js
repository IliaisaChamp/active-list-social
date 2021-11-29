import { SET_CURRENT_USER } from '../types/currentUserTypes';

export const currentUserReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
  case SET_CURRENT_USER:
    return payload;

  default:
    return state;
  }
};

export default currentUserReducer;
