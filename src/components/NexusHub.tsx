import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVisited, isOraculoUnlocked, isSanctumUnlocked } from "../utils/visited";

interface Prophecy {
  id: string;
  text: string;
  reveal: string;
  route: string;
  color: string;
  special?: boolean;
}

const PROPHECIES: Prophecy[] = [
  {
    id: "runeterra",
    text: "El mundo espera ser descubierto...",
    reveal: "Mapa de Runeterra",
    route: "/runeterra",
    color: "#ffa726",
  },
  {
    id: "lore",
    text: "La historia no muere. Solo se congela.",
    reveal: "Línea del Tiempo",
    route: "/lore",
    color: "#ce93d8",
  },
  {
    id: "champions",
    text: "Los héroes no se eligen. Se revelan.",
    reveal: "Los Campeones",
    route: "/champions",
    color: "#ef5350",
  },
  {
    id: "quiz",
    text: "El que conoce no puede ser vencido.",
    reveal: "Quiz · ¿Quién soy?",
    route: "/quiz",
    color: "#C89B3C",
  },
  {
    id: "lobby",
    text: "La batalla comienza donde todo termina.",
    reveal: "El Lobby",
    route: "/lobby",
    color: "#4fc3f7",
  },
];

const ORACULO_PROPHECY: Prophecy = {
  id: "oraculo",
  text: "Algo antiguo te ha estado observando desde las sombras.",
  reveal: "El Oráculo",
  route: "/oraculo",
  color: "#ba68c8",
  special: true,
};

