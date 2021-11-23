import { SET_CURRENT_USER_SUBSCRIBES } from '../types/currentUserSubscribesTypes';
import { fetchSubscribes } from './subscribesAC';

export const setCurrentUserSubscribes = (subscribes) => {
  return {
    type: SET_CURRENT_USER_SUBSCRIBES,
    payload: subscribes,
  };
};

export const getCurrentUserSubscribes = (currentUserId) => (dispatch) => {
  fetchSubscribes(currentUserId)
    .then((response) => {
      dispatch(setCurrentUserSubscribes(response.data.followings));
    })
    .catch((err) => console.log(err));
};
