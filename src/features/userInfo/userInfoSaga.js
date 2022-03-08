import { all, fork, takeLatest } from "redux-saga/effects";
import { getUserData } from "../userInfo/userInfoSlice";

function* userInfo({ payload }) {}

function* watchUserInfo() {
  yield takeLatest(getUserData, userInfo);
}

export function* userInfoSaga() {
  yield all([fork(watchUserInfo)]);
}
