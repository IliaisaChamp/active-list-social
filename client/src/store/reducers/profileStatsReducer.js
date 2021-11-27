import { DECREMENT_USER_TASK, INCREMENT_USER_TASK, SET_PROFILE_STATS } from '../types/profileStatsTypes';

export const profileStatsReducer = (
  state = { tasksCount: 0, reportsCount: 0, userReportsCount: 0, userTasksCount: 0 },
  action,
) => {
  const { type, payload } = action;
  switch (type) {
  case SET_PROFILE_STATS:
    return payload;

  case INCREMENT_USER_TASK:
    return { ...state, userTasksCount: state.userTasksCount + 1 };

  case DECREMENT_USER_TASK:
    return { ...state, userTasksCount: state.userTasksCount - 1 };

  default:
    return state;
  }
};

export default profileStatsReducer;
