import { useDispatch, useSelector } from "react-redux";
import { setRequestLoading } from "../slices/loadingSlice";

// Custom hook for accessing loading state and actions
export const useLoading = () => {
  const dispatch = useDispatch();
  const isRequestLoading = useSelector(
    (state) => state.loading.isRequestLoading
  );

  const setLoading = (isLoading) => {
    dispatch(setRequestLoading(isLoading));
  };

  return {
    isRequestLoading,
    setLoading,
  };
};
