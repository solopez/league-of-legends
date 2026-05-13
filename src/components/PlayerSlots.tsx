import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptySlot from "./EmptySlot";
import Loading from "./Loading";
import PlayerCard from "./PlayerCard";
import SearchButton from "./SearchButton";

type PlayerSlotsProps = {
  players: {
    nick: string;
    description: string;
    modelSource: string;
  }[];
};

const PlayerSlots = ({ players }: PlayerSlotsProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSearchClick = () => {
    setLoading(true);

    setTimeout(() => {
      clearInterval(1000);
      navigate("/champion-select");
    }, 2000);
  };

  const handleTutorialClick = () => {
    navigate("/game");
  };

  const handleBoardClick = () => {
    navigate("/runeterra");
  };

  return (
    <main className="flex flex-wrap items-center justify-center gap-8 px-8 overflow-auto w-full">
      {loading ? (
        <div className="w-full flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-6">
            <EmptySlot />
          </div>

          {players.map((player) => (
            <PlayerCard
              key={player.nick}
              nick={player.nick}
              description={player.description}
              modelSource={player.modelSource}
            />
          ))}

          <div className="flex items-center gap-6">
            <EmptySlot />
          </div>

          <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 mt-4 flex-wrap">
            <SearchButton label="Buscar Partida" onClick={handleSearchClick} />
            <button
              type="button"
              onClick={handleBoardClick}
              className="px-10 py-3 rounded-md border border-accent/55 text-accent-foreground text-xs font-semibold tracking-[0.15em] uppercase bg-gray-950/80 glow-gold hover:border-accent transition-colors cursor-pointer"
            >
              Runeterra
            </button>
            <button
              type="button"
              onClick={handleTutorialClick}
              className="px-10 py-3 rounded-md border border-gold/40 text-foreground/90 text-xs font-semibold tracking-[0.15em] uppercase bg-black/40 hover:bg-black/55 hover:border-gold/60 transition-colors cursor-pointer"
            >
              Tutorial · clicker
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default PlayerSlots;
