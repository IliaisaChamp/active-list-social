import { combineReducers } from 'redux';
import tasksReducer from './tasksReducer';
import possibleFriendsReducer from './possibleFriendsReducer';
import isLoadingReducer from './isLoadingReducer';
import reportsReducer from './reportsReducer';
import currentReportReducer from './currentReportReducer';
import authReducer from './authReducer';
import flashReducer from './flashReducer';
import notificationReducer from './notificationReducer';
import currentUserReducer from './currentUserReducer';

const rootReducer = combineReducers({
  user: authReducer,
  currentUser: currentUserReducer,
  flash: flashReducer,
  notification: notificationReducer,
  tasks: tasksReducer,
  possibleFriends: possibleFriendsReducer,
  isLoading: isLoadingReducer,
  reports: reportsReducer,
  currentReport: currentReportReducer,
});

export default rootReducer;
