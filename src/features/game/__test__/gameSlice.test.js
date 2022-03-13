import persistedReducer, {
  requestRoomData,
  gameStart,
  gameFinished,
  gameFailure,
  getFaceEmotion,
  getMyScore,
  player2Score,
  cleanUpGame,
} from "../gameSlice";

describe("gameSlice", () => {
  const initialState = persistedReducer(undefined, {});
  let state = initialState;

  beforeEach(() => {
    state = initialState;
  });

  it("should has initial state", () => {
    expect(state).toEqual(initialState);
  });

  it("request room data", () => {
    state = persistedReducer(state, requestRoomData(true));

    expect(state.isJoined).toEqual(true);
  });

  it("request room data", () => {
    state = persistedReducer(state, requestRoomData(true));

    expect(state.isJoined).toEqual(true);
  });

  it("check game start", () => {
    state = persistedReducer(state, gameStart(true));

    expect(state.isGameStart).toEqual(true);
  });

  it("check game finish", () => {
    state = persistedReducer(state, gameFinished(true));

    expect(state.isDead).toEqual(true);
  });

  it("check game fail", () => {
    state = persistedReducer(state, gameFailure(true));

    expect(state.isGameStart).toEqual(false);
  });

  it("check face emotion score", () => {
    state = persistedReducer(
      state,
      getFaceEmotion([
        {
          expressions: {
            happy: 0.99,
          },
        },
      ])
    );

    expect(state.faceEmotionHappyScore).toEqual(0.99);
  });

  it("check my score", () => {
    state = persistedReducer(state, getMyScore(489));

    expect(state.myScore).toEqual(489);
  });

  it("check player2 score", () => {
    state = persistedReducer(state, player2Score(300));

    expect(state.player2YourScore).toEqual(300);
  });

  it("check game clean up", () => {
    state = persistedReducer(state, cleanUpGame());

    expect(state.isJoined).toEqual(false);
    expect(state.isGameStart).toEqual(false);
    expect(state.joinedRoomUser).toEqual({});
    expect(state.faceEmotionHappyScore).toEqual(0);
    expect(state.myScore).toEqual(0);
    expect(state.player2YourScore).toEqual(0);
    expect(state.isDead).toEqual(false);
    expect(state.error).toEqual(null);
  });
});
