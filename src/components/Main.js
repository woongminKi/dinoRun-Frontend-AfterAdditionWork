import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import MakeRoomModal from "./MakeRoomModal";
import { getRoomData } from "../features/room/roomSlice";

export default function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const user = useSelector((state) => state.userInfo.user);
  const userObj = {
    id: user._id,
    displayName: user.displayName,
  };

  const handleOpenMakeRoomModal = () => {
    setIsOpenModal(true);
  };

  const handleMakeRoomButton = () => {
    setIsOpenModal(false);
    dispatch(getRoomData({ title, userObj }));
    navigate("/ready-for-battle-room");
  };

  const handleCancelMakeRoomButton = () => {
    setIsOpenModal(false);
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

        {isOpenModal && (
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
`;
