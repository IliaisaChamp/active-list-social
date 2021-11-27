import { SET_USERS_LIST } from '../types/usersListTypes';

export const usersListReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
  case SET_USERS_LIST:
    return payload;

  default:
    return state;
  }
};

export default usersListReducer;
