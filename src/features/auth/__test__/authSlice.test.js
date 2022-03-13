import persistedReducer, {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
} from "../authSlice";

describe("authSlice", () => {
  const initialState = persistedReducer(undefined, {});
  let state = initialState;

  beforeEach(() => {
    state = initialState;
  });

  it("should has initial state", () => {
    expect(state).toEqual(initialState);
  });

  it("check login request", () => {
    state = persistedReducer(initialState, loginRequest(false));
    expect(state.isLoggedIn).toEqual(false);
  });

  it("check login success", () => {
    state = persistedReducer(initialState, loginSuccess(false));
    expect(state.isLoggedIn).toEqual(true);
  });

  it("check login fail", () => {
    state = persistedReducer(initialState, loginFailure(true));
    expect(state.isLoggedIn).toEqual(false);
  });

  it("check logout request", () => {
    state = persistedReducer(initialState, logoutRequest(true));
    expect(state.isLoggedIn).toEqual(false);
  });
});
