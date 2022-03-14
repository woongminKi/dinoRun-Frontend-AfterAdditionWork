import persistedReducer, {
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
} from "../roomSlice";

describe("roomSlice", () => {
  const initialState = persistedReducer(undefined, {});
  let state = initialState;

  beforeEach(() => {
    state = initialState;
  });

  it("should has initial state", () => {
    expect(state).toEqual(initialState);
  });

  it("check request rooms data", () => {
    state = persistedReducer(
      state,
      requestRoomData({
        data: [
          {
            email: "dndals1991@gmail.com",
            displayName: "기웅민",
            imageUrl: "abcd",
          },
          {
            email: "dinorun@gmail.com",
            displayName: "김디노",
            imageUrl: "a42db",
          },
        ],
      })
    );

    expect(state.rooms).toEqual([
      {
        email: "dndals1991@gmail.com",
        displayName: "기웅민",
        imageUrl: "abcd",
      },
      {
        email: "dinorun@gmail.com",
        displayName: "김디노",
        imageUrl: "a42db",
      },
    ]);
  });

  it("check request make room success data", () => {
    state = persistedReducer(state, requestRoomData(false));

    expect(state.isMakeRoomSuccess).toEqual(false);
  });

  it("check make room success", () => {
    state = persistedReducer(
      state,
      makeRoomSuccess({
        data: [
          {
            email: "dndals1991@gmail.com",
            displayName: "기웅민",
            imageUrl: "abcd",
          },
          {
            email: "dinorun@gmail.com",
            displayName: "김디노",
            imageUrl: "a42db",
          },
        ],
      })
    );

    expect(state.rooms).toEqual([
      {
        email: "dndals1991@gmail.com",
        displayName: "기웅민",
        imageUrl: "abcd",
      },
      {
        email: "dinorun@gmail.com",
        displayName: "김디노",
        imageUrl: "a42db",
      },
    ]);
  });

  it("check make room success status", () => {
    state = persistedReducer(state, makeRoomSuccess(true));

    expect(state.isMakeRoomSuccess).toEqual(true);
  });

  it("check update room data", () => {
    state = persistedReducer(
      state,
      updateRoomData({
        data: [
          {
            email: "icandoit@gmail.com",
            displayName: "할수있다",
            imageUrl: "letsdoit",
          },
        ],
      })
    );

    expect(state.rooms).toEqual([
      {
        email: "icandoit@gmail.com",
        displayName: "할수있다",
        imageUrl: "letsdoit",
      },
    ]);
  });

  it("check remain room data", () => {
    state = persistedReducer(
      state,
      remainRoomData({
        remainRooms: [
          {
            email: "dndals1991@gmail.com",
            displayName: "기웅민",
            imageUrl: "abcd",
          },
          {
            email: "dinorun@gmail.com",
            displayName: "김디노",
            imageUrl: "a42db",
          },
        ],
      })
    );

    expect(state.rooms).toEqual([
      {
        email: "dndals1991@gmail.com",
        displayName: "기웅민",
        imageUrl: "abcd",
      },
      {
        email: "dinorun@gmail.com",
        displayName: "김디노",
        imageUrl: "a42db",
      },
    ]);
  });

  it("check wait people in waitted room", () => {
    state = persistedReducer(
      state,
      waitJoinRoom([
        {
          email: "dndals1991@gmail.com",
          displayName: "기웅민",
          imageUrl: "abcd",
        },
      ])
    );

    expect(state.waitParticipants).toEqual([
      {
        email: "dndals1991@gmail.com",
        displayName: "기웅민",
        imageUrl: "abcd",
      },
    ]);
  });

  it("check player1 is entered", () => {
    state = persistedReducer(state, player1EnterRoom(true));

    expect(state.player1IsEntered).toEqual(true);
    expect(state.playerIsEntered).toEqual(true);
  });

  it("check player2 is entered", () => {
    state = persistedReducer(state, player2EnterRoom(true));

    expect(state.player2IsEntered).toEqual(true);
    expect(state.playerIsEntered).toEqual(true);
  });

  it("check player1 is outed", () => {
    state = persistedReducer(state, player1OutRoom(true));

    expect(state.player1IsEntered).toEqual(false);
    expect(state.playerIsEntered).toEqual(false);
  });

  it("check player2 is outed", () => {
    state = persistedReducer(state, player2OutRoom(true));

    expect(state.player2IsEntered).toEqual(false);
    expect(state.playerIsEntered).toEqual(false);
  });

  it("check delete room data", () => {
    state = persistedReducer(state, deleteRoomData());

    expect(state.playerIsEntered).toEqual(false);
    expect(state.isMakeRoomSuccess).toEqual(false);
    expect(state.isDeletedRoom).toEqual(true);
  });

  it("check closed alarm modal", () => {
    state = persistedReducer(state, closedAlarmModal());

    expect(state.isDeletedRoom).toEqual(false);
  });

  it("check make room fail", () => {
    state = persistedReducer(state, roomFailure(true));

    expect(state.isMakeRoomSuccess).toEqual(false);
  });
});
