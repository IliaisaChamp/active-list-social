import { ALL_USERS } from "../types";

export const allRooms = (allUsers) => ({
  type: ALL_USERS,
  payload: allUsers,
});
