import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import loadingReducer from "../features/slices/loadingSlice";
import userReducer from "../features/slices/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  user: userReducer,
});

export default rootReducer;
