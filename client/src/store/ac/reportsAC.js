import { SET_COMMENT, SET_REPORT, SET_REPORTS, ALL_REPORTS_FOR_TOP, CURRENT_TASK_REPORTS } from '../types/reportsTypes';
import axios from 'axios';
import { setErrorMessage, setSuccessMessage } from './flashAC';

const BASE_URL = "http://localhost:3001/api";

export const setReports = () => async (dispatch) => {
  const response = await axios(`${BASE_URL}/reports`);
  const { reports } = response.data;
  console.log(response.data)
  dispatch({
    type: SET_REPORTS,
    payload: reports,
  });
};

export const currentTaskReports = (taskID) => async (dispatch) => {
  console.log(taskID)
  const response = await axios(`${BASE_URL}/reports/tasks/${taskID}`);
  const { reports } = response.data;
  console.log(response.data)
  dispatch({
    type: CURRENT_TASK_REPORTS,
    payload: reports,
  });

};

export const setAllReportsForTop = () => async (dispatch) => {
  const response = await axios(`${BASE_URL}/reports/top`);
  console.log('response for top', response.data);
  const { reports } = response.data;
  dispatch({
    type: ALL_REPORTS_FOR_TOP,
    payload: reports,
  })
}

export const setNewReport =
  (data, taskID, userID, navigate, socket) => async (dispatch) => {
    await axios
      .post(`${BASE_URL}/tasks/${taskID}/report`, data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        // dispatch(setNewReportNotification('REPORT CREATED'))
        socket.current.emit("report-created", res.data.report);
        dispatch(
          setSuccessMessage({
            message: "Отчет успешно добавлен",
            type: "success",
          })
        );
        navigate(`/profile/${userID}`);
      })
      .catch((e) => {
        console.log(e);
        dispatch(
          setErrorMessage({
            message: e?.response?.data?.message,
            type: "error",
          })
        );
      });
  };

const setReportAction = (value) => ({
  type: SET_REPORT,
  payload: value,
});

export const getReportById = (id) => async (dispatch) => {
  const response = await axios(`${BASE_URL}/reports/${id}`);
  console.log(response.data);
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
