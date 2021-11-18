import { ALL_TASKS } from "../types";

export const allRooms = (tasks) => ({
  type: ALL_TASKS,
  payload: tasks,
});
