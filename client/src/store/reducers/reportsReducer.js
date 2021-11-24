import { SET_REPORTS } from "../types/reportsTypes";

export const reportsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_REPORTS:
      return payload
    default:
      return state
  }
};

export default reportsReducer;
