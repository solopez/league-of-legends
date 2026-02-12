import React, { useState } from "react";
import ChampionCard from "./ChampionCard";
import championData from "./championData";
import { Link } from "react-router-dom";

type ChampionName =
  | "Caitlyn"
  | "Jinx"
  | "Samira"
  | "Gwen"
  | "Urgot"
  | "Xin Zhao"
  | "Evelynn"
  | "Seraphine"
  | "Miss Fortune"
  | "Lux"
  | "Darius"
  | "Nidalee"
  | "Ahri"
  | "Zyra"
  | "Gragas"
  | "Aurelion"
  | "Garen"
  | "Blitz"
  | "Nami"
  | "Nasus";

const ChampionSelect: React.FC = () => {
  const champions: ChampionName[] = [
    "Caitlyn",
    "Jinx",
    "Samira",
    "Gwen",
    "Urgot",
    "Xin Zhao",
    "Evelynn",
    "Seraphine",
    "Miss Fortune",
    "Lux",
    "Darius",
    "Nidalee",
    "Ahri",
    "Zyra",
    "Gragas",
    "Aurelion",
    "Garen",
    "Blitz",
    "Nami",
    "Nasus",
  ];

  const [selectedChampion, setSelectedChampion] = useState<ChampionName | null>(
    null,
  );
  const [summoned, setSummoned] = useState(false);

  const handleChampionClick = (champion: ChampionName) => {
    setSelectedChampion(champion);
    setSummoned(true);
  };

  const getImageUrl = (champion: ChampionName) => {
    const championUrl = champion.toLowerCase().replace(/\s+/g, "-");
    let imageUrl = `/league-of-legends/${championUrl}.png`;

    if (summoned) {
      imageUrl = imageUrl.replace(".png", "_full.png");
    }

    return imageUrl;
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    champion: ChampionName,
  ) => {
    const championUrl = champion.toLowerCase().replace(/\s+/g, "-");
    e.currentTarget.src = `/league-of-legends/${championUrl}.png`;
  };

return (
  <div className="relative w-full min-h-screen overflow-y-auto">
    <img
      src="/league-of-legends/select.jpg"
      alt="Background"
      className="fixed inset-0 w-full h-full object-cover -z-10"
    />

    <div className="relative flex flex-col items-center py-20 px-4">
      <Link to="/">
        <img
          src="/league-of-legends/logo.png"
          alt="Home"
          className="w-20 h-20 absolute left-0 top-0 cursor-pointer p-4"
        />
      </Link>

      <div className="bg-gradient-to-r from-gray-950 to-gray-500/10 p-6 rounded-lg shadow-lg w-full max-w-5xl">
        <h1 className="text-center text-2xl text-white mb-6 font-bold">
          SELECT YOUR CHAMPION!
        </h1>

        <div className="flex flex-wrap justify-center">
          {champions.map((champion, index) => (
            <div
              key={index}
              className="relative flex justify-center items-center rounded-md p-1 cursor-pointer m-2"
              onClick={() => handleChampionClick(champion)}
            >
              <img
                src={`/league-of-legends/${champion
                  .toLowerCase()
                  .replace(/\s+/g, "-")}.png`}
                alt={champion}
                title={champion}
                className="w-20 h-20 object-cover hover:brightness-50 transition-all duration-300 border border-amber-400"
                onError={(e) => handleImageError(e, champion)}
              />
            </div>
          ))}
        </div>

        {summoned && selectedChampion && (
          <div className="mt-10">
            <ChampionCard
              champion={selectedChampion}
              imageUrl={getImageUrl(selectedChampion)}
              history={championData[selectedChampion].history}
              abilities={championData[selectedChampion].abilities}
            />
          </div>
        )}
      </div>
    </div>
  </div>
);

};

export default ChampionSelect;
