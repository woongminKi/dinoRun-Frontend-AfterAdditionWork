import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../components/Home";
import Main from "../components/Main";
import ReadyForBattleRoom from "../components/ReadyForBattleRoom";
import Lobby from "../components/Lobby";
import Game from "../components/Game";

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
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
