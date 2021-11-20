import { all } from 'redux-saga/effects';
import { searchTasksWatcher } from './filterTasksSaga';

export default function* rootSaga() {
  yield all([searchTasksWatcher()]);
}
