import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../../services/ApiService";
import { toast } from "react-toastify";

const api = new ApiService();

// async thunk for login
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials) => {
    try {
      const loginResp = await api.postWithOutToken("/auth/login", credentials);
      toast.success("Successfully logged in");

      return loginResp;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials) => {
    try {
      const resgisterResp = await api.postWithOutToken(
        "/auth/register",
        credentials
      );
      toast.success("Registered successfully");
      return resgisterResp;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  }
);
export const logoutThunk = createAsyncThunk("/auth/logout", async () => {
  console.log("");
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
    error: null,
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem("token", state.token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        localStorage.removeItem("token");
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem("token", state.token);
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthenticated = false;
        state.token = null;
        localStorage.removeItem("token");
      });
  },
});

export default authSlice.reducer;
