import axios from 'axios';
import {
  SET_COMMENT,
  SET_REPORT,
  SET_REPORTS,
  ALL_REPORTS_FOR_TOP,
  CURRENT_TASK_REPORTS,
  REPORTS_FOR_TOP_SORTED_BY_COMMENTS,
  REPORTS_FOR_TOP_SORTED_BY_LIKES,
} from '../types/reportsTypes';
import { setErrorMessage, setSuccessMessage } from './flashAC';
import { startLoading, stopLoading } from './isLoadingAC';
import { BASE_URL_API } from '../../config/constants';

export const setReports = (reports) => ({
  type: SET_REPORTS,
  payload: reports,
});

export const currentTaskReports = (taskID) => async (dispatch) => {
  const response = await axios(`${BASE_URL_API}/reports/tasks/${taskID}`);
  const { reports } = response.data;

  dispatch({
    type: CURRENT_TASK_REPORTS,
    payload: reports,
  });
};

export const setAllReportsForTop = () => async (dispatch) => {
  dispatch(startLoading());
  const response = await axios(`${BASE_URL_API}/reports/top`);
  const { reports } = response.data;
  dispatch({
    type: ALL_REPORTS_FOR_TOP,
    payload: reports,
  });
  dispatch(stopLoading());
};

export const setAllReportsForTopSortedByComments = () => ({
  type: REPORTS_FOR_TOP_SORTED_BY_COMMENTS,
});

export const setAllReportsForTopSortedByLikes = () => ({
  type: REPORTS_FOR_TOP_SORTED_BY_LIKES,
});

export const setNewReport = (data, taskID, userID, navigate, socket) => async (dispatch) => {
  await axios
    .post(`${BASE_URL_API}/tasks/${taskID}/report`, data, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    })
    .then((res) => {
      socket.current.emit('report-created', res.data.report);
      dispatch(
        setSuccessMessage({
          message: 'Отчет успешно добавлен',
          type: 'success',
        }),
      );
      navigate(`/profile/${userID}`);
    })
    .catch((e) => {
      console.log(e);
      dispatch(
        setErrorMessage({
          message: e?.response?.data?.message,
          type: 'error',
        }),
      );
    });
};
export const getReports = () => (dispatch) => {
  dispatch(startLoading());
  axios(`${BASE_URL_API}/reports`)
    .then((response) => dispatch(setReports(response.data.reports)))
    .catch((e) => console.log(e))
    .finally(() => dispatch(stopLoading()));
};
const setReportAction = (value) => ({
  type: SET_REPORT,
  payload: value,
});

export const getReportById = (id) => async (dispatch) => {
  dispatch(startLoading());
  await axios(`${BASE_URL_API}/reports/${id}`)
    .then((response) => dispatch(setReportAction(response.data)))
    .catch((e) => console.log(e))
    .finally(() => dispatch(stopLoading()));
};

export const getUserReports = (id) => (dispatch) => {
  dispatch(startLoading());
  axios(`${BASE_URL_API}/users/${id}/reports`)
    .then((response) => {
      dispatch(setReports(response.data.reports));
    })
    .catch((e) => console.log(e))
    .finally(() => dispatch(stopLoading()));
};

export const setComment = (text, id) => async (dispatch) => {
  await axios
    .post(`${BASE_URL_API}/reports/${id}/comment`, {
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

export const getSubsReports = () => async (dispatch) => {
  dispatch(startLoading());
  axios(`${BASE_URL_API}/reports/subs`)
    .then((response) => dispatch(setReports(response.data.reports)))
    .catch((e) => console.log(e))
    .finally(() => dispatch(stopLoading()));
};

export const setAllReports = () => async (dispatch) => {
  dispatch(startLoading());
  axios(`${BASE_URL_API}/reports/top`)
    .then((response) => dispatch(setReports(response.data.reports)))
    .catch((e) => console.log(e))
    .finally(() => dispatch(stopLoading()));
};
