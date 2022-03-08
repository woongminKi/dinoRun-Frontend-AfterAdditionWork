import io from "socket.io-client";
import { eventChannel } from "redux-saga";
import { call, put, take } from "redux-saga/effects";

import { requestRoomData, gameStart } from "../features/game/gameSlice";
import { waitJoinRoom } from "../features/room/roomSlice";
import { player2Score } from "../features/game/gameSlice";

export const socket = io.connect("http://localhost:8000", {
  path: "/socket.io",
  transports: ["websocket"],
});

export const socketAction = {
  waitJoinRoom: (user) => {
    socket.emit("waitJoinRoom", user);
  },
  joinRoom: (roomid, user) => {
    socket.emit("joinRoom", roomid, user);
  },
  gameStart: (id) => {
    socket.emit("gameStart", id);
  },
  gameScore: (score) => {
    socket.emit("gameScore", score);
  },
};

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.on("waitJoinRoom", (userData) => {
      emit(waitJoinRoom(userData));
    });
    socket.on("joinRoom", (data) => {
      emit(requestRoomData(data));
    });
    socket.on("gameStart", (id) => {
      emit(gameStart(id));
    });
    socket.on("gameScore", (score) => {
      emit(player2Score(score));
    });

    return () => {
      socket.off("waitJoinRoom");
      socket.off("joinRoom");
      socket.off("gameStart");
      socket.off("gameScore");
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
