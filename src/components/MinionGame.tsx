import React, { useEffect, useState } from "react";
import Model3D from "../components/Model3D";

const Enemies: React.FC<{ src: string; width: string; height: string }> = ({
  src,
  width,
  height,
}) => {
  return <Model3D src={src} width={width} height={height} />;
};

const MinionGame: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [enemyVisible, setEnemyVisible] = useState<boolean>(false);
  const [enemyPosition, setEnemyPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [enemyType, setEnemyType] = useState<"minion" | "baron">("minion");
  const [modelSources] = useState<{ minion: string; baron: string }>({
    minion: "/league-of-legends/minion.glb",
    baron: "/league-of-legends/baron.glb",
  });
  const [currentModel, setCurrentModel] = useState<string>("");

  const getRandomPosition = (): { x: number; y: number } => {
    const x = Math.floor(Math.random() * (window.innerWidth - 150));
    const y = Math.floor(Math.random() * (window.innerHeight - 150));
    return { x, y };
  };

  const showEnemy = (): void => {
    const position = getRandomPosition();
    const randomType = Math.random() > 0.5 ? "minion" : "baron";
    setEnemyPosition(position);
    setEnemyType(randomType);
    setCurrentModel(modelSources[randomType]);
    setEnemyVisible(true);

    setTimeout(() => {
      setEnemyVisible(false);
    }, 1000);
  };

  const handleClickEnemy = (): void => {
    if (enemyVisible) {
      setScore(score + 1);
      setEnemyVisible(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      showEnemy();
    }, 1500);

    return () => clearInterval(interval);
  }, [modelSources]);

  const getEnemySize = (type: "minion" | "baron") => {
    if (type === "baron") {
      return { width: "400px", height: "400px" };
    }
    return { width: "150px", height: "150px" };
  };

  const { width, height } = getEnemySize(enemyType);

  return (
    <div
      className="py-4 relative bg-cover bg-center w-screen h-screen flex mx-auto  cursor-crosshair flex justify-center  gap-2"
      onClick={handleClickEnemy}
      style={{ backgroundImage: "url('/map.png')" }}
    >
      {enemyVisible && (
        <div
          className="absolute"
          style={{
            left: `${enemyPosition.x}px`,
            top: `${enemyPosition.y}px`,
            width: width,
            height: height,
          }}
        >
          <Enemies src={currentModel} width={width} height={height} />
        </div>
      )}
    </div>
  );
};

export default MinionGame;
