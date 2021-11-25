import { SET_REPORTS, ALL_REPORTS_FOR_TOP, CURRENT_TASK_REPORTS, REPORTS_FOR_TOP_SORTED_BY_COMMENTS, REPORTS_FOR_TOP_SORTED_BY_LIKES } from '../types/reportsTypes';

export const reportsReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_REPORTS:
      return payload;
    case ALL_REPORTS_FOR_TOP:
      return payload;
    case CURRENT_TASK_REPORTS:
      return payload;
    case REPORTS_FOR_TOP_SORTED_BY_COMMENTS:
      return [...state].sort((a, b) => -a.Comments.length + b.Comments.length)
    case REPORTS_FOR_TOP_SORTED_BY_LIKES:
      return [...state].sort((a, b) => -a.Likes.length + b.Likes.length)
    default:
      return state;
  }
};

export default reportsReducer;
