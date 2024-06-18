import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: null,
};

export const authSlice = createSlice({
  name: "auth_token",
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.access_token = action.payload.access_token;
    },
    removeUserToken: (state) => {
      state.access_token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserToken,removeUserToken } = authSlice.actions;

export default authSlice.reducer;
