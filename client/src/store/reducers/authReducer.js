import {
  AUTH_USER_REGISTRATION,
  AUTH_USER_LOGOUT,
  AUTH_USER_LOGIN,
} from '../types/authTypes';

const authReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_USER_REGISTRATION:
      return payload;
    case AUTH_USER_LOGIN:
      return payload;
    case AUTH_USER_LOGOUT:
      return null;
    default:
      return state;
  }
};

export default authReducer;