export default function NexusHub() {
  const navigate = useNavigate();
  const visited = useState(() => getVisited())[0];
  const oraculoUnlocked = useState(() => isOraculoUnlocked())[0];
  const sanctumUnlocked = useState(() => isSanctumUnlocked())[0];
  const [currentPatch, setCurrentPatch] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://ddragon.leagueoflegends.com/api/versions.json")
      .then((r) => r.json())
      .then((v: string[]) => {
        const major = v.find((x) => /^\d+\.\d+\.1$/.test(x));
        if (major) setCurrentPatch(major.split(".").slice(0, 2).join("."));
      })
      .catch(() => {});
  }, []);

  return (
    <div
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 70% 55% at 50% 25%, rgba(200,155,60,0.055) 0%, transparent 65%)",
            "radial-gradient(ellipse 35% 35% at 15% 85%, rgba(120,90,190,0.03) 0%, transparent 100%)",
          ].join(", "),
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center gap-2 mb-14"
      >
        <motion.span
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "#C89B3C", fontSize: 13 }}
        >
          ✦
        </motion.span>
        <h1
          className="text-3xl lg:text-4xl font-bold tracking-[0.55em] uppercase"
          style={{ color: "#F0E6D3" }}
        >
          El Nexus
        </h1>
        <div
          className="h-px w-40 mt-1"
          style={{
            background:
              "linear-gradient(to right, transparent, #785A28 35%, #785A28 65%, transparent)",
          }}
        />
      </motion.div>

      <div className="flex flex-col items-center w-full max-w-xl px-6 gap-3">
        {PROPHECIES.map((p, i) => (
          <ProphecyLine
            key={p.id}
            prophecy={p}
            index={i}
            visited={visited.includes(p.id as "runeterra" | "lore" | "champions" | "quiz")}
            onClick={() => navigate(p.route)}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="w-4/5 h-px my-3"
          style={{
            background:
              "linear-gradient(to right, transparent, #1e1e1e 30%, #1e1e1e 70%, transparent)",
          }}
        />

        <PatchBanner patch={currentPatch} onClick={() => navigate("/patch")} />

        <AnimatePresence>
          {oraculoUnlocked && (
            <motion.div
              key="oraculo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full"
            >
              <ProphecyLine
                prophecy={ORACULO_PROPHECY}
                index={0}
                onClick={() => navigate("/oraculo")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {sanctumUnlocked && (
          <motion.button
            key="sanctum"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 80 }}
            onClick={() => navigate("/sanctum")}
            className="absolute bottom-12"
            title="..."
          >
            <motion.span
              animate={{
                opacity: [0.3, 0.85, 0.3],
                textShadow: [
                  "0 0 6px rgba(200,155,60,0.2)",
                  "0 0 22px rgba(200,155,60,0.75)",
                  "0 0 6px rgba(200,155,60,0.2)",
                ],
              }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: "#C89B3C", fontSize: 26, display: "block" }}
            >
              ◈
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 text-[9px] lg:text-xs tracking-[0.2em] uppercase"
        style={{ color: "#1a1a1a" }}
      >
        Fan-made · No afiliado con Riot Games
      </motion.p>
    </div>
  );
}

function PatchBanner({ patch, onClick }: { patch: string | null; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full flex items-center gap-4 px-5 py-4 rounded cursor-pointer"
      style={{
        border: `1px solid ${hovered ? "#C89B3C" : "#785A2855"}`,
        background: hovered
          ? "linear-gradient(135deg, rgba(200,155,60,0.1) 0%, rgba(200,155,60,0.03) 100%)"
          : "linear-gradient(135deg, rgba(200,155,60,0.06) 0%, rgba(200,155,60,0.01) 100%)",
        transition: "border-color 0.22s, background 0.22s",
      }}
    >
      <div className="relative flex-shrink-0 w-6 h-6 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          className="absolute w-3 h-3 rounded-full"
          style={{ backgroundColor: "#C89B3C" }}
        />
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#C89B3C" }} />
      </div>

      <div className="flex flex-col items-start gap-1 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs lg:text-sm font-bold tracking-[0.35em] uppercase" style={{ color: "#C89B3C" }}>
            {patch ? `Parche ${patch}` : "Parche actual"}
          </span>
          <span
            className="text-[8px] tracking-[0.3em] uppercase px-2 py-px rounded"
            style={{ backgroundColor: "rgba(200,155,60,0.18)", border: "1px solid #C89B3C40", color: "#C89B3C" }}
          >
            live
          </span>
        </div>
        <span className="text-[10px] lg:text-sm tracking-wide" style={{ color: "#5a5060" }}>
          Skins nuevas · Catálogo completo · Rarezas
        </span>
      </div>

      <motion.span
        animate={{ x: hovered ? 5 : 0 }}
        transition={{ duration: 0.15 }}
        className="text-base flex-shrink-0"
        style={{ color: hovered ? "#C89B3C" : "#785A28" }}
      >
        →
      </motion.span>
    </motion.button>
  );
}

function ProphecyLine({
  prophecy,
  index,
  visited = false,
  onClick,
}: {
  prophecy: Prophecy;
  index: number;
  visited?: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.35 + index * 0.13, duration: 0.55 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full flex flex-col items-center gap-2 py-4 px-5 rounded cursor-pointer"
      style={{
        background: hovered ? `${prophecy.color}0a` : "transparent",
        transition: "background 0.22s",
      }}
    >
      {visited && (
        <div
          className="absolute left-5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
          style={{ backgroundColor: `${prophecy.color}70` }}
        />
      )}

      <motion.span
        animate={{
          color: hovered ? "#F0E6D3" : prophecy.special ? "#ba68c870" : "#C89B3C55",
        }}
        transition={{ duration: 0.18 }}
        className="text-center text-sm lg:text-lg tracking-wide select-none"
        style={{ fontStyle: "italic" }}
      >
        {prophecy.special && (
          <span style={{ color: "#ba68c860", marginRight: 8, fontSize: 9 }}>
            ◈
          </span>
        )}
        &ldquo;{prophecy.text}&rdquo;
      </motion.span>

      <div className="h-4 flex items-center justify-center">
        <AnimatePresence>
          {hovered && (
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="text-[9px] lg:text-xs tracking-[0.22em] uppercase font-bold whitespace-nowrap"
              style={{ color: prophecy.color }}
            >
              {prophecy.reveal} →
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
