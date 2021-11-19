import { ALL_CURRENT_REPORTS } from "../types/currentReportsTypes";

export const allRooms = (currentReports) => ({
  type: ALL_CURRENT_REPORTS,
  payload: currentReports,
});
