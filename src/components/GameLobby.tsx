import { useState } from "react";
import lobbyBg from "../assets/lobby-bg.png";

import Footer from "./Footer";
import Header from "./Header";
import PlayerSlots from "./PlayerSlots";
import Loading from "./Loading";

const GameLobby = () => {
  const [showWallpaper, setShowWallpaper] = useState(false);
  return !showWallpaper ? (
    <div className="container mx-auto relative w-full h-screen overflow-hidden select-none">
      <img
        src={lobbyBg}
        alt="Lobby background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-background/30" />

      <div className="relative z-10 flex flex-col h-full">
        <Header />

        <PlayerSlots
          players={[
            {
              nick: "soldrums",
              description: "La Criofénix",
              modelSource: "/firecracker_caitlyn.glb",
            },
            {
              nick: "JustLuisa",
              description: "La arquera de hielo",
              modelSource: "/firecracker_ashe.glb",
            },
          ]}
        />

        <Footer setShowWallpaper={setShowWallpaper} />
      </div>
    </div>
  ) : (
    <Loading setShowWallpaper={setShowWallpaper} />
  );
};

export default GameLobby;
