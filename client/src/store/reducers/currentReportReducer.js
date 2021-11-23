import { SET_REPORT } from '../types/reportsTypes';

export const currentReportReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_REPORT:
      return payload;
    default:
      return state;
  }
};

export default currentReportReducer;
