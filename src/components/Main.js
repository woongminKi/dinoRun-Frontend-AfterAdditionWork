import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import MakeRoomModal from "./modal/MakeRoomModal";
import { socketAction } from "../modules/useSocket";
import { requestRoomData, closedAlarmModal } from "../features/room/roomSlice";
import { cleanUpGame } from "../features/game/gameSlice";

export default function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.userInfo.user);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isMadeRoom, setIsMadeRoom] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    dispatch(cleanUpGame());
    dispatch(closedAlarmModal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  useEffect(() => {
    socketAction.waitJoinRoom(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const handleOpenMakeRoomModal = () => {
    setIsOpenModal(true);
    setIsMadeRoom(true);
  };

  const handleMakeRoomButton = () => {
    setIsMadeRoom(false);
    dispatch(requestRoomData({ title, user }));
    navigate("/lobby");
  };

  const handleCancelMakeRoomButton = () => {
    setIsMadeRoom(false);
  };

  const handleGoToLobby = () => {
    dispatch(requestRoomData({ title, user }));
    navigate("/lobby");
  };

  return (
    <>
      <Container>
        {!isOpenModal && (
          <button
            className="make-room-button"
            onClick={handleOpenMakeRoomModal}
          >
            방 만들기
          </button>
        )}

        <button className="go-to-lobby" onClick={handleGoToLobby}>
          로비로 가기
        </button>

        {isMadeRoom && (
          <MakeRoomModal
            onMake={handleMakeRoomButton}
            onClose={handleCancelMakeRoomButton}
          >
            {
              <form>
                제목:
                <input
                  type="text"
                  name="roomTitle"
                  placeholder="방 제목을 입력해주세요."
                  onChange={(e) => setTitle(e.target.value)}
                />
              </form>
            }
          </MakeRoomModal>
        )}
      </Container>
    </>
  );
}

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
  font-family: "League Gothic";

  .make-room-button {
    cursor: pointer;
    margin-top: 30px;
    padding: 15px 130px 15px 130px;
    border-radius: 10px;
    border: none;
    transition: 0.3s;
    font-size: 20px;
    font-weight: 100;
  }

  .go-to-lobby {
    cursor: pointer;
    margin-top: 30px;
    padding: 15px 130px 15px 130px;
    border-radius: 10px;
    border: none;
    transition: 0.3s;
    font-size: 20px;
    font-weight: 100;
  }
`;
