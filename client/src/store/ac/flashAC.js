import {
  FLASH_SET_ERROR,
  FLASH_SET_SUCCESS,
  FLASH_CLEAR,
} from '../types/flashTypes';

export const setErrorMessage = (value) => {
  return {
    type: FLASH_SET_ERROR,
    payload: value,
  };
};

export const clearFlashMessage = () => {
  return {
    type: FLASH_CLEAR,
  };
};

export const setSuccessMessage = (value) => {
  return {
    type: FLASH_SET_SUCCESS,
    payload: value,
  };
};
