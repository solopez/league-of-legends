import EmptySlot from "./EmptySlot";
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
  return (
    <main className="flex flex-wrap items-center justify-center gap-8 px-8 overflow-auto w-full">
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
        <SearchButton onClick={() => console.log("Search button clicked")} />
      </div>
    </main>
  );
};
export default PlayerSlots;
