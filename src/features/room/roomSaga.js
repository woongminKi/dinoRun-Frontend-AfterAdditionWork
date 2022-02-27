import axios from "axios";

import { put, all, fork, takeLatest } from "redux-saga/effects";
import { getRoomData } from "./roomSlice";

function* registerRoom({ payload }) {}

function* watchRoomRegister() {
  yield takeLatest(getRoomData, registerRoom);
}

export function* roomSaga() {
  yield all([fork(watchRoomRegister)]);
}
