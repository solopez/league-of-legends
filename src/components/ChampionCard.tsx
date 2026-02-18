import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
interface ChampionStats {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

interface Champion {
  id: number;
  name: string;
  image: string;
  description: string;
  stats: ChampionStats;
}

interface ChampionCardProps {
  champ: Champion;
}

export default function ChampionCard({ champ }: ChampionCardProps) {
  const [selected, setSelected] = useState<boolean>(false);
  const [flipped, setFlipped] = useState<boolean>(false);

  return (
    <>
      <motion.div
        layoutId={`card-${champ.id}`}
        onClick={() => setSelected(true)}
        whileHover={{ scale: 1.07 }}
        className="relative cursor-pointer rounded-xl overflow-hidden group"
      >
        <img
          src={champ.image}
          alt={champ.name}
          className="w-56 h-80 object-cover transition duration-500 group-hover:brightness-110"
        />

        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 
          shadow-[0_0_40px_rgba(255,215,0,0.6)]"
        />

        <div
          className="absolute bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent 
          text-yellow-400 font-bold tracking-widest p-3 w-full text-center"
        >
          {champ.name}
        </div>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelected(false);
              setFlipped(false);
            }}
          >
            <motion.div
              layoutId={`card-${champ.id}`}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[360px] h-[520px] perspective"
            >
              <motion.div
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-full"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="absolute w-full h-full rounded-2xl overflow-hidden 
                  bg-zinc-900 border-2 border-yellow-500 
                  shadow-[0_0_60px_rgba(255,215,0,0.5)]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={champ.image}
                    alt={champ.name}
                    className="w-full h-full object-cover opacity-90"
                  />

                  <div className="absolute bottom-0 bg-black/80 p-4 w-full">
                    <h2 className="text-2xl text-yellow-400 font-bold">
                      {champ.name}
                    </h2>
                    <p className="text-gray-300 text-sm mt-2">
                      {champ.description}
                    </p>
                  </div>
                </div>

                <div
                  className="absolute w-full h-full rounded-2xl bg-zinc-950 
                  border-2 border-yellow-500 p-6 text-white"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <h3 className="text-xl text-yellow-400 font-bold mb-6">
                    Estadísticas
                  </h3>

                  <Stat label="Ataque" value={champ.stats.attack} />
                  <Stat label="Defensa" value={champ.stats.defense} />
                  <Stat label="Magia" value={champ.stats.magic} />
                  <Stat label="Dificultad" value={champ.stats.difficulty} />
                </div>
              </motion.div>

              <button
                onClick={() => setFlipped((prev) => !prev)}
                className="absolute -bottom-14 left-1/2 -translate-x-1/2 
                bg-yellow-500 hover:bg-yellow-400 text-black 
                font-bold px-6 py-2 rounded-full shadow-lg transition"
              >
                {flipped ? "Ver Splash" : "Ver Stats"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface StatProps {
  label: string;
  value: number; // 0 - 10
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1 text-sm">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div className="w-full bg-zinc-800 h-2 rounded">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value * 10}%` }}
          transition={{ duration: 0.8 }}
          className="bg-yellow-500 h-2 rounded"
        />
      </div>
    </div>
  );
}
