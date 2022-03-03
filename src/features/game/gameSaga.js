import axios from "axios";
import { put, all, fork, takeLatest } from "redux-saga/effects";
import {
  requestJoinRoomData,
  getGameRoomParticipants,
  gameFailure,
} from "./gameSlice";
import { getCookie } from "../../util/cookies";

function* getJoinedRoomPeople({ payload }) {
  const { user, roomid } = payload;

  try {
    const getJoinedRoomData = yield axios.get(
      `http://localhost:8000/rooms/${user._id}/game`,
      {
        headers: {
          roomid,
          user,
          accessAuthorization: `${getCookie("accessToken")}`,
          refreshAuthorization: `${getCookie("refreshToken")}`,
        },
      }
    );

    yield put(getGameRoomParticipants(getJoinedRoomData));
  } catch (err) {
    yield put(gameFailure(err));
  }
}

function* watchGetJoinedRoom() {
  yield takeLatest(requestJoinRoomData, getJoinedRoomPeople);
}

export function* gameSaga() {
  yield all([fork(watchGetJoinedRoom)]);
}
