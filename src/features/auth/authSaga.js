import axios from "axios";
import { put, all, fork, takeLatest } from "redux-saga/effects";

import { loginRequest, loginSuccess, loginFailure } from "./authSlice";
import { getUserData } from "../userInfo/userInfoSlice";
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
    console.log("getUserResponse::", getUserResponse);
    setCookie("accessToken", getUserResponse.data.accessToken, {
      path: "/",
      secure: true,
      sameSite: "none",
      maxAge: 3600,
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

function* watchUserLogin() {
  yield takeLatest(loginRequest, loginUser);
}

export function* authSaga() {
  yield all([fork(watchUserLogin)]);
}
