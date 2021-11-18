import { ALL_TASKS } from "../types/tasksTypes";

export const allRooms = (tasks) => ({
  type: ALL_TASKS,
  payload: tasks,
});
