import { COMPLETE_TASK, REMOVE_TASK, SET_TASKS } from '../types/tasksTypes';

export const tasksReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_TASKS:
      return payload;

    case REMOVE_TASK:
      return state.filter((task) => {
        if (task.id === payload) {
          return false;
        }
        return true;
      });

    case COMPLETE_TASK:
      return state.map((task) => {
        if (task.id === payload) {
          return { ...task, isDone: true };
        }
        return task;
      });

    default:
      return state;
  }
};

export default tasksReducer;
