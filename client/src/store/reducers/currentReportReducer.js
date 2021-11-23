import { SET_REPORT, SET_COMMENT } from '../types/reportsTypes';

export const currentReportReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_REPORT:
      return payload;
    case SET_COMMENT:
      return { ...state, Comments: [payload, ...state.Comments] };
    default:
      return state;
  }
};

export default currentReportReducer;
