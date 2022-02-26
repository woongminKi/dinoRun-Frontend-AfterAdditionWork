import axios from "axios";
import { put, all, fork, takeLatest } from "redux-saga/effects";

import { loginRequest, loginFailure } from "./authSlice";

function* loginUser({ payload }) {
  const { email, displayName, photoURL, token } = payload;

  try {
    const res = yield axios.post("http://localhost:8000/login", {
      email,
      displayName,
      photoURL,
    });

    const getUserResponse = yield axios.get("http://localhost:8000/login", {
      headers: { authorization: token },
    });
    console.log("!!!", getUserResponse);
    console.log("###", res);
  } catch (err) {
    yield put(loginFailure(err));
  }
}

function* watchUserLogin() {
  yield takeLatest(loginRequest, loginUser);
}

export function* authSaga() {
  yield all([fork(watchUserLogin)]);
}
