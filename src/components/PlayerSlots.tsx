import EmptySlot from "./EmptySlot";
import PlayerCard from "./PlayerCard";

type PlayerSlotsProps = {
  players: {
    nick: string;
    description: string;
    modelSource: string;
  }[];
};

const PlayerSlots = ({ players }: PlayerSlotsProps) => {
  return (
    <main className="flex-1 flex items-center justify-center gap-8 px-8">
      <div className="flex items-center gap-6">
        <EmptySlot />
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
    </main>
  );
};
export default PlayerSlots;