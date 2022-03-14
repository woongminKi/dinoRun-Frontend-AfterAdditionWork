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
    player1EnterRoom: (state) => {
      state.player1IsEntered = true;
      state.playerIsEntered = true;
    },
    player2EnterRoom: (state) => {
      state.player2IsEntered = true;
      state.playerIsEntered = true;
    },
    player1OutRoom: (state) => {
      state.player1IsEntered = false;
      state.playerIsEntered = false;
    },
    player2OutRoom: (state) => {
      state.player2IsEntered = false;
      state.playerIsEntered = false;
    },
    deleteRoomData: (state) => {
      state.playerIsEntered = false;
      state.isMakeRoomSuccess = false;
      state.isDeletedRoom = true;
    },
    closedAlarmModal: (state) => {
      state.isDeletedRoom = false;
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
  remainRoomData,
  waitJoinRoom,
  player1EnterRoom,
  player2EnterRoom,
  player1OutRoom,
  player2OutRoom,
  deleteRoomData,
  closedAlarmModal,
  roomFailure,
} = roomSlice.actions;

export default roomSlice.reducer;
