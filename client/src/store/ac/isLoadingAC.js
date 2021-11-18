import { IS_LOADING } from "../types/isLoadingTypes";

export const allRooms = (isLoading) => ({
  type: IS_LOADING,
  payload: isLoading,
});
