import axios from 'axios';
import { SET_CURRENT_USER } from '../types/currentUserTypes';
import { setErrorMessage } from './flashAC';
import { startLoading, stopLoading } from './isLoadingAC';

const BASE_URL = 'http://localhost:3001/api';

export const setCurrentUser = (userInfo) => ({
  type: SET_CURRENT_USER,
  payload: userInfo,
});

export const getCurrentUser = (userId) => async (dispatch) => {
  dispatch(startLoading());
  axios(`${BASE_URL}/users/${userId}`)
    .then((response) => {
      dispatch(setCurrentUser(response.data.user));
    })
    .catch(({ response }) => {
      dispatch(
        setErrorMessage({
          type: 'error',
          message: response?.data?.message ? response.data.message : 'Непредвиденная ошибка',
        }),
      );
    })
    .finally(() => dispatch(stopLoading()));
};
