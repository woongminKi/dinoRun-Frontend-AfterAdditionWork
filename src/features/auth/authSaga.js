import axios from "axios";
import { put, all, fork, takeLatest } from "redux-saga/effects";

import { loginRequest, loginSuccess, loginFailure } from "./authSlice";
import { getUserData } from "../userInfo/userInfoSlice";

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

    const user = {
      ...getUserResponse.data.user,
      accessToken: getUserResponse.data.accessToken,
      refreshToken: getUserResponse.data.refreshToken,
    };

    yield put(getUserData(user));
    yield put(loginSuccess({ message: res.data.result }));
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
