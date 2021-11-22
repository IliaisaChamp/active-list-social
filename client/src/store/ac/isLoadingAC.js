import { IS_LOADING, STOP_LOADING } from "../types/isLoadingTypes";

export const isLoading = () => ({
  type: IS_LOADING,
});

export const stopLoading = () => ({
  type: STOP_LOADING,
});
