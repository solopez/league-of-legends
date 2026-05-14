import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DD_SPLASH } from "../constants/cdn";
import championData, { type ChampionName } from "../data/champions";
import ChampionCard from "./ChampionCard";

const CHAMPION_LIST = (Object.keys(championData) as ChampionName[]).map((name) => ({
  name,
  ddId: championData[name].ddId,
  history: championData[name].history,
  abilities: championData[name].abilities,
}));

export default function ChampionSelect() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<ChampionName | null>(null);

  const champ = selected ? championData[selected] : null;

  return (
    <div
      className="relative w-full h-screen overflow-hidden flex flex-col"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 30% 50%, rgba(200,155,60,0.07) 0%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      <div
        className="relative z-10 flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(120,90,40,0.18)" }}
      >
        <button
          onClick={() => navigate("/lobby")}
          className="text-[10px] lg:text-sm tracking-[0.3em] uppercase opacity-35 hover:opacity-65 transition-opacity"
          style={{ color: "#C89B3C" }}
        >
          ← El Lobby
        </button>
        <div className="flex items-center gap-3">
          <div className="h-px w-10" style={{ background: "linear-gradient(to right, transparent, #C89B3C)" }} />
          <span style={{ color: "#C89B3C", fontSize: 10 }}>✦</span>
          <h1 className="text-base font-bold tracking-[0.35em] uppercase" style={{ color: "#F0E6D3" }}>
            Elegí tu Campeón
          </h1>
          <span style={{ color: "#C89B3C", fontSize: 10 }}>✦</span>
          <div className="h-px w-10" style={{ background: "linear-gradient(to left, transparent, #C89B3C)" }} />
        </div>
        <div style={{ width: 80 }} />
      </div>

      <div className="relative z-10 flex-1 flex flex-col md:flex-row gap-0 min-h-0">

        <div className="flex-1 relative flex flex-col justify-end overflow-hidden min-h-0">
          <AnimatePresence mode="wait">
            {selected && champ ? (
              <motion.div
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55 }}
                className="absolute inset-0"
              >
                <img
                  src={`${DD_SPLASH}/${champ.ddId}_0.jpg`}
                  alt={selected}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ filter: "brightness(0.5) saturate(0.75)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(10,10,15,0.1) 0%, rgba(10,10,15,0.7) 65%, rgba(10,10,15,0.97) 100%)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(10,10,15,0) 50%, rgba(10,10,15,0.9) 100%)",
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3"
              >
                <motion.span
                  animate={{ opacity: [0.15, 0.35, 0.15] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  style={{ color: "#C89B3C", fontSize: 28 }}
                >
                  ✦
                </motion.span>
                <p
                  className="text-xs tracking-[0.3em] uppercase"
                  style={{ color: "#2a2a2a" }}
                >
                  Seleccioná un campeón
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {selected && champ && (
              <motion.div
                key={`info-${selected}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="relative z-10 p-6 md:p-8 flex flex-col gap-5"
              >
                <div>
                  <div
                    className="h-px w-16 mb-3"
                    style={{ background: "linear-gradient(to right, #C89B3C, transparent)" }}
                  />
                  <h2
                    className="text-3xl md:text-4xl font-bold tracking-widest uppercase leading-none"
                    style={{ color: "#F0E6D3" }}
                  >
                    {selected === "MissFortune" ? "Miss Fortune" : selected === "Blitz" ? "Blitzcrank" : selected}
                  </h2>
                </div>

                <p
                  className="text-sm lg:text-base leading-relaxed max-w-md"
                  style={{ color: "#7a6a58" }}
                >
                  {champ.history}
                </p>

                <div>
                  <p
                    className="text-[9px] lg:text-xs tracking-[0.3em] uppercase font-bold mb-3"
                    style={{ color: "#C89B3C" }}
                  >
                    Habilidades
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {champ.abilities.map((ab, i) => (
                      <motion.span
                        key={ab}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="px-3 py-1 rounded text-[10px] lg:text-sm tracking-wide"
                        style={{
                          border: "1px solid rgba(200,155,60,0.25)",
                          color: "#A0937D",
                          backgroundColor: "rgba(200,155,60,0.06)",
                        }}
                      >
                        {ab}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(`/game?champion=${selected}`)}
                  className="self-start px-10 py-3 rounded text-xs font-bold tracking-[0.25em] uppercase"
                  style={{ backgroundColor: "#C89B3C", color: "#0A0A0F" }}
                >
                  Entrar al Nexus →
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className="flex-shrink-0 flex flex-col justify-center gap-0 md:w-72 px-4 md:px-5 py-4 md:py-8"
          style={{ borderLeft: "1px solid rgba(120,90,40,0.15)" }}
        >
          <p
            className="text-[9px] lg:text-xs tracking-[0.35em] uppercase mb-4 text-center md:text-left"
            style={{ color: "#3a3a3a" }}
          >
            {CHAMPION_LIST.length} campeones disponibles
          </p>

          <div className="flex flex-row md:flex-col gap-3">
            {CHAMPION_LIST.map((c, i) => (
              <div key={c.name} className="flex-1 md:flex-none">
                <ChampionCard
                  ddId={c.ddId}
                  name={c.name === "MissFortune" ? "Miss Fortune" : c.name === "Blitz" ? "Blitzcrank" : c.name}
                  selected={selected === c.name}
                  onClick={() => setSelected(c.name)}
                  index={i}
                />
              </div>
            ))}
          </div>

          <AnimatePresence>
            {selected && (
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/game?champion=${selected}`)}
                className="md:hidden mt-5 w-full py-3 rounded text-xs font-bold tracking-[0.25em] uppercase"
                style={{ backgroundColor: "#C89B3C", color: "#0A0A0F" }}
              >
                Entrar al Nexus →
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
