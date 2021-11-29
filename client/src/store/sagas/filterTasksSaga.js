import axios from 'axios';
import { put, takeLatest, delay, call } from 'redux-saga/effects';
import { startLoading, stopLoading } from '../ac/isLoadingAC';
import { setTasks } from '../ac/tasksAC';
import { GET_TASKS_SAGA } from '../types/tasksTypes';
import { BASE_URL_API } from '../../config/constants';

const fetchFilteredTasks = async (filter) => {
  const response = await axios(`${BASE_URL_API}/tasks?_filter=${filter}`);
  return response;
};

function* searchTasksWorker(action) {
  try {
    yield delay(500);

    yield put(startLoading());
    const response = yield call(fetchFilteredTasks, action.payload);
    if (response.status === 200) {
      const payload = [...response.data.tasks].map((task) => ({ ...task, Reports: task.Reports.length, Users: task.Users.length }));
      yield put(setTasks(payload));
    }
  } catch (e) {
    console.log(e);
  } finally {
    yield put(stopLoading());
  }
}

export function* searchTasksWatcher() {
  yield takeLatest(GET_TASKS_SAGA, searchTasksWorker);
}
