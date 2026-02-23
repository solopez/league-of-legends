import React from "react";
import championData, { type ChampionName } from "../models/ChampionData";

import ChampionCard from "./ChampionCard";

interface Champion {
  id: number;
  name: ChampionName;
  image: string;
  description: string;
}

const ChampionSelect: React.FC = () => {
  const champions = Object.keys(championData) as ChampionName[];

  const buildChampion = (name: ChampionName, index: number): Champion => {
    return {
      id: index + 1,
      name,
      image: championData[name].imageUrl.replace(".png", "_full.png"),
      description: championData[name].history,
    };
  };

  return (
    <div className="relative w-full min-h-screen overflow-y-auto">
      <img
        src="/league-of-legends/images/select.jpg"
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover -z-10"
      />

      <div className="relative flex flex-col items-center py-20 px-4">
        <div className="bg-gradient-to-r from-gray-950 to-gray-500/10 p-8 rounded-lg shadow-lg w-full max-w-7xl">
          <h1 className="text-center text-2xl text-white mb-12 font-bold tracking-widest">
            SELECT YOUR CHAMPION
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 justify-items-center">
            {champions.map((champion, index) => (
              <ChampionCard
                key={champion}
                champ={buildChampion(champion, index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChampionSelect;
