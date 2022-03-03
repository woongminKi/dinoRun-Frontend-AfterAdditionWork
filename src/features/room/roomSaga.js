import axios from "axios";
import { put, all, fork, takeLatest } from "redux-saga/effects";
import {
  requestRoomData,
  makeRoomSuccess,
  updateRoomData,
  requestUpdateRoomData,
  remainRoomData,
  deleteRoomData,
  roomFailure,
} from "./roomSlice";
import { getCookie, setCookie } from "../../util/cookies";

function* requestRoom({ payload }) {
  const { title, user } = payload;

  try {
    if (title) {
      yield axios.post(`http://localhost:8000/rooms/${user._id}`, {
        title,
        user,
        headers: {
          accessAuthorization: `${getCookie("accessToken")}`,
          refreshAuthorization: `${getCookie("refreshToken")}`,
        },
      });
    }

    const getRoomInfo = yield axios.get(
      `http://localhost:8000/rooms/${user._id}`,
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

function* updateRoom({ payload }) {
  const { _id } = payload;

  try {
    const getRoomInfo = yield axios.get(`http://localhost:8000/rooms/${_id}`, {
      headers: {
        accessAuthorization: `${getCookie("accessToken")}`,
        refreshAuthorization: `${getCookie("refreshToken")}`,
      },
    });

    yield put(updateRoomData(getRoomInfo));
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

    yield put(remainRoomData({ remainRooms: deleteRoomInfo.data.remainRooms }));
    yield put(deleteRoomData({ message: deleteRoomInfo.data.result }));
  } catch (err) {
    yield put(roomFailure(err));
  }
}

function* watchRegisterRoom() {
  yield takeLatest(requestRoomData, requestRoom);
}

function* watchUpdateRoom() {
  yield takeLatest(requestUpdateRoomData, updateRoom);
}

function* watchDeleteRoom() {
  yield takeLatest(deleteRoomData, deleteRoom);
}

export function* roomSaga() {
  yield all([
    fork(watchRegisterRoom),
    fork(watchUpdateRoom),
    fork(watchDeleteRoom),
  ]);
}
