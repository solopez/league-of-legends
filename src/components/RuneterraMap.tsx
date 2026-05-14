import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DD, DD_SPLASH } from "../constants/cdn";
import { markVisited } from "../utils/visited";
import mapImg from "../assets/runeterra-map.jpg";
import REGIONS from "../data/regions";
import type { Region } from "../data/regions";

const MAP_URL = mapImg;

export default function RuneterraMap() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Region | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  useEffect(() => { markVisited("runeterra"); }, []);

  return (
    <div
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      {MAP_URL ? (
        <img
          src={MAP_URL}
          alt="Mapa de Runeterra"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.55 }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(ellipse 60% 50% at 35% 45%, rgba(200,155,60,0.07) 0%, transparent 100%)",
              "radial-gradient(ellipse 40% 40% at 70% 65%, rgba(79,195,247,0.04) 0%, transparent 100%)",
              "radial-gradient(ellipse 50% 60% at 15% 55%, rgba(102,187,106,0.03) 0%, transparent 100%)",
            ].join(", "),
          }}
        />
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: MAP_URL
            ? "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 40%, rgba(0,0,0,0.55) 100%)"
            : undefined,
        }}
      />

      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-6 z-20 text-[10px] lg:text-sm tracking-[0.3em] uppercase opacity-35 hover:opacity-65 transition-opacity"
        style={{ color: "#C89B3C" }}
      >
        ← El Nexus
      </button>

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-6 left-0 right-0 z-10 flex flex-col items-center gap-1 pointer-events-none"
      >
        <div className="flex items-center gap-3">
          <div className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, #C89B3C)" }} />
          <span style={{ color: "#C89B3C", fontSize: 10 }}>✦</span>
          <h1 className="text-2xl font-bold tracking-[0.3em] uppercase" style={{ color: "#F0E6D3" }}>
            Runeterra
          </h1>
          <span style={{ color: "#C89B3C", fontSize: 10 }}>✦</span>
          <div className="h-px w-20" style={{ background: "linear-gradient(to left, transparent, #C89B3C)" }} />
        </div>
        <p className="text-[10px] lg:text-sm tracking-[0.35em] uppercase" style={{ color: "#4a4a4a" }}>
          Explora las regiones del mundo
        </p>
      </motion.div>

      {REGIONS.map((region, index) => (
        <motion.button
          key={region.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 + index * 0.055, duration: 0.25, ease: "backOut" }}
          className="absolute z-20"
          style={{ left: `${region.x}%`, top: `${region.y}%`, transform: "translate(-50%, -50%)" }}
          onMouseEnter={() => setHovered(region.id)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => setSelected(region)}
        >
          <AnimatePresence>
            {hovered === region.id && (
              <motion.div
                className="absolute rounded-full border"
                style={{ borderColor: region.color, inset: -10 }}
                initial={{ scale: 0.9, opacity: 0.7 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, repeat: Infinity, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          <motion.div
            className="w-6 h-6 rounded-full border-2"
            style={{ backgroundColor: region.color + "22", borderColor: region.color }}
            animate={{
              scale: hovered === region.id ? 1.4 : selected?.id === region.id ? 1.2 : 1,
              boxShadow:
                hovered === region.id
                  ? `0 0 18px 6px ${region.color}55`
                  : selected?.id === region.id
                  ? `0 0 12px 3px ${region.color}40`
                  : `0 0 6px 2px ${region.color}25`,
            }}
            transition={{ duration: 0.15 }}
          />

          <AnimatePresence>
            {(hovered === region.id || selected?.id === region.id) && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.13 }}
                className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
              >
                <span
                  className="text-[9px] lg:text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded"
                  style={{ backgroundColor: "rgba(5,5,10,0.9)", border: `1px solid ${region.color}50`, color: "#F0E6D3" }}
                >
                  {region.name}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      ))}

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-20"
            onClick={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selected && (
          <motion.aside
            key={selected.id}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-80 z-30 overflow-y-auto"
            style={{ borderLeft: "1px solid #785A28", background: "linear-gradient(160deg, hsl(220 20% 13% / 0.99), hsl(220 20% 7% / 1))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded transition-opacity hover:opacity-70 text-xs font-bold"
              style={{ color: "#C89B3C", backgroundColor: "rgba(0,0,0,0.6)", border: "1px solid #785A28" }}
            >
              ✕
            </button>

            <div className="relative h-44 overflow-hidden flex-shrink-0">
              <img
                src={`${DD_SPLASH}/${selected.champions[0].id}_0.jpg`}
                alt={selected.name}
                className="w-full h-full object-cover object-top"
                style={{ filter: "brightness(0.65) saturate(0.85)" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, hsl(220 20% 10%) 100%)" }} />
              <div className="absolute bottom-3 left-4 right-10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: selected.color }} />
                  <h2 className="text-lg font-bold tracking-widest uppercase leading-none" style={{ color: "#F0E6D3" }}>
                    {selected.name}
                  </h2>
                </div>
                <div className="h-px" style={{ background: `linear-gradient(to right, ${selected.color}90, transparent)` }} />
              </div>
            </div>

            <div className="p-4 flex flex-col gap-4">
              <p className="text-sm lg:text-base leading-relaxed" style={{ color: "#A0937D" }}>
                {selected.lore}
              </p>
              <div className="h-px" style={{ background: "linear-gradient(to right, #785A28 20%, transparent 100%)" }} />
              <div>
                <p className="text-[10px] lg:text-sm tracking-[0.3em] uppercase font-bold mb-3" style={{ color: "#C89B3C" }}>
                  Campeones destacados
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {selected.champions.map((champ, i) => (
                    <motion.div
                      key={champ.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.065, duration: 0.2 }}
                      className="flex flex-col items-center gap-1 cursor-default"
                    >
                      <ChampionPortrait id={champ.id} name={champ.name} baseUrl={DD} accentColor={selected.color} />
                      <span className="text-[9px] lg:text-xs tracking-wide text-center leading-tight" style={{ color: "#5a5a5a" }}>
                        {champ.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChampionPortrait({ id, name, baseUrl, accentColor }: { id: string; name: string; baseUrl: string; accentColor: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="w-16 h-16 overflow-hidden rounded transition-all duration-200"
      style={{ border: `1px solid ${hovered ? accentColor : "#785A28"}`, boxShadow: hovered ? `0 0 10px ${accentColor}40` : "0 2px 8px rgba(0,0,0,0.5)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={name}
    >
      <img
        src={`${baseUrl}/${id}.png`}
        alt={name}
        className="w-full h-full object-cover"
        style={{ transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.2s" }}
      />
    </div>
  );
}
