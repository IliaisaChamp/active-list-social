import axios from 'axios';
import { GET_TASKS_SAGA, REMOVE_TASK, SET_TASKS } from '../types/tasksTypes';

const BASE_URL = 'http://localhost:3001/api';

export const getAllTasks = () => async (dispacth) => {
  const response = await axios(`${BASE_URL}/tasks`);
  console.log('assadfs');
  console.log({ response });

  const { tasks } = response.data;
  dispacth({
    type: SET_TASKS,
    payload: tasks,
  });
};

export const getUsersTasks = (userId) => async (dispacth) => {
  const response = await axios(`${BASE_URL}/users/${userId}/tasks`);
  const { tasks } = response.data;
  dispacth({
    type: SET_TASKS,
    payload: tasks,
  });
};

export const getFilteredTasks = (filter) => {
  return { type: GET_TASKS_SAGA, payload: filter };
};

export const subscribeOnTask = (taskId) => async (dispatch) => {
  const response = await axios.post(`${BASE_URL}/tasks/${taskId}/subscribe`);
  if (response.status < 400) {
    dispatch({
      type: REMOVE_TASK,
      payload: taskId,
    });
  }
};

export const unsubscribeOnTask = (taskId) => async (dispacth) => {
  const response = await axios.delete(`${BASE_URL}/tasks/${taskId}/subscribe`);
  console.log(response);
  dispacth({
    type: REMOVE_TASK,
    payload: taskId,
  });
};
