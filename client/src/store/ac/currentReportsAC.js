import { ALL_CURRENT_REPORTS } from "../types";

export const allRooms = (currentReports) => ({
  type: ALL_CURRENT_REPORTS,
  payload: currentReports,
});
