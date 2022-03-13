import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DinoRunCanvas from "./DinoRunCanvas";

export default function GameContainer() {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { myScore, isDead, player2YourScore } = useSelector(
    (state) => state.game
  );

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GameWrapper>
      <Div>내 점수: {myScore}</Div>
      <Div>상대방 점수: {player2YourScore}</Div>
      {isDead && Number(myScore) === Number(player2YourScore) ? (
        <div className="same">무승부</div>
      ) : Number(myScore) > Number(player2YourScore) ? (
        <div className="winner">승</div>
      ) : (
        <div className="loser">패</div>
      )}
      <DinoRunCanvas />
    </GameWrapper>
  );
}

const GameWrapper = styled.div`
  background-color: #f5f5f5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Teko";

  .winner {
    color: red;
  }

  .loser {
    color: blue;
  }
`;

const Div = styled.div``;
