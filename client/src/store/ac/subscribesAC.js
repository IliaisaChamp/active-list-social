import axios from 'axios';
import { SET_SUBSCRIBES } from '../types/subscribesTypes';
import { setSuccessMessage } from './flashAC';
import { startLoading, stopLoading } from './isLoadingAC';
import { BASE_URL_API } from '../../config/constants';

export const setSubscribes = (subscribes) => ({
  type: SET_SUBSCRIBES,
  payload: subscribes,
});

export const fetchSubscribes = (userId) => axios(`${BASE_URL_API}/users/${userId}/followings`);

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
  fetchSubscribes(currentUserId)
    .then((response) => {
      dispatch(setSubscribes(response.data.followings));
    })
    .catch((err) => console.log(err));
};

export const subscribeOnUser = (userId, followingsId) => (dispatch) => {
  axios
    .post(`${BASE_URL_API}/users/${followingsId}/follow`)
    .then(() => fetchSubscribes(userId))
    .then((response) => {
      dispatch(setSubscribes(response.data.followings));
      dispatch(setSuccessMessage({ type: 'success', message: 'Подписка оформлена' }));
    })
    .catch((err) => console.log(err));
};

export const unsubscribeFromUser = (userId, followingsId) => (dispatch) => {
  axios
    .post(`${BASE_URL_API}/users/${followingsId}/unfollow`)
    .then(() => fetchSubscribes(userId))
    .then((response) => dispatch(setSubscribes(response.data.followings)))
    .catch((err) => console.log(err));
};
