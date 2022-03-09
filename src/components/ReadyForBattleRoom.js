import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import AlarmModal from "./modal/AlarmModal";
import { closedAlarmModal } from "../features/room/roomSlice";
import { socketAction } from "../modules/useSocket";
import { cleanUpGame } from "../features/game/gameSlice";

export default function ReadyForBattleRoom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { roomid } = params;

  const { isLoggedIn } = useSelector((state) => state.auth);
  const {
    rooms,
    waitParticipants,
    playerIsEntered,
    player1IsEntered,
    player2IsEntered,
    isDeletedRoom,
  } = useSelector((state) => state.room);
  const user = useSelector((state) => state.userInfo.user);
  const game = useSelector((state) => state.game);
  const [isSecondEntry, setIsSecondEntry] = useState(false);

  const profileImage = user.imageUrl;
  const roomInfoArray = [];
  const anotherPerson = [];

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }

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

  const handleGoToLobby = () => {
    dispatch(closedAlarmModal());
    navigate("/main");
  };

  const handleDeleteRoomButton = () => {
    socketAction.deleteRoom(roomid);
    navigate("/main");
  };

  const handleGetOutRoomButton = () => {
    socketAction.leaveRoom(roomid, user);
    setIsSecondEntry(true);
    navigate("/main");
  };

  const handleGameStartButton = () => {
    socketAction.gameStart(roomid);
    dispatch(cleanUpGame());
  };

  return (
    <RoomContentsWrapper>
      {roomInfoArray.map((roomElement) => {
        if (roomid === roomElement.id) {
          return <div>방 제목: {roomElement.title}</div>;
        }
      })}

      {roomInfoArray.map((roomElement) => {
        if (roomElement.author.id === user._id && roomid === roomElement.id) {
          return (
            <>
              <button
                className="action-button"
                onClick={handleDeleteRoomButton}
              >
                방 삭제
              </button>
              <button className="action-button" onClick={handleGameStartButton}>
                게임 시작
              </button>
            </>
          );
        }
      })}

      <Div>나: {user.displayName}</Div>
      <ImageDiv
        className="profile-image"
        style={{ background: `url(${profileImage})` }}
      />

      <button className="action-button" onClick={handleGetOutRoomButton}>
        나가기
      </button>
      <hr />

      {(!player1IsEntered || !player2IsEntered) &&
      playerIsEntered &&
      !isSecondEntry ? (
        <>
          <div>상대방:{waitParticipants[0].displayName}</div>
          <div>
            {
              <ImageDiv
                className="profile-image"
                style={{ background: `url(${waitParticipants[0].imageUrl})` }}
              />
            }
          </div>
        </>
      ) : (
        <div>상대 기다리는 중...</div>
      )}

      {isSecondEntry && (
        <>
          <div>상대방:{waitParticipants[0].displayName}</div>
          <div>
            {
              <ImageDiv
                className="profile-image"
                style={{ background: `url(${waitParticipants[0].imageUrl})` }}
              />
            }
          </div>
        </>
      )}

      {isDeletedRoom && (
        <AlarmModal onMove={handleGoToLobby} onMessage="방이 삭제 됐습니다." />
      )}
    </RoomContentsWrapper>
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

const RoomContentsWrapper = styled.div`
  background-color: #f5f5f5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Teko";

  .action-button {
    cursor: pointer;
    margin-top: 5px;
    padding: 5px 10px 5px 10px;
    border-radius: 10px;
    transition: 0.3s;
    font-size: 8px;
    font-weight: 10;
  }

  .action-button:hover {
    padding: 7px 12px 7px 12px;
    transition: all 0.2s linear 0s;
  }
`;
