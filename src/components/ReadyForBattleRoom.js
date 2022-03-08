import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { deleteRoomData } from "../features/room/roomSlice";
import { socketAction } from "../modules/useSocket";
import { deleteGameRoomData } from "../features/game/gameSlice";

export default function ReadyForBattleRoom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { roomid } = params;

  const roomElements = useSelector((state) => state.room);
  const { rooms } = useSelector((state) => state.room);
  const user = useSelector((state) => state.userInfo.user);
  const game = useSelector((state) => state.game);

  const profileImage = user.imageUrl;
  const { waitParticipants } = roomElements;

  const roomInfoArray = [];
  const anotherPerson = [];

  useEffect(() => {
    socketAction.joinRoom(roomid, user);
  }, []);

  if (game.isGameStart) {
    navigate("/game");
  }

  if (rooms) {
    rooms.forEach((room) => {
      const { _id, author } = room;
      const { title, participants } = room.roomInfo;
      const roomInfoObj = {
        id: _id,
        author,
        title,
        participants,
      };

      roomInfoArray.push(roomInfoObj);
    });
  }

  roomInfoArray.forEach((roomElement) => {
    if (roomid === roomElement.id) {
      roomElement.participants.forEach((participant) => {
        if (user.email !== participant.email) {
          anotherPerson.push(participant);
        }
      });
    }
  });

  const handleDeleteRoomButton = () => {
    let targetRoom = null;

    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i]._id === roomid) {
        targetRoom = rooms[i];
      }
    }

    dispatch(deleteGameRoomData());
    dispatch(deleteRoomData({ targetRoom }));
    navigate("/main");
  };

  const handleGetOutRoomButton = () => {
    dispatch(deleteGameRoomData());
    navigate("/main");
  };

  const handleGameStartButton = () => {
    socketAction.gameStart(roomid);
  };

  return (
    <>
      {roomInfoArray.map((roomElement) => {
        if (roomid === roomElement.id) {
          return <div>제목: {roomElement.title}</div>;
        }
      })}

      <Div>나: {user.displayName}</Div>
      <ImageDiv
        className="profile-image"
        style={{ background: `url(${profileImage})` }}
      />
      <div></div>

      <button onClick={handleGetOutRoomButton}>나가기</button>

      {roomInfoArray.map((roomElement) => {
        if (roomElement.author.id === user._id && roomid === roomElement.id) {
          return (
            <>
              <button
                className="delete-button"
                onClick={handleDeleteRoomButton}
              >
                방 삭제
              </button>
              <button onClick={handleGameStartButton}>게임 시작</button>
            </>
          );
        }
      })}
      <hr />

      <div>상대방: {waitParticipants[1].displayName}</div>
      <ImageDiv
        className="profile-image"
        style={{ background: `url(${waitParticipants[1].imageUrl})` }}
      />
    </>
  );
}

const Div = styled.div`
  font-weight: 400;
`;

const ImageDiv = styled.div`
  border: 1px solid black;
  width: 100px;
  height: 100px;

  .ready-text {
    margin-left: 28px;
    text-align: center;
    color: yellow;
  }
`;
