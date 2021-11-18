import { ALL_REPORTS  } from "../types";

export const allRooms = (allReports) => ({
  type: ALL_REPORTS ,
  payload: allReports,
});
