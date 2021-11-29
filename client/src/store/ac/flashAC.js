import {
  FLASH_SET_ERROR,
  FLASH_SET_SUCCESS,
  FLASH_CLEAR,
} from '../types/flashTypes';

export const setErrorMessage = (value) => ({
  type: FLASH_SET_ERROR,
  payload: value,
});

export const clearFlashMessage = (value) => ({
  type: FLASH_CLEAR,
  payload: value,
});

export const setSuccessMessage = (value) => ({
  type: FLASH_SET_SUCCESS,
  payload: value,
});
