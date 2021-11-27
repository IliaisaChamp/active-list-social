import axios from 'axios';
import { SET_USERS_LIST } from '../types/usersListTypes';
import { setErrorMessage } from './flashAC';
import { startLoading, stopLoading } from './isLoadingAC';

const BASE_URL = 'http://localhost:3001/api';

export const setUsersList = (usersList) => ({
  type: SET_USERS_LIST,
  payload: usersList,
});

export const getRecommendedUsers = () => (dispatch) => {
  dispatch(startLoading());
  axios(`${BASE_URL}/users/recommendation`)
    .then((response) => {
      dispatch(setUsersList(response.data.users));
    })
    .catch(({ response }) => dispatch(setErrorMessage(response)))
    .finally(() => dispatch(stopLoading()));

  // dispatch()
};
