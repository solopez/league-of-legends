import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptySlot from "./EmptySlot";
import Loading from "./Loading";
import PlayerCard from "./PlayerCard";
import SearchButton from "./SearchButton";

type Player = {
  nick: string;
  description: string;
  modelSource: string;
  splashId: string;
};

export default function PlayerSlots({ players }: { players: Player[] }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSearchClick = () => {
    setLoading(true);
    setTimeout(() => navigate("/champion-select"), 2000);
  };

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-2 h-full">
      <div className="flex items-center justify-center gap-4 lg:gap-6 flex-wrap">
        <EmptySlot />
        {players.map((p) => (
          <PlayerCard key={p.nick} {...p} />
        ))}
        <EmptySlot />
      </div>

      <div
        className="w-full max-w-xs h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, #785A28 30%, #785A28 70%, transparent)",
        }}
      />

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2.5 rounded text-[10px] tracking-[0.25em] uppercase transition-opacity opacity-35 hover:opacity-65 cursor-pointer"
          style={{
            border: "1px solid #785A2840",
            color: "#C89B3C",
            backgroundColor: "transparent",
          }}
        >
          ← El Nexus
        </button>
        <SearchButton label="Buscar Partida" onClick={handleSearchClick} />
      </div>
    </div>
  );
}
