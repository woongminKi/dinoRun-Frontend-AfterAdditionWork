import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { enterRoom } from "../features/room/roomSlice";

export default function Lobby() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rooms = useSelector((state) => state.room.rooms);
  const user = useSelector((state) => state.userInfo.user);
  const [isClickEnterRoom, setIsClickEnterRoom] = useState(false);
  const roomInfoArray = [];

  console.log("현재 있는 방 리스트:::", rooms);
  if (rooms) {
    rooms.forEach((room) => {
      const { _id } = room;
      const { title, participants } = room.roomInfo;
      const roomInfoObj = {
        id: _id,
        title,
        people: participants.length,
      };

      if (roomInfoObj.title) {
        roomInfoArray.push(roomInfoObj);
      }
    });
  }

  const handleEnteredGameRoom = (id, user) => {
    setIsClickEnterRoom(true);
    dispatch(enterRoom(user));
    navigate(`/readyBattleRoom/${id}`);
  };

  const handleMakeRoom = () => {
    navigate("/main");
  };

  return (
    <Container>
      <Div>Game Lobby</Div>
      <button onClick={handleMakeRoom}>방 만들기</button>

      {roomInfoArray.map((roomElement) => {
        return (
          <CardWrapper
            key={roomElement.id}
            onClick={() => handleEnteredGameRoom(roomElement.id, user)}
          >
            <div className="room-title">제목: {roomElement.title}</div>
            <div>인원수: {roomElement.people % 2}</div>
            <button>입장 하기</button>
          </CardWrapper>
        );
      })}
    </Container>
  );
}

const Div = styled.div`
  font-size: 50px;
`;

const CardWrapper = styled.div`
  border: 1px solid black;
  width: 100px;
  height: 70px;
  text-align: center;
`;

const Container = styled.div`
  background: url(https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile8.uf.tistory.com%2Fimage%2F993F4C3359C52BF5379685);
  background-repeat: repeat-y;
  background-size: 100% 300px;
  background-position: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .room-title {
    font-size: 20px;
    font-weight: 350;
  }
`;
