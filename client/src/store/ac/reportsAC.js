import { ALL_REPORTS  } from "../types/reportsTypes";

export const allRooms = (allReports) => ({
  type: ALL_REPORTS ,
  payload: allReports,
});
