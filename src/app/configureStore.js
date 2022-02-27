import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleWare from "redux-saga";

import { all } from "redux-saga/effects";
import { authSaga } from "../features/auth/authSaga";
import { roomSaga } from "../features/room/roomSaga";
import { userInfoSaga } from "../features/userInfo/userInfoSaga";
import auth from "../features/auth/authSlice";
import room from "../features/room/roomSlice";
import userInfo from "../features/userInfo/userInfoSlice";

const sagaMiddleware = createSagaMiddleWare();

const reducer = combineReducers({
  auth,
  room,
  userInfo,
});

function* rootSaga() {
  yield all([authSaga(), roomSaga(), userInfoSaga()]);
}

const store = configureStore({
  reducer: reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
