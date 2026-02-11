import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import lobbyBg from "../assets/lobby-bg.png";
import Header from "./Header";
import PlayerSlots from "./PlayerSlots";
import SearchButton from "./SearchButton";
import Loading from "./Loading";

const GameLobby: React.FC = () => {
  const [isLobbyVisible, setIsLobbyVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearchButtonClick = () => {
    setIsLoading(true);
    setIsLobbyVisible(false);

    setTimeout(() => {
      navigate("/minion-game");
    }, 2000);
  };

  return (
    <div className="mx-auto relative w-full h-screen overflow-hidden select-none">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {}
          {isLobbyVisible && (
            <>
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
                      modelSource: "/league-of-legends/firecracker_caitlyn.glb",
                    },
                    {
                      nick: "JustLuisa",
                      description: "La arquera de hielo",
                      modelSource: "/league-of-legends/firecracker_ashe.glb",
                    },
                  ]}
                />
                <SearchButton onClick={handleSearchButtonClick} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default GameLobby;
