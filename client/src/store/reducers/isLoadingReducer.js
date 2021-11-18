import { } from "../types/isLoadingTypes";

export const isLoadingReducer = (state = 0, action) => {
  const { type, payload } = action;
  switch (type) {
  
    default:
      return state;
  }
};

export default isLoadingReducer;
