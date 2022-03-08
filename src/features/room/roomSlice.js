import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [],
    isMakeRoomSuccess: false,
    isUpdateRoomSuccess: false,
    isRegistParticipants: false,
    playerIsEntered: false,
    playersEmail: [],
    waitParticipants: [],
    recentlyMadeRoomId: "",
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
      state.recentlyMadeRoomId = action.payload.data.slice(-1)[0]._id;
    },
    requestUpdateRoomData: (state) => {
      state.isUpdateRoomSuccess = true;
    },
    updateRoomData: (state, action) => {
      state.rooms = action.payload.data;
    },
    remainRoomData: (state, action) => {
      state.rooms = action.payload.remainRooms;
    },
    waitJoinRoom: (state, action) => {
      state.waitParticipants = state.waitParticipants.concat(action.payload);
    },
    enterRoom: (state, action) => {
      state.playersEmail = state.playersEmail.concat(action.payload);
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
  waitJoinRoom,
  enterRoom,
  deleteRoomData,
  roomFailure,
} = roomSlice.actions;

export default roomSlice.reducer;
