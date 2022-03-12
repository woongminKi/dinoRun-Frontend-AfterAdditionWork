import axios from "axios";
import { put, all, fork, takeLatest } from "redux-saga/effects";
import {
  requestRoomData,
  makeRoomSuccess,
  roomFailure,
} from "../slice/roomSlice";
import { getCookie, setCookie } from "../../util/cookies";

function* requestRoom({ payload }) {
  const { title, user } = payload;

  try {
    if (title) {
      yield axios.post(`${process.env.REACT_APP_SERVER_URL}/rooms`, {
        title,
        user,
        headers: {
          accessAuthorization: `${getCookie("accessToken")}`,
          refreshAuthorization: `${getCookie("refreshToken")}`,
        },
      });
    }

    const getRoomInfo = yield axios.get(
      `${process.env.REACT_APP_SERVER_URL}/rooms`,
      {
        headers: {
          accessAuthorization: `${getCookie("accessToken")}`,
          refreshAuthorization: `${getCookie("refreshToken")}`,
        },
      }
    );

    if (getRoomInfo.data.newAccessToken) {
      setCookie("accessToken", getRoomInfo.data.newAccessToken, {
        path: "/",
        secure: true,
        sameSite: "none",
        maxAge: 7200,
      });
    }

    yield put(makeRoomSuccess(getRoomInfo));
  } catch (err) {
    yield put(roomFailure(err));
  }
}

function* watchRegisterRoom() {
  yield takeLatest(requestRoomData, requestRoom);
}

export function* roomSaga() {
  yield all([fork(watchRegisterRoom)]);
}
