import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { socketAction } from "../modules/useSocket";
import { closedAlarmModal } from "../features/room/roomSlice";

export default function Lobby() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { rooms } = useSelector((state) => state.room);
  const user = useSelector((state) => state.userInfo.user);

  const roomInfoArray = [];

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }

    if (rooms) {
      socketAction.makeRoom(rooms);
    }

    dispatch(closedAlarmModal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleSocketEnteredGameRoom = () => {
    socketAction.checkAnotherPlayerEntered(user);
  };

  const handleEnteredGameRoom = (id) => {
    handleSocketEnteredGameRoom();
    navigate(`/readyBattleRoom/${id}`);
  };

  const handleMakeRoom = () => {
    navigate("/main");
  };

  const handleGoToMain = () => {
    navigate("/main");
  };

  return (
    <Container>
      <Div>Game Lobby</Div>
      <ButtonWrapper>
        <button className="action-button" onClick={handleMakeRoom}>
          방 만들기
        </button>
        <button className="action-button" onClick={handleGoToMain}>
          뒤로 가기
        </button>
      </ButtonWrapper>

      {roomInfoArray.map((roomElement) => {
        return (
          <CardWrapper
            key={roomElement.id}
            onClick={() => handleEnteredGameRoom(roomElement.id, user)}
          >
            <div className="room-title">제목 : {roomElement.title}</div>
            <button className="action-button">입장 하기</button>
          </CardWrapper>
        );
      })}
    </Container>
  );
}

const Div = styled.div`
  font-size: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;

  .action-button {
    margin-left: 5px;
  }
`;

const CardWrapper = styled.div`
  margin-top: 5px;
  width: 250px;
  height: 70px;
  border: 1px solid black;
  border-radius: 10px;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .room-title {
    font-size: 20px;
    font-weight: 350;
  }

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
