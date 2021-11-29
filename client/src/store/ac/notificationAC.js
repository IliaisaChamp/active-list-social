import { NOTIFICATION_NEW_REPORT } from '../types/notificationTypes';

export const setNewReportNotification = (message) => ({
  type: NOTIFICATION_NEW_REPORT,
  payload: message,
});
