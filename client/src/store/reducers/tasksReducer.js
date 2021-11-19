import { SET_TASKS } from '../types/tasksTypes';

export const tasksReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_TASKS:
      return payload;

    default:
      return state;
  }
};

export default tasksReducer;
