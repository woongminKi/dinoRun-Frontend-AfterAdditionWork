import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleWare from "redux-saga";

import { all } from "redux-saga/effects";
import { authSaga } from "../features/auth/authSaga";
import auth from "../features/auth/authSlice";

const sagaMiddleware = createSagaMiddleWare();

const reducer = combineReducers({
  auth,
});

function* rootSaga() {
  yield all([authSaga()]);
}

const store = configureStore({
  reducer: reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
