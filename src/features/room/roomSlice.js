import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    title: "",
    participants: [],
  },
  reducers: {
    getRoomData: (state, action) => {
      state.title = action.payload.title;

      if (state.participants.length < 3) {
        state.participants.push(action.payload.userObj);
      }
    },
  },
});

export const { getRoomData } = roomSlice.actions;

export default roomSlice.reducer;
