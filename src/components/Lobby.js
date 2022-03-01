import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Lobby() {
  const navigate = useNavigate();
  const rooms = useSelector((state) => state.room.rooms);
  const roomInfoArray = [];

  rooms.forEach((room) => {
    const { _id } = room;
    const { title, participants } = room.roomInfo;
    const roomInfoObj = {
      id: _id,
      title,
      people: participants.length,
    };

    roomInfoArray.push(roomInfoObj);
  });

  const handleEnteredGameRoom = (id) => {
    navigate(`/readyBattleRoom/${id}`);
  };

  return (
    <Container>
      <Div>Game Lobby</Div>
      {roomInfoArray.map((roomElement) => {
        return (
          <CardWrapper
            key={roomElement.id}
            onClick={() => handleEnteredGameRoom(roomElement.id)}
          >
            <div className="room-title">제목: {roomElement.title}</div>
            <div>인원수: {roomElement.people}</div>
            <button>입장 하기</button>
          </CardWrapper>
        );
      })}
    </Container>
  );
}

const Div = styled.div`
  font-size: 5rem;
`;

const CardWrapper = styled.div`
  border: 1px solid black;
  width: 100px;
  height: 70px;
  text-align: center;
`;

const Container = styled.div`
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
