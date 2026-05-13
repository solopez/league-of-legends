import { motion } from "framer-motion";
import gameMap from "../assets/map.png";

export default function Loading() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      <img
        src={gameMap}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.12 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,155,60,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "#C89B3C", fontSize: 32 }}
        >
          ✦
        </motion.div>

        <div className="flex flex-col items-center gap-2">
          <span
            className="text-xs font-bold tracking-[0.45em] uppercase"
            style={{ color: "#C89B3C" }}
          >
            Buscando Partida
          </span>
          <span
            className="text-[9px] tracking-[0.3em] uppercase"
            style={{ color: "#3a3a3a" }}
          >
            Preparando el Nexus...
          </span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div
            className="w-56 h-0.5 rounded-full overflow-hidden"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.9, ease: "easeInOut" }}
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(to right, #785A28, #C89B3C)",
              }}
            />
          </div>
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="flex gap-1.5"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: "#C89B3C" }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
