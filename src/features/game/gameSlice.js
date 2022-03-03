import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    isJoined: false,
    isReady: false,
    isGameStart: false,
    joinedRoomUser: {},
    roomParticipants: [],
    currentParticipants: [],
    error: null,
  },
  reducers: {
    requestRoomData: (state, action) => {
      state.isJoined = true;
      state.joinedRoomUser = action.payload;
    },
    requestJoinRoomData: (state, action) => {
      state.isJoined = true;
      state.roomParticipants = [];
    },
    getGameRoomParticipants: (state, action) => {
      state.roomParticipants = state.roomParticipants.concat(
        action.payload.data.currentPeople
      );
    },
    gameStart: (state) => {
      state.isGameStart = true;
    },
    deleteGameRoomData: (state) => {
      state.isJoined = false;
      state.isGameStart = false;
      state.joinedRoomUser = {};
      state.roomParticipants = [];
      state.currentParticipants = [];
    },
    gameFailure: (state, action) => {
      const { message, status } = action.payload;

      state.error = {
        message,
        status,
      };

      state.isLoggedIn = false;
    },
  },
});

export const {
  requestRoomData,
  requestJoinRoomData,
  getGameRoomParticipants,
  gameStart,
  deleteGameRoomData,
  gameFailure,
} = gameSlice.actions;

export default gameSlice.reducer;
