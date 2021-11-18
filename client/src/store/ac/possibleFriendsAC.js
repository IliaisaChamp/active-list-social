import { ALL_POSSIBLE_FRIENDS } from "../types/possibleFriendsTypes";

export const allRooms = (possibleFriends) => ({
  type: ALL_POSSIBLE_FRIENDS,
  payload: possibleFriends,
});
