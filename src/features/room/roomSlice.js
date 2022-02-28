import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [],
    isMakeRoomSuccess: false,
    error: null,
  },
  reducers: {
    getRoomData: (state, action) => {
      state.rooms = [];
      state.isMakeRoomSuccess = false;
    },
    makeRoomSuccess: (state, action) => {
      state.rooms = action.payload.data.roomArray;
      state.isMakeRoomSuccess = true;
    },
    deleteRoomData: (state, action) => {
      const { message } = action.payload;

      if (message === "방이 삭제됐습니다.") {
        state.title = "";
        state.participants = [];
        state.isMakeRoomSuccess = false;
      }
    },
    roomFailure: (state, action) => {
      const { message, status } = action.payload;

      state.error = {
        message,
        status,
      };

      state.isMakeRoomSuccess = false;
    },
  },
});

export const { getRoomData, makeRoomSuccess, deleteRoomData, roomFailure } =
  roomSlice.actions;

export default roomSlice.reducer;
