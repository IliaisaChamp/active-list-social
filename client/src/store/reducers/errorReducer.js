import { ERROR_SET_ERROR, ERROR_DELETE_ERROR, } from '../types/errorTypes';

const authReducer = (state = '', action) => {
  const { type, payload } = action;
  switch (type) {
    case ERROR_SET_ERROR:
      return payload;
    case ERROR_DELETE_ERROR:
      return null;
    default:
      return state;
  }
};

export default authReducer;
