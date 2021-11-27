import { START_LOADING, STOP_LOADING } from '../types/isLoadingTypes';

export const isLoadingReducer = (state = 0, action) => {
  const { type } = action;
  switch (type) {
  case START_LOADING:
    return state + 1;

  case STOP_LOADING:
    return state - 1;

  default:
    return state;
  }
};

export default isLoadingReducer;
