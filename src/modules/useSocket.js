import io from "socket.io-client";
import { eventChannel } from "redux-saga";
import { call, put, take } from "redux-saga/effects";

import {
  requestRoomData,
  gameStart,
  player2Score,
} from "../features/game/gameSlice";
import {
  waitJoinRoom,
  updateRoomData,
  player1EnterRoom,
  player2EnterRoom,
  player1OutRoom,
  player2OutRoom,
  deleteRoomData,
} from "../features/room/roomSlice";

export const socket = io.connect(process.env.REACT_APP_SERVER_URL, {
  path: "/socket.io",
  transports: ["websocket"],
  cors: {
    origin: process.env.REACT_APP_SERVER_URL,
  },
});

export const socketAction = {
  waitJoinRoom: (user) => {
    socket.emit("waitJoinRoom", user);
  },
  joinRoom: (roomId, user) => {
    socket.emit("joinRoom", roomId, user);
  },
  makeRoom: (roomData) => {
    socket.emit("makeRoom", roomData);
  },
  checkAnotherPlayerEntered: (user) => {
    socket.emit("checkAnotherPlayerEntered", user);
  },
  gameStart: (id) => {
    socket.emit("gameStart", id);
  },
  gameScore: (score, roomId) => {
    socket.emit("gameScore", score, roomId);
  },
  leaveRoom: (roomId, user) => {
    socket.emit("leaveRoom", roomId, user);
  },
  deleteRoom: (roomId) => {
    socket.emit("deleteRoom", roomId);
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
    socket.on("makeRoom", (rooms) => {
      emit(updateRoomData(rooms));
    });
    socket.on("checkAnotherPlayerEntered", (anotherUser, userDbData) => {
      if (anotherUser.email === userDbData[0].email) {
        emit(player1EnterRoom(anotherUser));
      }

      if (anotherUser.email === userDbData[1].email) {
        emit(player2EnterRoom(anotherUser));
      }
    });
    socket.on("gameStart", (id) => {
      emit(gameStart(id));
    });
    socket.on("gameScore", (score) => {
      emit(player2Score(score));
    });
    socket.on("leaveRoom", (user, userDbData) => {
      if (user.email === userDbData[0].email) {
        emit(player1OutRoom());
      }
      if (user.email === userDbData[1].email) {
        emit(player2OutRoom());
      }
    });
    socket.on("deleteRoom", () => {
      emit(deleteRoomData());
    });

    return () => {
      socket.off("waitJoinRoom");
      socket.off("joinRoom");
      socket.off("makeRoom");
      socket.off("checkAnotherPlayerEntered");
      socket.off("gameStart");
      socket.off("gameScore");
      socket.off("leaveRoom");
      socket.off("deleteRoom");
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
