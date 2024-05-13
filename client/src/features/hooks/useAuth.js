/* eslint-disable no-useless-catch */
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, logoutThunk, registerThunk } from "../slices/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async (credentials) => {
    try {
      const result = await dispatch(loginThunk(credentials));
      await unwrapResult(result);
      navigate("/"); // Navigate to the homepage after a successful login
    } catch (error) {
      return error.message;
    }
  };

  return login;
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await dispatch(logoutThunk());
    } catch (error) {
      throw error;
    }
  };
  return logout;
};

export const useRegister = () => {
  const dispatch = useDispatch();
  const register = async (credentials) => {
    try {
      const result = await dispatch(registerThunk(credentials));
      await unwrapResult(result);
    } catch (error) {
      throw error;
    }
  };
  return register;
};

export const useAuthState = () => {
  return useSelector((state) => state.auth);
};
