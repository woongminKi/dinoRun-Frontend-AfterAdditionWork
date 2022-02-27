import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../components/Home";
import Main from "../components/Main";
import ReadyForBattleRoom from "../components/ReadyForBattleRoom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/ready-for-battle-room" element={<ReadyForBattleRoom />} />
      </Routes>
    </>
  );
}

export default App;
