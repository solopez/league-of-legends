import { motion } from "framer-motion";
import { DD, DD_SPLASH } from "../constants/cdn";

interface ChampionCardProps {
  ddId: string;
  name: string;
  selected: boolean;
  onClick: () => void;
  index: number;
}

export default function ChampionCard({ ddId, name, selected, onClick, index }: ChampionCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.35 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="relative overflow-hidden rounded cursor-pointer flex-shrink-0 w-full"
      style={{
        height: 88,
        border: `1px solid ${selected ? "#C89B3C" : "#2a2a2a"}`,
        boxShadow: selected ? "0 0 20px rgba(200,155,60,0.3)" : "none",
        background: "hsl(220 20% 9%)",
        transition: "border-color 0.18s, box-shadow 0.18s",
      }}
    >
      <img
        src={`${DD_SPLASH}/${ddId}_0.jpg`}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
        style={{
          filter: selected ? "brightness(0.55) saturate(0.8)" : "brightness(0.28) saturate(0.5)",
          transition: "filter 0.2s",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: selected
            ? "linear-gradient(to right, rgba(10,10,15,0.2), rgba(10,10,15,0.6))"
            : "linear-gradient(to right, rgba(10,10,15,0.4), rgba(10,10,15,0.75))",
        }}
      />

      {selected && (
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5"
          style={{ background: "linear-gradient(to bottom, transparent, #C89B3C, transparent)" }}
        />
      )}

      <div className="relative z-10 h-full flex items-center gap-3 px-3">
        <div
          className="w-12 h-12 overflow-hidden rounded flex-shrink-0"
          style={{
            border: `1px solid ${selected ? "#C89B3C60" : "#2a2a2a"}`,
            transition: "border-color 0.18s",
          }}
        >
          <img
            src={`${DD}/${ddId}.png`}
            alt={name}
            className="w-full h-full object-cover scale-110"
          />
        </div>
        <span
          className="text-sm lg:text-base font-bold tracking-widest uppercase text-left"
          style={{ color: selected ? "#F0E6D3" : "#5a5a5a", transition: "color 0.18s" }}
        >
          {name}
        </span>
        {selected && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-auto text-[9px] lg:text-xs tracking-widest uppercase"
            style={{ color: "#C89B3C" }}
          >
            ✦
          </motion.span>
        )}
      </div>
    </motion.button>
  );
}
