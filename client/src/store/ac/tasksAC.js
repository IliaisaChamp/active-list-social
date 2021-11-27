import axios from 'axios';
import { COMPLETE_TASK, GET_TASKS_SAGA, REMOVE_TASK, SET_TASKS } from '../types/tasksTypes';
import { setErrorMessage, setSuccessMessage } from './flashAC';
import { startLoading, stopLoading } from './isLoadingAC';

const BASE_URL = 'http://localhost:3001/api';

export const setTasks = (tasks) => ({
  type: SET_TASKS,
  payload: tasks,
});

export const removeTasks = (tasksId) => ({
  type: REMOVE_TASK,
  payload: tasksId,
});

export const getAllTasks = () => async (dispatch) => {
  dispatch(startLoading());
  axios(`${BASE_URL}/tasks`)
    .then((response) => {
      const payload = [...response.data.tasks].map((task) => ({ ...task, Reports: task.Reports.length, Users: task.Users.length }));
      dispatch(setTasks(payload));
    })
    .catch((e) => console.log(e))
    .finally(() => dispatch(stopLoading()));
};

export const getUsersTasks = (userId) => async (dispatch) => {
  dispatch(startLoading());
  axios(`${BASE_URL}/users/${userId}/tasks`)
    .then((response) => dispatch(setTasks(response.data.tasks)))
    .catch((e) => console.log(e))
    .finally(() => dispatch(stopLoading()));
};

export const getFilteredTasks = (filter) => (dispatch) => {
  dispatch({ type: GET_TASKS_SAGA, payload: filter });
};

export const subscribeOnTask = (taskId) => async (dispatch) => {
  axios
    .post(`${BASE_URL}/tasks/${taskId}/subscribe`)
    .then(() => dispatch(removeTasks(taskId)))
    .catch((e) => console.log(e));
};

export const unsubscribeOnTask = (taskId) => async (dispatch) => {
  const response = await axios.delete(`${BASE_URL}/tasks/${taskId}/subscribe`);
  if (response.status < 400) {
    dispatch({
      type: REMOVE_TASK,
      payload: taskId,
    });
  }
};

export const completeTask = (taskId) => async (dispatch) => {
  axios
    .post(`${BASE_URL}/tasks/${taskId}/completed`)
    .then((response) => {
      dispatch(
        setSuccessMessage({
          type: 'success',
          message: response?.data?.message ? response.data.message : 'Задача выполнена! Поздравляю!',
        }),
      );
      dispatch({
        type: COMPLETE_TASK,
        payload: taskId,
      });
    })
    .catch(({ response }) => {
      dispatch(
        setErrorMessage({
          type: 'error',
          message: response?.data?.message ? response.data.message : 'Непредвиденная ошибка',
        }),
      );
    });
};
