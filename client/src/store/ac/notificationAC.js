import { NOTIFICATION_NEW_REPORT } from "../types/notificationTypes";

export const setNewReportNotification = (message) => {
  console.log(message);
  return {
    type: NOTIFICATION_NEW_REPORT,
    payload: message ,
  };
};
