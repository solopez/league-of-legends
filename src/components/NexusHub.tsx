import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface Section {
  id: string;
  route: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  splash: string;       // ddragon splash URL — loads fine in-browser
  accent: string;
  overlayFrom: string;  // dark gradient color for text legibility
}

const SECTIONS: Section[] = [
  {
    id: "patch",
    route: "/patch",
    eyebrow: "Parche actual · Live",
    title: "Nuevas Skins",
    subtitle:
      "Catálogo completo de skins recién llegadas. Rarezas, ediciones limitadas y los diseños que acaban de aterrizar en Runeterra.",
    cta: "Ver skins",
    splash: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg",
    accent: "#C89B3C",
    overlayFrom: "rgba(30,15,0,0.82)",
  },
  {
    id: "runeterra",
    route: "/runeterra",
    eyebrow: "Exploración",
    title: "Mapa de Runeterra",
    subtitle:
      "Un continente forjado por magia y guerra. Descubrí cada región, sus secretos y los campeones que las habitan.",
    cta: "Explorar mapa",
    splash: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg",
    accent: "#4fc3f7",
    overlayFrom: "rgba(0,15,30,0.82)",
  },
  {
    id: "lore",
    route: "/lore",
    eyebrow: "Historia",
    title: "Línea del Tiempo",
    subtitle:
      "Desde la fundación de Demacia hasta la Ruina. La historia de Runeterra contada en orden cronológico.",
    cta: "Ver historia",
    splash: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Thresh_0.jpg",
    accent: "#ce93d8",
    overlayFrom: "rgba(15,0,30,0.85)",
  },
  {
    id: "champions",
    route: "/champions",
    eyebrow: "Campeones",
    title: "Los Campeones",
    subtitle:
      "Más de 160 campeones esperan ser descubiertos. Explorá habilidades, lore y estadísticas de cada uno.",
    cta: "Ver campeones",
    splash: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg",
    accent: "#ef5350",
    overlayFrom: "rgba(30,0,0,0.82)",
  },
  {
    id: "lobby",
    route: "/lobby",
    eyebrow: "Partida",
    title: "El Lobby",
    subtitle:
      "Elegí tu campeón, definí tu rol y prepará tu estrategia. La batalla empieza antes de la primera oleada.",
    cta: "Ir al lobby",
    splash: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/LeeSin_0.jpg",
    accent: "#66bb6a",
    overlayFrom: "rgba(0,20,0,0.82)",
  },
];

