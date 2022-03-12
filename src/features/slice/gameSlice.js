import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    isJoined: false,
    isGameStart: false,
    joinedRoomUser: {},
    faceEmotionHappyScore: 0,
    isDead: false,
    error: null,
  },
  reducers: {
    requestRoomData: (state, action) => {
      state.isJoined = true;
      state.joinedRoomUser = action.payload;
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
    getFaceEmotion: (state, action) => {
      if (action.payload) {
        state.faceEmotionHappyScore = action.payload[0].expressions.happy;
      }
    },
    getMyScore: (state, action) => {
      state.myScore = action.payload;
    },
    player2Score: (state, action) => {
      state.player2YourScore = action.payload;
    },
    cleanUpGame: (state) => {
      state.isGameStart = false;
      state.isDead = false;
      state.error = null;
    },
  },
});

export const {
  requestRoomData,
  gameStart,
  gameFailure,
  getFaceEmotion,
  getMyScore,
  player2Score,
  gameFinished,
  cleanUpGame,
} = gameSlice.actions;

export default gameSlice.reducer;
