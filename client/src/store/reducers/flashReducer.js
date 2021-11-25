import { FLASH_SET_ERROR, FLASH_SET_SUCCESS, FLASH_CLEAR } from '../types/flashTypes';

const flashMessageReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case FLASH_SET_ERROR:
      return { ...state, type: payload.type, message: payload.message };
    case FLASH_SET_SUCCESS:
      return { ...state, type: payload.type, message: payload.message };
    case FLASH_CLEAR:
      return { ...state, type: payload.type, message: payload.message };
    default:
      return state;
  }
};

export default flashMessageReducer;
