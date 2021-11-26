import axios from 'axios';
import { SET_PROFILE_STATS } from '../types/profileStatsTypes';
import {startLoading, stopLoading} from './isLoadingAC';

const BASE_URL = 'http://localhost:3001/api/users/';

export const setProfileStats = (stats) => {
  return {
    type: SET_PROFILE_STATS,
    payload: stats,
  };
};
export const resetProfileStats = () => {
  return {
    type: SET_PROFILE_STATS,
    payload: { tasksCount: 0, reportsCount: 0, userReportsCount: 0, userTasksCount: 0 },
  };
};

export const fetchProfileStats = (userId) => {
  return axios(`${BASE_URL}/${userId}/stats`);
};

export const getProfileStats = (userId) => (dispatch) => {
  dispatch(startLoading())
  fetchProfileStats(userId)
    .then((response) => dispatch(setProfileStats(response.data)))
    .catch((e) => console.log(e))
    .finally(() => dispatch(stopLoading()));
};
