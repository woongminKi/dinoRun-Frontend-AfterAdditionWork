import io from "socket.io-client";
import { eventChannel } from "redux-saga";
import { requestRoomData, gameStart } from "../features/game/gameSlice";
import { call, put, take } from "redux-saga/effects";

export const socket = io.connect("http://localhost:8000", {
  path: "/socket.io",
  transports: ["websocket"],
});

export const socketAction = {
  joinRoom: (roomid, user) => {
    socket.emit("joinRoom", roomid, user);
  },
  gameStart: (id) => {
    socket.emit("gameStart", id);
  },
};

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.on("joinRoom", (data) => {
      emit(requestRoomData(data));
    });
    socket.on("gameStart", (id) => {
      emit(gameStart(id));
    });

    return () => {
      socket.off("joinRoom");
      socket.off("gameStart");
    };
  });
}

export function* prePlayGameSocketSaga() {
  const prePlayGame = yield call(createSocketChannel, socket);
  while (true) {
    const action = yield take(prePlayGame);
    yield put(action);
  }
}
