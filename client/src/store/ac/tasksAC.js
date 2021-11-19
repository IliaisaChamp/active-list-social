import axios from 'axios';
import { SET_TASKS } from '../types/tasksTypes';

const BASE_URL = 'http://localhost:3001/api';

export const getAllTasks = () => async (dispacth) => {
  const response = await axios(`${BASE_URL}/tasks`);
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

export const subscribeOnTask = (taskId) => async (dispacth) => {
  const response = await axios.post(`${BASE_URL}/tasks/${taskId}`);
  const { tasks } = response.data;
  dispacth({
    type: SET_TASKS,
    payload: tasks,
  });
};
