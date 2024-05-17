import { fetchUserData } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const useUser = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const user = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      await dispatch(fetchUserData());
    } catch (error) {
      throw error;
    }
  };
  return { user, userState };
};
