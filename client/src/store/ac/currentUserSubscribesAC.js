import { SET_CURRENT_USER_SUBSCRIBES } from '../types/currentUserSubscribesTypes';
import { startLoading, stopLoading } from './isLoadingAC';
import { fetchSubscribes } from './subscribesAC';

export const setCurrentUserSubscribes = (subscribes) => ({
  type: SET_CURRENT_USER_SUBSCRIBES,
  payload: subscribes,
});

export const getCurrentUserSubscribes = (currentUserId) => (dispatch) => {
  dispatch(startLoading());
  fetchSubscribes(currentUserId)
    .then((response) => {
      dispatch(setCurrentUserSubscribes(response.data.followings));
    })
    .catch((err) => console.log(err))
    .finally(() => dispatch(stopLoading()));
};
