import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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
          className="text-3xl font-bold tracking-[0.55em] uppercase"
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

      <div className="flex flex-col items-center w-full max-w-xl px-6 gap-0.5">
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
        className="absolute bottom-4 text-[9px] tracking-[0.2em] uppercase"
        style={{ color: "#1a1a1a" }}
      >
        Fan-made · No afiliado con Riot Games
      </motion.p>
    </div>
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
      className="relative w-full flex items-center gap-3 py-3.5 px-5 rounded cursor-pointer"
      style={{
        background: hovered ? `${prophecy.color}0a` : "transparent",
        transition: "background 0.22s",
      }}
    >
      <div className="w-3 flex-shrink-0 flex justify-center">
        <motion.div
          animate={{ opacity: visited ? 1 : 0 }}
          className="w-1 h-1 rounded-full"
          style={{ backgroundColor: `${prophecy.color}70` }}
        />
      </div>

      <motion.span
        animate={{
          color: hovered ? "#F0E6D3" : prophecy.special ? "#ba68c870" : "#C89B3C55",
        }}
        transition={{ duration: 0.18 }}
        className="flex-1 text-center text-sm tracking-wide select-none"
        style={{ fontStyle: "italic" }}
      >
        {prophecy.special && (
          <span style={{ color: "#ba68c860", marginRight: 8, fontSize: 9 }}>
            ◈
          </span>
        )}
        &ldquo;{prophecy.text}&rdquo;
      </motion.span>

      <div className="w-32 flex-shrink-0 flex justify-end">
        <AnimatePresence>
          {hovered && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.15 }}
              className="text-[9px] tracking-[0.22em] uppercase font-bold whitespace-nowrap"
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
