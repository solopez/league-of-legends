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
      navigate("/champion-select");
    }, 2000);
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

          <div className="w-full flex justify-center mt-4 ">
            <SearchButton label="Buscar Partida" onClick={handleSearchClick} />
          </div>
        </>
      )}
    </main>
  );
};

export default PlayerSlots;
