import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [],
    isMakeRoomSuccess: false,
    error: null,
  },
  reducers: {
    getRoomData: (state) => {
      state.rooms = [];
      state.isMakeRoomSuccess = false;
    },
    makeRoomSuccess: (state, action) => {
      state.rooms = action.payload.data;
      state.isMakeRoomSuccess = true;
    },
    updateRoomData: (state, action) => {
      state.rooms = action.payload.remainRooms;
    },
    deleteRoomData: (state) => {
      state.isMakeRoomSuccess = false;
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

export const {
  getRoomData,
  makeRoomSuccess,
  updateRoomData,
  deleteRoomData,
  roomFailure,
} = roomSlice.actions;

export default roomSlice.reducer;
