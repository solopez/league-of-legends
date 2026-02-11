import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

const GameLobby = React.lazy(() => import("./components/GameLobby"));
const MinionGame = React.lazy(() => import("./components/MinionGame"));

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter basename="/league-of-legends">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={isLoading ? <Loading /> : <GameLobby />} />
          <Route path="/game" element={<GameLobby />} />
          <Route path="/minion-game" element={<MinionGame />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
