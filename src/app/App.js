import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../components/Home";
import Main from "../components/Main";
import ReadyForBattleRoom from "../components/ReadyForBattleRoom";
import Lobby from "../components/Lobby";
import GameContainer from "../components/game/GameContainer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route
          path="/readyBattleRoom/:roomid"
          element={<ReadyForBattleRoom />}
        />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game" element={<GameContainer />} />
      </Routes>
    </>
  );
}

export default App;
