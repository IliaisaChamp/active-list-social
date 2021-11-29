import {
  NOTIFICATION_NEW_MESSAGE,
  NOTIFICATION_NEW_FOLLOWER,
  NOTIFICATION_NEW_REPORT,
} from '../types/notificationTypes';

const notificationReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
  case NOTIFICATION_NEW_MESSAGE:
    return { ...state, ...payload };
  case NOTIFICATION_NEW_FOLLOWER:
    return { ...state, ...payload };
  case NOTIFICATION_NEW_REPORT:
    return { ...state, ...payload };
  default:
    return state;
  }
};

export default notificationReducer;
