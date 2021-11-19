import {
  NOTIFICATION_NEW_MESSAGE,
  NOTIFICATION_NEW_FOLLOWER,
  NOTIFICATION_NEW_REPORT,
} from '../types/errorTypes';

export const setNewFollowerNotification = (value) => {
  return {
    type: NOTIFICATION_NEW_FOLLOWER,
    payload: value,
  };
};

export const setNewReportNotification = (value) => {
  return {
    type: NOTIFICATION_NEW_REPORT,
    payload: value,
  };
};
