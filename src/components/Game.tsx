import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Model3D from "../components/Model3D";
import Win from "./Win";
import gameMap from "../assets/map.jpg";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const Game: React.FC = () => {
  const [animation, setAnimation] = useState("Run");
  const [life, setLife] = useState(100);
  const [enemyIndex, setEnemyIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const enemyModels = [
    "/league-of-legends/models/enemy2.glb",
    "/league-of-legends/models/enemy1.glb",
    "/league-of-legends/models/enemy3.glb",
  ];

  const query = useQuery();
  const championName = query.get("champion");

  let championModel = "/league-of-legends/models/ashe.glb";

  if (championName) {
    championModel = `/league-of-legends/models/${championName.toLocaleLowerCase()}.glb`;
  }

  const handleClick = (event: React.MouseEvent) => {
    if (event.target instanceof HTMLElement && event.target.id === "enemy") {
      setAnimation("Attack1");
      setLife((prevLife) => {
        const newLife = Math.max(prevLife - 10, 0);

        if (newLife === 0 && enemyIndex + 1 < enemyModels.length) {
          setEnemyIndex(enemyIndex + 1);
          return 100;
        }

        if (enemyIndex === enemyModels.length - 1 && newLife === 0) {
          setGameOver(true);
        }

        return newLife;
      });
    } else {
      setAnimation("Run");
    }
  };

  if (gameOver) {
    return <Win />;
  }

  return (
    <div
      className="mb-10"
      onClick={handleClick}
      style={{
        height: "100vh",
        position: "relative",
        backgroundImage: `url(${gameMap})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex items-end justify-center h-[66%] gap-40">
        <Model3D
          id="champion"
          src={championModel}
          animationName={animation}
          orbit="-90deg 35deg 0"
          position="0m 0m 0m"
        />

        <div className="relative cursor-crosshair ">
          <Model3D
            id="enemy"
            src={enemyModels[enemyIndex]}
            animationName="Run"
            orbit="30deg 100deg 0"
            position="0m 0m 0m"
          />
          <div
            className="absolute left-40 top-0 bg-red-500 "
            style={{
              height: "5px",
              width: "50%",
              transform: `scaleX(${life / 100})`,
              transformOrigin: "left",
              transition: "transform 0.3s ease-out",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
