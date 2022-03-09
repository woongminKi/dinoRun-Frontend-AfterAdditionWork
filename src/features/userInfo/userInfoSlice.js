import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    user: {
      _id: "",
      displayName: "",
      email: "",
      imageUrl: "",
    },
  },
  reducers: {
    getUserData: (state, action) => {
      state.user = Object.assign({}, action.payload);
    },
    logoutUserData: (state) => {
      state.user = {
        _id: "",
        displayName: "",
        email: "",
        imageUrl: "",
      };
    },
  },
});

export const { getUserData, logoutUserData } = userInfoSlice.actions;

export default userInfoSlice.reducer;
