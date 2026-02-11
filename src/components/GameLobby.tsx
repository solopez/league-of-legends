import React from "react";
import lobbyBg from "../assets/lobby-bg.png";
import Header from "./Header";
import PlayerSlots from "./PlayerSlots";

const GameLobby: React.FC = () => {
  return (
    <div className="mx-auto relative w-full h-screen ">
      <img
        src={lobbyBg}
        alt="Lobby background"
        className="fixed inset-0 w-full h-full object-cover"
      />
      <div className="relative flex flex-col">
        <Header />
        <div className="py-20">
          <PlayerSlots
            players={[
              {
                nick: "soldrums",
                description: "La Criofénix",
                modelSource: "/league-of-legends/firecracker_caitlyn.glb",
              },
              {
                nick: "JustLuisa",
                description: "La arquera de hielo",
                modelSource: "/league-of-legends/firecracker_ashe.glb",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default GameLobby;
