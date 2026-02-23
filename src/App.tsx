import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ChampionSelect from "./components/ChampionSelect";
import Footer from "./components/Footer";
import Game from "./components/Game";

const GameLobby = React.lazy(() => import("./components/GameLobby"));

function App() {
  return (
    <BrowserRouter basename="/league-of-legends">
      <Routes>
        <Route path="/" element={<GameLobby />} />
        <Route path="/champion-select" element={<ChampionSelect />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
