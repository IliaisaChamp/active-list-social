import { REMOVE_TASK, SET_TASKS } from '../types/tasksTypes';

export const tasksReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_TASKS:
      return payload;

    case REMOVE_TASK:
      console.log(payload);
      return state.filter((task) => {
        if (task.id === payload) {
          return false;
        }
        return true;
      });

    default:
      return state;
  }
};

export default tasksReducer;
