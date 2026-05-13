import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DD, DD_SPLASH } from "../constants/cdn";
import EVENTS from "../data/timeline";
import type { TimelineEvent } from "../data/timeline";
import { markVisited } from "../utils/visited";

export default function LoreTimeline() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<TimelineEvent | null>(null);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { markVisited("lore"); }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setProgress(scrollLeft / (scrollWidth - clientWidth));
  };

  const scrollBy = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden select-none" style={{ backgroundColor: "#0A0A0F" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 50% 40% at 20% 50%, rgba(200,155,60,0.05) 0%, transparent 100%)",
            "radial-gradient(ellipse 40% 40% at 80% 50%, rgba(120,90,40,0.04) 0%, transparent 100%)",
          ].join(", "),
        }}
      />

      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-6 z-20 text-[10px] tracking-[0.3em] uppercase opacity-35 hover:opacity-65 transition-opacity"
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
            Lore de Runeterra
          </h1>
          <span style={{ color: "#C89B3C", fontSize: 10 }}>✦</span>
          <div className="h-px w-20" style={{ background: "linear-gradient(to left, transparent, #C89B3C)" }} />
        </div>
        <p className="text-[10px] tracking-[0.35em] uppercase" style={{ color: "#4a4a4a" }}>
          La historia del mundo — desde el origen hasta el presente
        </p>
      </motion.div>

      <button
        onClick={() => scrollBy("left")}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded transition-opacity hover:opacity-100 opacity-50"
        style={{ backgroundColor: "rgba(0,0,0,0.7)", border: "1px solid #785A28", color: "#C89B3C" }}
      >
        ‹
      </button>
      <button
        onClick={() => scrollBy("right")}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded transition-opacity hover:opacity-100 opacity-50"
        style={{ backgroundColor: "rgba(0,0,0,0.7)", border: "1px solid #785A28", color: "#C89B3C" }}
      >
        ›
      </button>

      <div className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none z-10" style={{ background: "linear-gradient(to right, #0A0A0F, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10" style={{ background: "linear-gradient(to left, #0A0A0F, transparent)" }} />

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="absolute left-0 right-0 overflow-x-auto overflow-y-hidden"
        style={{ top: 80, bottom: 48, scrollbarWidth: "none" }}
      >
        <div
          className="relative h-full flex items-center"
          style={{ width: `${EVENTS.length * 300 + 200}px`, paddingLeft: 100, paddingRight: 100 }}
        >
          <div
            className="absolute left-0 right-0 h-px"
            style={{ top: "50%", background: "linear-gradient(to right, transparent, #785A28 8%, #C89B3C 20%, #C89B3C 80%, #785A28 92%, transparent)" }}
          />

          {EVENTS.map((event, i) => {
            const above = i % 2 === 0;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: above ? -20 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.07, duration: 0.35, ease: "easeOut" }}
                className="relative flex-shrink-0 flex flex-col items-center"
                style={{ width: 280, marginRight: 20 }}
              >
                {above ? (
                  <>
                    <EventCard event={event} above={true} onClick={() => setSelected(event)} />
                    <Connector color={event.color} />
                    <TimelineDot color={event.color} />
                    <div style={{ height: "calc(50% - 20px)", minHeight: 180 }} />
                  </>
                ) : (
                  <>
                    <div style={{ height: "calc(50% - 20px)", minHeight: 180 }} />
                    <TimelineDot color={event.color} />
                    <Connector color={event.color} />
                    <EventCard event={event} above={false} onClick={() => setSelected(event)} />
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="absolute left-16 right-16 bottom-4 h-0.5 rounded-full" style={{ backgroundColor: "#1a1a1a" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(to right, #785A28, #C89B3C)", width: `${progress * 100}%` }}
          transition={{ duration: 0.1 }}
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{ backgroundColor: "#C89B3C", boxShadow: "0 0 6px #C89B3C", left: `${progress * 100}%`, transform: "translate(-50%, -50%)" }}
        />
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-30"
              style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed z-40 overflow-y-auto"
              style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "min(600px, 92vw)", maxHeight: "85vh", border: "1px solid #785A28", background: "linear-gradient(160deg, hsl(220 20% 13% / 0.99), hsl(220 20% 7% / 1))", borderRadius: 4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded text-xs font-bold transition-opacity hover:opacity-70"
                style={{ color: "#C89B3C", backgroundColor: "rgba(0,0,0,0.6)", border: "1px solid #785A28" }}
              >
                ✕
              </button>
              <div className="relative h-52 overflow-hidden flex-shrink-0">
                <img src={`${DD_SPLASH}/${selected.splash}_0.jpg`} alt={selected.title} className="w-full h-full object-cover object-top" style={{ filter: "brightness(0.6) saturate(0.8)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 20%, hsl(220 20% 10%) 100%)" }} />
                <div className="absolute bottom-4 left-5 right-12">
                  <p className="text-[10px] tracking-[0.3em] uppercase font-bold mb-1" style={{ color: selected.color }}>
                    {selected.era} · {selected.year}
                  </p>
                  <h2 className="text-xl font-bold tracking-wide uppercase leading-tight" style={{ color: "#F0E6D3" }}>
                    {selected.title}
                  </h2>
                  <div className="h-px mt-2" style={{ background: `linear-gradient(to right, ${selected.color}90, transparent)` }} />
                </div>
              </div>
              <div className="p-5 flex flex-col gap-4">
                <p className="text-sm leading-relaxed" style={{ color: "#A0937D" }}>{selected.fullDesc}</p>
                <div className="h-px" style={{ background: "linear-gradient(to right, #785A28 20%, transparent)" }} />
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase font-bold mb-3" style={{ color: "#C89B3C" }}>Campeones relacionados</p>
                  <div className="flex gap-3 flex-wrap">
                    {selected.champions.map((champ, i) => (
                      <motion.div key={champ.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="flex flex-col items-center gap-1">
                        <ModalPortrait id={champ.id} name={champ.name} baseUrl={DD} accentColor={selected.color} />
                        <span className="text-[9px] tracking-wide" style={{ color: "#5a5a5a" }}>{champ.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function EventCard({ event, above, onClick }: { event: TimelineEvent; above: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="w-full cursor-pointer overflow-hidden rounded"
      style={{ border: `1px solid ${hovered ? event.color : "#785A28"}`, boxShadow: hovered ? `0 0 16px ${event.color}30` : "0 4px 16px rgba(0,0,0,0.5)", background: "linear-gradient(160deg, hsl(220 20% 13%), hsl(220 20% 8%))", transition: "border-color 0.2s, box-shadow 0.2s" }}
      animate={{ y: hovered ? (above ? -5 : 5) : 0 }}
      transition={{ duration: 0.18 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className="relative h-28 overflow-hidden">
        <img src={`${DD_SPLASH}/${event.splash}_0.jpg`} alt={event.title} className="w-full h-full object-cover object-top" style={{ filter: `brightness(${hovered ? 0.75 : 0.55}) saturate(0.8)`, transition: "filter 0.2s" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, hsl(220 20% 10%) 100%)" }} />
        <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: event.color }} />
          <span className="text-[9px] tracking-[0.25em] uppercase font-bold" style={{ color: event.color }}>{event.era}</span>
        </div>
      </div>
      <div className="p-3 flex flex-col gap-1.5">
        <h3 className="text-xs font-bold tracking-wide uppercase leading-tight" style={{ color: "#F0E6D3" }}>{event.title}</h3>
        <p className="text-[10px] leading-relaxed" style={{ color: "#6a6a6a" }}>{event.shortDesc}</p>
        <p className="text-[9px] tracking-widest uppercase mt-1 transition-colors duration-200" style={{ color: hovered ? event.color : "#3a3a3a" }}>Leer más →</p>
      </div>
    </motion.div>
  );
}

function Connector({ color }: { color: string }) {
  return <div style={{ width: 1, height: 28, background: `linear-gradient(to bottom, ${color}80, ${color}20)` }} />;
}

function TimelineDot({ color }: { color: string }) {
  return (
    <div
      className="rounded-full border-2 flex-shrink-0"
      style={{ width: 12, height: 12, borderColor: color, backgroundColor: color + "22", boxShadow: `0 0 8px ${color}60` }}
    />
  );
}

function ModalPortrait({ id, name, baseUrl, accentColor }: { id: string; name: string; baseUrl: string; accentColor: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="w-16 h-16 overflow-hidden rounded"
      style={{ border: `1px solid ${hovered ? accentColor : "#785A28"}`, boxShadow: hovered ? `0 0 10px ${accentColor}40` : "0 2px 8px rgba(0,0,0,0.5)", transition: "border-color 0.2s, box-shadow 0.2s" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={name}
    >
      <img src={`${baseUrl}/${id}.png`} alt={name} className="w-full h-full object-cover" style={{ transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.2s" }} />
    </div>
  );
}
