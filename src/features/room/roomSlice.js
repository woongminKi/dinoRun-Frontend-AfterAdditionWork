import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [],
    isMakeRoomSuccess: false,
    isUpdateRoomSuccess: false,
    participants: [],
    isRegistParticipants: false,
    error: null,
  },
  reducers: {
    requestRoomData: (state, action) => {
      state.rooms = action.payload.data;
      state.isMakeRoomSuccess = false;
    },
    makeRoomSuccess: (state, action) => {
      state.rooms = action.payload.data;
      state.isMakeRoomSuccess = true;
    },
    requestUpdateRoomData: (state, action) => {
      state.isUpdateRoomSuccess = true;
    },
    updateRoomData: (state, action) => {
      state.rooms = action.payload.data;
    },
    remainRoomData: (state, action) => {
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
  requestRoomData,
  makeRoomSuccess,
  updateRoomData,
  requestUpdateRoomData,
  remainRoomData,
  deleteRoomData,
  roomFailure,
} = roomSlice.actions;

export default roomSlice.reducer;
