import React from "react";
import { useSelector } from "react-redux";

export default function ReadyForBattleRoom() {
  const room = useSelector((state) => state.room);
  return <>대기 방입니다.</>;
}
