import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    error: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.isLoggedIn = false;
    },
    loginSuccess: (state) => {
      state.isLoggedIn = true;
    },
    loginFailure: (state, action) => {
      const { message, status } = action.payload;

      state.error = {
        message,
        status,
      };

      state.isLoggedIn = false;
    },
    logoutRequest: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logoutRequest } =
  authSlice.actions;

export default authSlice.reducer;
