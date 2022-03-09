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
    isDead: false,
    error: null,
  },
  reducers: {
    requestRoomData: (state, action) => {
      state.isJoined = true;
      state.joinedRoomUser = action.payload;
    },
    requestJoinRoomData: (state) => {
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
    gameFinished: (state) => {
      state.isDead = true;
    },
    gameFailure: (state, action) => {
      const { message, status } = action.payload;

      state.error = {
        message,
        status,
      };

      state.isLoggedIn = false;
    },
    getMyScore: (state, action) => {
      state.myScore = action.payload;
    },
    player2Score: (state, action) => {
      state.player2YourScore = action.payload;
    },
    cleanUpGame: (state) => {
      state.isJoined = false;
      state.isReady = false;
      state.isGameStart = false;
      state.joinedRoomUser = {};
      state.roomParticipants = [];
      state.currentParticipants = [];
      state.isDead = false;
      state.error = null;
    },
  },
});

export const {
  requestRoomData,
  requestJoinRoomData,
  getGameRoomParticipants,
  gameStart,
  gameFailure,
  getMyScore,
  player2Score,
  gameFinished,
  cleanUpGame,
} = gameSlice.actions;

export default gameSlice.reducer;
