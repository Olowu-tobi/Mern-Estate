import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isRequestLoading: false,
  },
  reducers: {
    setRequestLoading(state, action) {
      state.isRequestLoading = action.payload;
    },
  },
});

export const { setRequestLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
