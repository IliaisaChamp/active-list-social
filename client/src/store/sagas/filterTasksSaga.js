import axios from 'axios';
import { put, takeLatest, delay, call, takeEvery } from 'redux-saga/effects';
import { GET_TASKS_SAGA, SET_TASKS } from '../types/tasksTypes';

const BASE_URL = 'http://localhost:3001/api';

const fetchFilteredTasks = async (filter) => {
  console.log({ filter });
  const response = await axios(`${BASE_URL}/tasks?_filter=${filter}`);
  return response;
};

function* searchTasksWorker(action) {
  try {
    yield delay(500);
    const response = yield call(fetchFilteredTasks, action.payload);
    if (response.status === 200) {
      yield put({ type: SET_TASKS, payload: response.data.tasks });
    }
  } catch (e) {
    console.log(e);
  }
}

export function* searchTasksWatcher() {
  yield takeLatest(GET_TASKS_SAGA, searchTasksWorker);
}
