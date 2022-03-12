import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [],
    isMakeRoomSuccess: false,
    isUpdateRoomSuccess: false,
    isRegistParticipants: false,
    playerIsEntered: false,
    player1IsEntered: false,
    player2IsEntered: false,
    waitParticipants: [],
    recentlyMadeRoomId: "",
    isDeletedRoom: false,
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
      if (action.payload._id !== "" && state.waitParticipants.length <= 2) {
        state.waitParticipants = state.waitParticipants.concat(action.payload);
      }
    },
    enterRoom: (state) => {
      state.playerIsEntered = true;
    },
    player1EnterRoom: (state) => {
      state.player1IsEntered = true;
      state.playerIsEntered = true;
    },
    player2EnterRoom: (state) => {
      state.player2IsEntered = true;
      state.playerIsEntered = true;
    },
    deleteRoomData: (state) => {
      state.playerIsEntered = false;
      state.isMakeRoomSuccess = false;
      state.isDeletedRoom = true;
    },
    closedAlarmModal: (state) => {
      state.isDeletedRoom = false;
    },
    getOutRoomData: (state) => {
      state.playerIsEntered = false;
    },
    cleanUpRoomData: (state) => {
      state.rooms = [];
      state.isMakeRoomSuccess = false;
      state.isUpdateRoomSuccess = false;
      state.isRegistParticipants = false;
      state.playerIsEntered = false;
      state.player1IsEntered = false;
      state.player2IsEntered = false;
      state.waitParticipants = [];
      state.recentlyMadeRoomId = "";
      state.error = null;
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
  player1EnterRoom,
  player2EnterRoom,
  deleteRoomData,
  closedAlarmModal,
  getOutRoomData,
  cleanUpRoomData,
  roomFailure,
} = roomSlice.actions;

export default roomSlice.reducer;
