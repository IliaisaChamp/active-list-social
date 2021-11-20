import { SET_REPORTS } from '../types/reportsTypes';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';

export const setReports = () => async (dispatch) => {
  const response = await axios(`${BASE_URL}/reports`);
  const { reports } = response.data;
  dispatch({
    type: SET_REPORTS,
    payload: reports,
  });
};

export const setNewReport = (data, navigate) => async (dispatch) => {
  const reportData = {
    images: data.getAll('photos'),
    desc: data.get('desc'),
  };
  const response = await axios.post(`${BASE_URL}/reports`, reportData);
  console.log(response);
};
