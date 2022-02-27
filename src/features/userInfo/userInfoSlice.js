import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    user: {
      _id: "",
      displayName: "",
      email: "",
      imageUrl: "",
      score: 0,
      accessToken: "",
      refreshToken: "",
    },
  },
  reducers: {
    getUserData: (state, action) => {
      state.user = Object.assign({}, action.payload);
    },
  },
});

export const { getUserData } = userInfoSlice.actions;

export default userInfoSlice.reducer;
