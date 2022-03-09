import axios from "axios";
import { put, all, fork, takeLatest } from "redux-saga/effects";

import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
} from "./authSlice";
import { getUserData, logoutUserData } from "../userInfo/userInfoSlice";
import { setCookie } from "../../util/cookies";

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

    setCookie("accessToken", getUserResponse.data.accessToken, {
      path: "/",
      secure: true,
      sameSite: "none",
      maxAge: 604800,
    });

    setCookie("refreshToken", getUserResponse.data.refreshToken, {
      path: "/",
      secure: true,
      sameSite: "none",
      maxAge: 604800,
    });

    const user = {
      ...getUserResponse.data.user,
    };

    yield put(getUserData(user));
    yield put(loginSuccess({ message: res.data.result }));
  } catch (err) {
    yield put(loginFailure(err));
  }
}

function* logoutUser() {
  yield put(logoutUserData());
}

function* watchUserLogin() {
  yield takeLatest(loginRequest, loginUser);
}

function* watchUserLogout() {
  yield takeLatest(logoutRequest, logoutUser);
}

export function* authSaga() {
  yield all([fork(watchUserLogin), fork(watchUserLogout)]);
}
