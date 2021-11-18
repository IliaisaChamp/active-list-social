import { } from "../types/reportsTypes";

export const reportsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
  
    default:
      return state;
  }
};

export default reportsReducer;
