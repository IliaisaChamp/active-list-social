import { SET_REPORTS, ALL_REPORTS_FOR_TOP, CURRENT_TASK_REPORTS } from '../types/reportsTypes';

export const reportsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_REPORTS:
      return payload;
    case ALL_REPORTS_FOR_TOP:
      return payload;
    case CURRENT_TASK_REPORTS:
      return payload;
    default:
      return state;
  }
};

export default reportsReducer;
