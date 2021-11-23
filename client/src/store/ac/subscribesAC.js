import axios from 'axios';
import { SET_SUBSCRIBES } from '../types/subscribesTypes';

const BASE_URL = 'http://localhost:3001/api';

export const setSubscribes = (subscribers) => {
  return {
    type: SET_SUBSCRIBES,
    payload: subscribers,
  };
};

const fetchSubscribes = (userId) => {
  return axios(`${BASE_URL}/users/${userId}/followings`);
};

export const getSubsribes = (userId) => (dispatch) => {
  // axios(`${BASE_URL}/users/${userId}/followings`)
  fetchSubscribes(userId)
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
      console.log(response);
      dispatch(setSubscribes(response.data.followings));
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
