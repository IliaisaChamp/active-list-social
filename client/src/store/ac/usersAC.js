import { ALL_USERS } from "../types/usersTypes";

export const allRooms = (allUsers) => ({
  type: ALL_USERS,
  payload: allUsers,
});
