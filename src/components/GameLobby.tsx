import { Info, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import lobbyBg from "../assets/lobby-bg.png";
import PlayerSlots from "./PlayerSlots";

const PLAYERS = [
  {
    nick: "soldrums",
    description: "La Criofénix",
    modelSource: "/league-of-legends/models/missfortune.glb",
    splashId: "MissFortune",
  },
  {
    nick: "JustLuisa",
    description: "La arquera de hielo",
    modelSource: "/league-of-legends/models/ashe.glb",
    splashId: "Ashe",
  },
];

export default function GameLobby() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col" style={{ backgroundColor: "#0A0A0F" }}>
      <img
        src={lobbyBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.45 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,15,0.55) 0%, rgba(10,10,15,0.3) 40%, rgba(10,10,15,0.75) 100%)",
        }}
      />

      <div
        className="relative z-10 flex items-center justify-between px-6 py-3.5 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(120,90,40,0.2)" }}
      >
        <button
          onClick={() => navigate("/")}
          className="text-[10px] tracking-[0.3em] uppercase opacity-35 hover:opacity-65 transition-opacity"
          style={{ color: "#C89B3C" }}
        >
          ← El Nexus
        </button>
        <div className="flex items-center gap-2">
          <Timer className="w-3.5 h-3.5" style={{ color: "#785A28" }} />
          <span
            className="text-[10px] tracking-[0.25em] uppercase"
            style={{ color: "#785A28" }}
          >
            GI · URFAR · Aleatorio
          </span>
          <Info className="w-3.5 h-3.5 cursor-pointer opacity-30 hover:opacity-60 transition-opacity ml-1" style={{ color: "#C89B3C" }} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 flex flex-col items-center gap-1 pt-5 pb-2 flex-shrink-0"
      >
        <div className="flex items-center gap-3">
          <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #C89B3C)" }} />
          <span style={{ color: "#C89B3C", fontSize: 10 }}>✦</span>
          <h1 className="text-xl font-bold tracking-[0.35em] uppercase" style={{ color: "#F0E6D3" }}>
            El Lobby
          </h1>
          <span style={{ color: "#C89B3C", fontSize: 10 }}>✦</span>
          <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #C89B3C)" }} />
        </div>
        <p className="text-[9px] tracking-[0.35em] uppercase" style={{ color: "#3a3a3a" }}>
          Preparate para la batalla
        </p>
      </motion.div>

      <div className="relative z-10 flex-1 flex flex-col justify-center min-h-0">
        <PlayerSlots players={PLAYERS} />
      </div>
    </div>
  );
}
