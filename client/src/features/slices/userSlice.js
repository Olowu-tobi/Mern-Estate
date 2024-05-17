import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "../../services/ApiService";
import { toast } from "react-toastify";

export const fetchUserData = createAsyncThunk("/profile", async () => {
  const api = new ApiService();
  try {
    const user = await api.getWithToken("/profile");
    toast.success(user.message);
    return user;
  } catch (error) {
    toast.error(error);
    throw error;
  }
});

const user = createSlice({
  name: "profile",
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        (state.user = action.payload), (state.error = null);
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setUser } = user.actions;

export default user.reducer;
