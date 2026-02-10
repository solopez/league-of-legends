import React, { useState, useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Loading from "./components/Loading";
import Footer from "./components/Footer";

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
    <Router>
      <Suspense fallback={<Loading />}>
        {" "}
        {}
        <Routes>
          <Route path="/" element={isLoading ? <Loading /> : <GameLobby />} />
          <Route path="/game" element={<GameLobby />} />
          <Route path="/minion-game" element={<MinionGame />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Suspense>
    </Router>
  );
};

export default App;
