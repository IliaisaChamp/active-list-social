import { IS_LOADING } from "../types";

export const allRooms = (isLoading) => ({
  type: IS_LOADING,
  payload: isLoading,
});
