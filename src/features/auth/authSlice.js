import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isSignUp: false,
    error: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.isLoggedIn = false;
    },
    loginFailure: (state, action) => {
      const { message, status } = action.payload;

      state.error = {
        message,
        status,
      };

      state.isLoggedIn = false;
    },
  },
});

export const { loginRequest, loginFailure } = authSlice.actions;

export default authSlice.reducer;
