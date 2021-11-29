import { DELETE_SUBSCRIBE, ADD_SUBSCRIBE, SET_SUBSCRIBES } from '../types/subscribesTypes';

export const subscribesReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
  case SET_SUBSCRIBES:
    return payload;
  case ADD_SUBSCRIBE:
    return { ...state, payload };
  case DELETE_SUBSCRIBE:
    return payload;

  default:
    return state;
  }
};

export default subscribesReducer;
