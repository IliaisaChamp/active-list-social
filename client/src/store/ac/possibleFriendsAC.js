import { ALL_POSSIBLE_FRIENDS } from "../types";

export const allRooms = (possibleFriends) => ({
  type: ALL_POSSIBLE_FRIENDS,
  payload: possibleFriends,
});
