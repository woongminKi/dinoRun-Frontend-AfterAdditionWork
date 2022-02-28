import axios from "axios";
import { put, all, fork, takeLatest } from "redux-saga/effects";
import {
  getRoomData,
  makeRoomSuccess,
  deleteRoomData,
  roomFailure,
} from "./roomSlice";
import { getCookie, setCookie } from "../../util/cookies";

function* registerRoom({ payload }) {
  const { title, userObj } = payload;

  try {
    const res = yield axios.post(`http://localhost:8000/rooms/${userObj.id}`, {
      title,
      userObj,
      headers: {
        accessAuthorization: `${getCookie("accessToken")}`,
        refreshAuthorization: `${getCookie("refreshToken")}`,
      },
    });

    const getRoomInfo = yield axios.get(
      `http://localhost:8000/rooms/${userObj.id}`,
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

function* deleteRoom({ payload }) {
  const { targetRoom } = payload;

  try {
    const deleteRoomInfo = yield axios.delete(
      `http://localhost:8000/rooms/${targetRoom._id}`,
      {
        data: {
          targetRoom,
        },
      }
    );

    yield put(deleteRoomData({ message: deleteRoomInfo.data.result }));
  } catch (err) {
    yield put(roomFailure(err));
  }
}

function* watchRegisterRoom() {
  yield takeLatest(getRoomData, registerRoom);
}

function* watchDeleteRoom() {
  yield takeLatest(deleteRoomData, deleteRoom);
}

export function* roomSaga() {
  yield all([fork(watchRegisterRoom), fork(watchDeleteRoom)]);
}
