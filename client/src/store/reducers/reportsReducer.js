import { SET_REPORTS, ALL_REPORTS_FOR_TOP } from '../types/reportsTypes';

export const reportsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_REPORTS:
      return payload;
    case ALL_REPORTS_FOR_TOP:
      return payload;
    default:
      return state;
  }
};

export default reportsReducer;
