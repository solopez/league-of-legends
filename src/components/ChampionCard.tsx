import React from "react";

interface ChampionCardProps {
  champion: string;
  imageUrl: string;
  history: string;
  abilities: string[];
}

const ChampionCard: React.FC<ChampionCardProps> = ({
  champion,
  imageUrl,
  history,
  abilities,
}) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto mt-6 glow-gold m-4">
      <img
        src={imageUrl}
        alt={champion}
        className="w-full h-96 object-cover rounded-lg transition-all duration-500 transform hover:scale-110"
      />

      <div className="m-4 pb-6">
        <h2 className="text-3xl font-semibold mb-4">{champion}</h2>
        <p className="text-lg text-center mb-4">{history}</p>

        <h3 className="text-xl font-semibold mb-2">Habilidades:</h3>
        <ul className="list-disc pl-6 text-sm">
          {abilities.map((ability, index) => (
            <li key={index} className="text-gray-300">
              {ability}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChampionCard;
