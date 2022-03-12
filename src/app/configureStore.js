import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleWare from "redux-saga";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import { all } from "redux-saga/effects";
import { authSaga } from "../features/saga/authSaga";
import { roomSaga } from "../features/saga/roomSaga";
import { prePlayGameSocketSaga } from "../modules/useSocket";

import auth from "../features/slice/authSlice";
import room from "../features/slice/roomSlice";
import userInfo from "../features/slice/userInfoSlice";
import game from "../features/slice/gameSlice";

const sagaMiddleware = createSagaMiddleWare();

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  auth,
  room,
  userInfo,
  game,
});

const persistedReducer = persistReducer(persistConfig, reducer);

function* rootSaga() {
  yield all([authSaga(), roomSaga(), prePlayGameSocketSaga()]);
}

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
