import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DD, DD_SPLASH } from "../constants/cdn";
import REGIONS from "../data/regions";
import { markVisited } from "../utils/visited";

interface ExplorerChampion {
  id: string;
  name: string;
  regionId: string;
  regionName: string;
  regionColor: string;
}

const ALL_CHAMPIONS: ExplorerChampion[] = REGIONS.flatMap((r) =>
  r.champions.map((c) => ({
    id: c.id,
    name: c.name,
    regionId: r.id,
    regionName: r.name,
    regionColor: r.color,
  }))
);

export default function ChampionExplorer() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<ExplorerChampion | null>(null);
  const [activeRegion, setActiveRegion] = useState("all");
  useEffect(() => { markVisited("champions"); }, []);

  const filtered = useMemo(
    () =>
      activeRegion === "all"
        ? ALL_CHAMPIONS
        : ALL_CHAMPIONS.filter((c) => c.regionId === activeRegion),
    [activeRegion]
  );

  const regionPeers = useMemo(
    () =>
      selected
        ? ALL_CHAMPIONS.filter(
            (c) => c.regionId === selected.regionId && c.id !== selected.id
          )
        : [],
    [selected]
  );

  return (
    <div
      className="relative w-full min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(200,155,60,0.05) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="sticky top-0 z-30 flex flex-col gap-3 px-6 pt-5 pb-4"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,15,0.98) 80%, transparent)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="text-[10px] lg:text-sm tracking-[0.3em] uppercase opacity-35 hover:opacity-65 transition-opacity"
              style={{ color: "#C89B3C" }}
            >
              ← El Nexus
            </button>
            <span style={{ color: "#2a2a2a" }}>·</span>
            <div className="flex items-center gap-3">
              <div
                className="h-px w-8"
                style={{
                  background: "linear-gradient(to right, transparent, #C89B3C)",
                }}
              />
              <h1
                className="text-lg font-bold tracking-[0.3em] uppercase"
                style={{ color: "#F0E6D3" }}
              >
                Los Campeones
              </h1>
              <div
                className="h-px w-8"
                style={{
                  background: "linear-gradient(to left, transparent, #C89B3C)",
                }}
              />
            </div>
          </div>
          <span
            className="text-[10px] lg:text-sm tracking-widest"
            style={{ color: "#3a3a3a" }}
          >
            {filtered.length} campeones
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          <FilterTab
            label="Todos"
            color="#C89B3C"
            active={activeRegion === "all"}
            onClick={() => setActiveRegion("all")}
          />
          {REGIONS.map((r) => (
            <FilterTab
              key={r.id}
              label={r.name}
              color={r.color}
              active={activeRegion === r.id}
              onClick={() => {
                setActiveRegion(r.id);
                setSelected(null);
              }}
            />
          ))}
        </div>
      </motion.div>

      <div
        className="px-6 pb-10"
        style={{ paddingRight: selected ? "calc(1.5rem + 320px)" : "1.5rem", transition: "padding-right 0.3s ease" }}
      >
        <motion.div
          layout
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((champ, i) => (
              <ChampionAvatar
                key={champ.id}
                champ={champ}
                index={i}
                selected={selected?.id === champ.id}
                onClick={() =>
                  setSelected((prev) =>
                    prev?.id === champ.id ? null : champ
                  )
                }
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, rgba(10,10,15,0.6) 0%, transparent 40%)",
            }}
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
            transition={{ type: "tween", duration: 0.26, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full z-30 overflow-y-auto"
            style={{
              width: 300,
              borderLeft: "1px solid #785A28",
              background:
                "linear-gradient(160deg, hsl(220 20% 13% / 0.99), hsl(220 20% 7% / 1))",
            }}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded text-xs font-bold transition-opacity hover:opacity-70"
              style={{
                color: "#C89B3C",
                backgroundColor: "rgba(0,0,0,0.6)",
                border: "1px solid #785A28",
              }}
            >
              ✕
            </button>

            <div className="relative h-52 overflow-hidden flex-shrink-0">
              <img
                src={`${DD_SPLASH}/${selected.id}_0.jpg`}
                alt={selected.name}
                className="w-full h-full object-cover object-top"
                style={{ filter: "brightness(0.65) saturate(0.85)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 25%, hsl(220 20% 10%) 100%)",
                }}
              />
              <div className="absolute bottom-3 left-4 right-10">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: selected.regionColor }}
                  />
                  <span
                    className="text-[9px] lg:text-xs tracking-[0.3em] uppercase font-bold"
                    style={{ color: selected.regionColor }}
                  >
                    {selected.regionName}
                  </span>
                </div>
                <h2
                  className="text-xl font-bold tracking-widest uppercase leading-none"
                  style={{ color: "#F0E6D3" }}
                >
                  {selected.name}
                </h2>
                <div
                  className="h-px mt-2"
                  style={{
                    background: `linear-gradient(to right, ${selected.regionColor}90, transparent)`,
                  }}
                />
              </div>
            </div>

            <div className="p-4 flex flex-col gap-5">
              <div className="flex justify-center">
                <div
                  className="w-24 h-24 overflow-hidden rounded"
                  style={{
                    border: `2px solid ${selected.regionColor}60`,
                    boxShadow: `0 0 20px ${selected.regionColor}25`,
                  }}
                >
                  <img
                    src={`${DD}/${selected.id}.png`}
                    alt={selected.name}
                    className="w-full h-full object-cover scale-110"
                  />
                </div>
              </div>

              <div
                className="h-px"
                style={{
                  background:
                    "linear-gradient(to right, #785A28 20%, transparent)",
                }}
              />

              <div>
                <p
                  className="text-[10px] lg:text-sm tracking-[0.3em] uppercase font-bold mb-3"
                  style={{ color: "#C89B3C" }}
                >
                  De {selected.regionName}
                </p>
                <div className="flex flex-wrap gap-2">
                  {regionPeers.map((peer, i) => (
                    <motion.button
                      key={peer.id}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelected(peer)}
                      className="flex flex-col items-center gap-1 group"
                    >
                      <PeerPortrait peer={peer} />
                      <span
                        className="text-[8px] tracking-wide"
                        style={{ color: "#4a4a4a" }}
                      >
                        {peer.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div
                className="h-px"
                style={{
                  background:
                    "linear-gradient(to right, #785A28 20%, transparent)",
                }}
              />

              <button
                onClick={() => navigate("/runeterra")}
                className="w-full py-2.5 rounded text-[10px] lg:text-sm tracking-widest uppercase font-bold transition-opacity hover:opacity-75"
                style={{
                  border: `1px solid ${selected.regionColor}50`,
                  color: selected.regionColor,
                  backgroundColor: `${selected.regionColor}0d`,
                }}
              >
                Explorar {selected.regionName} en el mapa →
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterTab({
  label,
  color,
  active,
  onClick,
}: {
  label: string;
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 px-3 py-1.5 rounded text-[9px] lg:text-xs tracking-[0.2em] uppercase font-bold transition-all duration-200 cursor-pointer"
      style={{
        border: `1px solid ${active ? color : "#2a2a2a"}`,
        backgroundColor: active ? `${color}18` : "transparent",
        color: active ? color : "#3a3a3a",
      }}
    >
      {label}
    </button>
  );
}

function ChampionAvatar({
  champ,
  index,
  selected,
  onClick,
}: {
  champ: ExplorerChampion;
  index: number;
  selected: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.4) }}
      className="flex flex-col items-center gap-1 cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative overflow-hidden rounded"
        style={{
          width: 64,
          height: 64,
          border: `1px solid ${
            selected
              ? champ.regionColor
              : hovered
              ? `${champ.regionColor}80`
              : "#2a2a2a"
          }`,
          boxShadow: selected
            ? `0 0 14px ${champ.regionColor}50`
            : hovered
            ? `0 0 8px ${champ.regionColor}30`
            : "none",
          transition: "border-color 0.18s, box-shadow 0.18s",
        }}
      >
        <img
          src={`${DD}/${champ.id}.png`}
          alt={champ.name}
          className="w-full h-full object-cover"
          style={{
            transform: hovered || selected ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.2s",
            filter: selected ? "brightness(1.1)" : "brightness(0.85)",
          }}
        />
        {selected && (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${champ.regionColor}18, transparent)`,
            }}
          />
        )}
      </div>
      <span
        className="text-[8px] tracking-wide text-center leading-tight w-full truncate"
        style={{
          color: selected ? champ.regionColor : hovered ? "#A0937D" : "#3a3a3a",
          transition: "color 0.18s",
          maxWidth: 64,
        }}
      >
        {champ.name}
      </span>
    </motion.div>
  );
}

function PeerPortrait({ peer }: { peer: ExplorerChampion }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="w-12 h-12 overflow-hidden rounded"
      style={{
        border: `1px solid ${hovered ? peer.regionColor : "#785A28"}`,
        boxShadow: hovered ? `0 0 8px ${peer.regionColor}40` : "none",
        transition: "border-color 0.18s, box-shadow 0.18s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={`${DD}/${peer.id}.png`}
        alt={peer.name}
        className="w-full h-full object-cover"
        style={{
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.2s",
        }}
      />
    </div>
  );
}
