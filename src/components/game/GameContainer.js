import React from "react";
import { useSelector } from "react-redux";
import DinoRunCanvas from "./DinoRunCanvas";

export default function GameContainer() {
  const { myScore, isDead, player2YourScore } = useSelector(
    (state) => state.game
  );

  return (
    <>
      <div>내 점수: {myScore}</div>
      <div>상대방 점수: {player2YourScore}</div>
      {isDead && Number(myScore) > Number(player2YourScore) ? (
        <div>승</div>
      ) : (
        <div>패</div>
      )}
      <DinoRunCanvas />
    </>
  );
}
