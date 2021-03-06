import { combineReducers } from 'redux';
import tasksReducer from './tasksReducer';
import usersListReducer from './usersListReducer';
import isLoadingReducer from './isLoadingReducer';
import reportsReducer from './reportsReducer';
import currentReportReducer from './currentReportReducer';
import authReducer from './authReducer';
import flashReducer from './flashReducer';
import notificationReducer from './notificationReducer';
import currentUserReducer from './currentUserReducer';
import subscribesReducer from './subscribesReducer';
import onlineUsersReducer from './onlineUsersReducer';
import socketReducer from './socketReducer';
import currentUserSubscribesReducer from './currentUserSubscribesReducer';
import chatReducer from './chatReducer';
import profileStatsReducer from './profileStatsReducer';
import unreadMessagesReducer from './unreadMessagesReducer';

const rootReducer = combineReducers({
  user: authReducer,
  currentUser: currentUserReducer,
  currentUserSubscribes: currentUserSubscribesReducer,
  profileStats: profileStatsReducer,
  flash: flashReducer,
  notification: notificationReducer,
  tasks: tasksReducer,
  subscribes: subscribesReducer,
  usersList: usersListReducer,
  isLoading: isLoadingReducer,
  reports: reportsReducer,
  currentReport: currentReportReducer,
  onlineUsers: onlineUsersReducer,
  socket: socketReducer,
  chat: chatReducer,
  unreadMessages: unreadMessagesReducer,
});

export default rootReducer;
