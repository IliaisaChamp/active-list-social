import { SET_COMMENT, SET_REPORT, SET_REPORTS } from '../types/reportsTypes';
import axios from 'axios';
import { setErrorMessage, setSuccessMessage } from './flashAC';

const BASE_URL = 'http://localhost:3001/api';

export const setReports = () => async (dispatch) => {
  const response = await axios(`${BASE_URL}/reports`);
  const { reports } = response.data;
  dispatch({
    type: SET_REPORTS,
    payload: reports,
  });
};

export const setNewReport = (data, taskID, userID, navigate) => async (dispatch) => {
  await axios
    .post(`${BASE_URL}/tasks/${taskID}/report`, data, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    })
    .then((res) => {
      dispatch(
        setSuccessMessage({
          message: 'Отчет успешно добавлен',
          type: 'success',
        })
      );
      navigate(`/profile/${userID}`);
    })
    .catch(({ response }) =>
      dispatch(
        setErrorMessage({
          message: response?.data?.message,
          type: 'error',
        })
      )
    );
};

const setReportAction = (value) => ({
  type: SET_REPORT,
  payload: value,
});

export const getReportById = (id) => async (dispatch) => {
  const response = await axios(`${BASE_URL}/reports/${id}`);
  dispatch(setReportAction(response.data));
};

export const getUserReports = (id) => async (dispatch) => {
  const response = await axios(`${BASE_URL}/users/${id}/reports`);
  const { reports } = response.data;

  dispatch({
    type: SET_REPORTS,
    payload: reports,
  });
};

export const setComment = (text, id) => async (dispatch) => {
  await axios
    .post(`${BASE_URL}/reports/${id}/comment`, {
      text,
    })
    .then(({ data }) => {
      const { comment } = data;
      dispatch({
        type: SET_COMMENT,
        payload: comment,
      });
    })
    .catch(({ response }) => {
      dispatch(
        setErrorMessage({
          message: response?.data?.message,
          type: 'error',
        }),
      );
    });
};
