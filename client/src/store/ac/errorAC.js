import { ERROR_SET_ERROR, ERROR_DELETE_ERROR } from '../types/errorTypes';

export const setErrorMessage = (value) => {
  return {
    type: ERROR_SET_ERROR,
    payload: value,
  };
};

export const clearErrorMessage = () => {
  return {
    type: ERROR_DELETE_ERROR,
  };
};
