import axios from 'axios';
import { SET_SUBSCRIBES } from '../types/subscribesTypes';
import { clearFlashMessage, setSuccessMessage } from './flashAC';
import { startLoading, stopLoading } from './isLoadingAC';

const BASE_URL = 'http://localhost:3001/api';

export const setSubscribes = (subscribes) => {
  return {
    type: SET_SUBSCRIBES,
    payload: subscribes,
  };
};

export const fetchSubscribes = (userId) => {
  return axios(`${BASE_URL}/users/${userId}/followings`);
};

export const getSubsribes = (userId) => (dispatch) => {
  dispatch(startLoading());
  fetchSubscribes(userId)
    .then((response) => {
      dispatch(setSubscribes(response.data.followings));
    })
    .catch((err) => console.log(err))
    .finally(() => dispatch(stopLoading()));
};

export const getCurrentUserSubsribes = (currentUserId) => (dispatch) => {
  // axios(`${BASE_URL}/users/${userId}/followings`)
  fetchSubscribes(currentUserId)
    .then((response) => {
      dispatch(setSubscribes(response.data.followings));
    })
    .catch((err) => console.log(err));
};

export const subscribeOnUser = (userId, followingsId) => (dispatch) => {
  axios
    .post(`${BASE_URL}/users/${followingsId}/follow`)
    .then(() => fetchSubscribes(userId))
    .then((response) => {
      // console.log(response);
      dispatch(setSubscribes(response.data.followings));
      dispatch(setSuccessMessage({ type: 'success', message: 'Подписка оформлена' }));
    })
    .catch((err) => console.log(err));
};

export const unsubscribeFromUser = (userId, followingsId) => (dispatch) => {
  axios
    .post(`${BASE_URL}/users/${followingsId}/unfollow`)
    .then(() => fetchSubscribes(userId))
    .then((response) => dispatch(setSubscribes(response.data.followings)))
    .catch((err) => console.log(err));
};