export default function NexusHub() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [currentPatch, setCurrentPatch] = useState<string | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    fetch("https://ddragon.leagueoflegends.com/api/versions.json")
      .then((r) => r.json())
      .then((v: string[]) => {
        const major = v.find((x) => /^\d+\.\d+\.1$/.test(x));
        if (major) setCurrentPatch(major.split(".").slice(0, 2).join("."));
      })
      .catch(() => {});
  }, []);

  // Preload all splash images
  useEffect(() => {
    SECTIONS.forEach((s, i) => {
      const img = new Image();
      img.onload = () => setImagesLoaded((prev) => ({ ...prev, [i]: true }));
      img.src = s.splash;
    });
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      if (idx === active) return;
      setDirection(idx > active ? 1 : -1);
      setPrev(active);
      setActive(idx);
    },
    [active]
  );

  const goNext = () => goTo((active + 1) % SECTIONS.length);
  const goPrev = () => goTo((active - 1 + SECTIONS.length) % SECTIONS.length);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active]);

  const section = SECTIONS[active];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">

      {/* ── BACKGROUND LAYERS ─────────────────────────────── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`bg-${active}`}
          initial={{ opacity: 0, scale: 1.06, x: direction * 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${section.splash})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
            // Fallback color while image loads
            backgroundColor: "#0a0a0f",
          }}
        />
      </AnimatePresence>

      {/* Gradient overlays for legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, ${section.overlayFrom} 0%, rgba(0,0,0,0.3) 60%, transparent 100%),
            linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)
          `,
          transition: "background 0.6s ease",
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* ── HEADER ────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 lg:px-14 pt-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <h1
            className="text-xl lg:text-2xl font-bold tracking-[0.5em] uppercase"
            style={{ color: "#F0E6D3", textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
          >
            El Nexus
          </h1>
          <span
            className="text-[9px] tracking-[0.35em] uppercase mt-0.5"
            style={{ color: "rgba(200,155,60,0.6)" }}
          >
            Fan-made · No afiliado con Riot Games
          </span>
        </motion.div>

        {currentPatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded"
            style={{
              border: "1px solid rgba(200,155,60,0.4)",
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(8px)",
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#C89B3C" }}
            />
            <span
              className="text-[10px] font-medium tracking-[0.25em] uppercase"
              style={{ color: "#C89B3C" }}
            >
              Parche {currentPatch}
            </span>
          </motion.div>
        )}
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      {/* Positioned in the lower-middle third, well above the bottom nav */}
      <div
        className="absolute z-10 px-8 lg:px-14 pointer-events-none"
        style={{ bottom: "22vh", left: 0, right: 0 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${active}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="max-w-xl pointer-events-auto"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-px w-8"
                style={{ backgroundColor: section.accent }}
              />
              <span
                className="text-[11px] font-medium tracking-[0.3em] uppercase"
                style={{ color: section.accent }}
              >
                {section.eyebrow}
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-bold leading-none mb-5 tracking-tight"
              style={{
                fontSize: "clamp(42px, 7vw, 80px)",
                color: "#F0E6D3",
                textShadow: "0 4px 24px rgba(0,0,0,0.7)",
              }}
            >
              {section.title}
            </h2>

            {/* Subtitle */}
            <p
              className="text-sm lg:text-base leading-relaxed mb-7 max-w-sm"
              style={{
                color: "rgba(240,230,211,0.72)",
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              {section.subtitle}
            </p>

            {/* CTA */}
            <button
              onClick={() => navigate(section.route)}
              className="flex items-center gap-3 px-7 py-3 text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-200 rounded"
              style={{
                background: section.accent,
                color: "#0a0a0f",
                border: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              {section.cta}
              <span style={{ fontSize: 16 }}>→</span>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── BOTTOM CONTROLS ───────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between px-8 lg:px-14 pb-6">

        {/* Section tabs */}
        <div className="flex flex-col gap-2">
          {SECTIONS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => goTo(idx)}
              className="flex items-center gap-3 group transition-all duration-200"
            >
              {/* Active bar */}
              <motion.div
                animate={{
                  width: idx === active ? 32 : 12,
                  opacity: idx === active ? 1 : 0.35,
                }}
                transition={{ duration: 0.3 }}
                className="h-px"
                style={{ backgroundColor: idx === active ? s.accent : "#F0E6D3" }}
              />
              <span
                className="text-[10px] lg:text-xs font-medium tracking-[0.2em] uppercase transition-all duration-200"
                style={{
                  color:
                    idx === active
                      ? s.accent
                      : "rgba(240,230,211,0.35)",
                }}
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>

        {/* Prev / Next arrows */}
        <div className="flex gap-3 items-center">
          <NavArrow onClick={goPrev} label="Anterior" dir="left" accent={section.accent} />
          <NavArrow onClick={goNext} label="Siguiente" dir="right" accent={section.accent} />
        </div>
      </div>

      {/* ── SECTION INDEX (top right) ─────────────────────── */}
      <div
        className="absolute top-20 right-8 lg:right-14 z-20 text-right"
        style={{ color: "rgba(240,230,211,0.25)" }}
      >
        <span className="text-4xl font-bold" style={{ letterSpacing: "-0.02em" }}>
          0{active + 1}
        </span>
        <span className="text-lg"> / 0{SECTIONS.length}</span>
      </div>
    </div>
  );
}

function NavArrow({
  onClick,
  label,
  dir,
  accent,
}: {
  onClick: () => void;
  label: string;
  dir: "left" | "right";
  accent: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center rounded transition-all duration-200"
      style={{
        border: hovered ? `1px solid ${accent}` : "1px solid rgba(240,230,211,0.2)",
        background: hovered ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.25)",
        color: hovered ? accent : "rgba(240,230,211,0.6)",
        fontSize: 18,
        backdropFilter: "blur(4px)",
      }}
    >
      {dir === "left" ? "‹" : "›"}
    </button>
  );
}
