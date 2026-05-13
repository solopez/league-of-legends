import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
const ChampionSelect = React.lazy(() => import("./components/ChampionSelect"));
const Game = React.lazy(() => import("./components/Game"));
const GameLobby = React.lazy(() => import("./components/GameLobby"));
const RuneterraMap = React.lazy(() => import("./components/RuneterraMap"));


function App() {
  return (
    <BrowserRouter basename="/league-of-legends">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <GameLobby />
            </Suspense>
          }
        />

        <Route path="/runeterra" element={
          <Suspense fallback={<div>Loading...</div>}>
            <RuneterraMap />
          </Suspense>
        } />

        <Route
          path="/champion-select"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ChampionSelect />
            </Suspense>
          }
        />

        <Route
          path="/game"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Game />
            </Suspense>
          }
        />


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
