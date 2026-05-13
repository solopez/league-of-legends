import { Crown } from "lucide-react";
import { useState } from "react";
import { DD_SPLASH } from "../constants/cdn";
import Model3D from "./Model3D";

interface PlayerCardProps {
  nick: string;
  description: string;
  modelSource: string;
  splashId: string;
}

export default function PlayerCard({ nick, description, modelSource, splashId }: PlayerCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded flex flex-col flex-shrink-0"
      style={{
        width: "clamp(180px, 20vw, 260px)",
        minHeight: "clamp(280px, 40vh, 440px)",
        border: `1px solid ${hovered ? "#C89B3C" : "#785A28"}`,
        boxShadow: hovered
          ? "0 0 28px rgba(200,155,60,0.22)"
          : "0 4px 24px rgba(0,0,0,0.65)",
        background: "hsl(220 20% 9%)",
        transition: "border-color 0.22s, box-shadow 0.22s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={`${DD_SPLASH}/${splashId}_0.jpg`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
        style={{
          filter: hovered
            ? "brightness(0.45) saturate(0.75)"
            : "brightness(0.3) saturate(0.6)",
          transition: "filter 0.3s",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 20%, rgba(10,10,15,0.85) 100%)",
        }}
      />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-0.5"
        style={{
          background: `linear-gradient(to right, transparent, ${hovered ? "#C89B3C" : "#785A28"}, transparent)`,
          transition: "background 0.22s",
        }}
      />

      <div className="hidden lg:flex relative z-10 flex-1 items-end justify-center pb-2">
        <Model3D
          src={modelSource}
          width="220px"
          height="240px"
          animationName="Dance"
          orbit="0 90deg 0"
          position="50deg 50deg 1m"
        />
      </div>

      <div className="lg:hidden flex-1" style={{ minHeight: 60 }} />

      <div className="relative z-10 px-5 pb-5 pt-3 flex flex-col gap-1.5">
        <div
          className="h-px w-full mb-1"
          style={{
            background: `linear-gradient(to right, ${hovered ? "#C89B3C50" : "#785A2840"}, transparent)`,
            transition: "background 0.22s",
          }}
        />
        <div className="flex items-center gap-2">
          <Crown className="w-3 h-3 flex-shrink-0" style={{ color: "#C89B3C" }} />
          <span
            className="text-sm font-bold tracking-widest uppercase truncate"
            style={{ color: "#F0E6D3" }}
          >
            {nick}
          </span>
        </div>
        <span className="text-[11px] tracking-wide" style={{ color: "#6a5a4a" }}>
          {description}
        </span>
        <div className="flex items-center gap-1.5 mt-2">
          <div
            className="flex-1 h-px"
            style={{
              background: `linear-gradient(to right, transparent, ${hovered ? "#C89B3C50" : "#785A2840"})`,
              transition: "background 0.22s",
            }}
          />
          <div
            className="w-1.5 h-1.5 rotate-45 flex-shrink-0"
            style={{ backgroundColor: hovered ? "#C89B3C" : "#785A28", transition: "background-color 0.22s" }}
          />
          <div
            className="flex-1 h-px"
            style={{
              background: `linear-gradient(to left, transparent, ${hovered ? "#C89B3C50" : "#785A2840"})`,
              transition: "background 0.22s",
            }}
          />
        </div>
      </div>
    </div>
  );
}
