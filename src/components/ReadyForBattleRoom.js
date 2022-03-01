import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { deleteRoomData } from "../features/room/roomSlice";

export default function ReadyForBattleRoom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const rooms = useSelector((state) => state.room.rooms);
  const user = useSelector((state) => state.userInfo.user);

  const [player1isReady, setPlayer1IsReady] = useState(false);
  const [player2isReady, setPlayer2IsReady] = useState(false);
  const profileImage = user.imageUrl;
  const { roomid } = params;
  const roomInfoArray = [];

  rooms.forEach((room) => {
    const { _id } = room;
    const { title } = room.roomInfo;
    const roomInfoObj = {
      id: _id,
      title,
    };

    roomInfoArray.push(roomInfoObj);
  });

  const handleDeleteRoomButton = () => {
    let targetRoom = null;

    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i]._id === roomid) {
        targetRoom = rooms[i];
      }
    }

    dispatch(deleteRoomData({ targetRoom }));
    navigate("/main");
  };

  const handleGetOutRoomButton = () => {
    navigate("/main");
  };

  const handlePlayer1ReadyButton = () => {
    setPlayer1IsReady((current) => !current);
  };

  const handlePlayer2ReadyButton = () => {
    setPlayer2IsReady((current) => !current);
  };

  const handleGameStartButton = () => {
    navigate("/game");
  };

  return (
    <>
      {roomInfoArray.map((roomElement) => {
        if (roomid === roomElement.id) {
          return <div key={roomElement.id}>제목: {roomElement.title}</div>;
        }
      })}

      <div>
        {player1isReady && player2isReady && (
          <button onClick={handleGameStartButton}>게임 시작</button>
        )}
      </div>

      <Div>나: {user.displayName}</Div>
      <ImageDiv
        className="profile-image"
        style={{ background: `url(${profileImage})` }}
      >
        <span className="ready-text">
          {player1isReady ? <>Ready</> : <></>}
        </span>
      </ImageDiv>
      <button onClick={handlePlayer1ReadyButton}>Ready</button>
      <hr />
      <Div>상대방: {user.displayName}</Div>
      <ImageDiv
        className="profile-image"
        style={{ background: `url(${profileImage})` }}
      >
        <span className="ready-text">
          {player2isReady ? <>Ready</> : <></>}
        </span>
      </ImageDiv>
      <button onClick={handlePlayer2ReadyButton}>Ready</button>
      <div>
        <button onClick={handleGetOutRoomButton}>나가기</button>
        <button className="delete-button" onClick={handleDeleteRoomButton}>
          방 삭제
        </button>
      </div>
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
