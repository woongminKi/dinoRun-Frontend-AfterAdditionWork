import persistedReducer, {
  getUserData,
  logoutUserData,
} from "../userInfoSlice";

describe("userInfoSlice", () => {
  const initialState = persistedReducer(undefined, {});
  let state = initialState;

  beforeEach(() => {
    state = initialState;
  });

  it("should has initial state", () => {
    expect(state).toEqual(initialState);
  });

  it("check get user data", () => {
    state = persistedReducer(
      state,
      getUserData({
        email: "dndals1991@gmail.com",
        displayName: "기웅민",
        imageUrl: "abcd",
      })
    );

    expect(state.user).toEqual({
      email: "dndals1991@gmail.com",
      displayName: "기웅민",
      imageUrl: "abcd",
    });
  });

  it("check logout user data", () => {
    state = persistedReducer(state, logoutUserData());

    expect(state.user).toEqual({
      _id: "",
      displayName: "",
      email: "",
      imageUrl: "",
    });
  });
});
