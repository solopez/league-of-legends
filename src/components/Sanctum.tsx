import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Secret {
  glyph: string;
  title: string;
  text: string;
  color: string;
}

const SECRETS: Secret[] = [
  {
    glyph: "◈",
    title: "Los Vigilantes",
    text: "Los Vigilantes no fueron derrotados. Fueron sellados. El hielo del Freljord es su prisión — y esa prisión se derrite con cada generación que pasa. Lissandra lo sabe. Y no dice nada.",
    color: "#4fc3f7",
  },
  {
    glyph: "❄",
    title: "El Precio",
    text: "Lissandra miente sobre el precio que pagó. La verdad es más oscura: traicionó a su pueblo no solo para salvar el mundo, sino porque los Vigilantes le prometieron algo a cambio. Algo que todavía espera cobrar.",
    color: "#ba68c8",
  },
  {
    glyph: "ᚱ",
    title: "La Memoria de Ryze",
    text: "Ryze ha visto caer tres civilizaciones. Lleva las cicatrices de cada una en su piel, tatuadas con las runas que destruyeron todo. No duerme. Porque cada vez que cierra los ojos, ve la próxima.",
    color: "#7986cb",
  },
  {
    glyph: "☽",
    title: "La Naturaleza del Vacío",
    text: "El Vacío no tiene voluntad. No tiene dios. No tiene propósito. Solo tiene hambre. Y esa hambre lleva milenios creciendo sin saciarse — porque nada de lo que devora lo satisface. Ni un mundo entero sería suficiente.",
    color: "#ba68c8",
  },
  {
    glyph: "⛓",
    title: "La Colección de Thresh",
    text: "Thresh no colecciona almas por necesidad ni por poder. Las almas que encierra en su linterna no le dan nada que no pudiera obtener de otra forma. Las colecciona por el único placer que le queda: saber que sus dueños no pueden descansar.",
    color: "#66bb6a",
  },
  {
    glyph: "☀",
    title: "El Retorno de Azir",
    text: "Azir reconstruye Shurima con la certeza de que puede redimir lo que destruyó. Pero Shurima no recuerda a sus dioses. Tres mil años de arena borraron todo. Y puede que sea mejor así — porque los dioses que Shurima adoraba no eran benevolentes.",
    color: "#ffa726",
  },
  {
    glyph: "✦",
    title: "Lo que Queda",
    text: "El Nexus que encontraste no es el Nexus que existe. Es solo la entrada — la parte visible de algo mucho más antiguo. Lo que hay más adentro no tiene nombre todavía. Pero ya sabe que estás acá.",
    color: "#C89B3C",
  },
];

export default function Sanctum() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [finished, setFinished] = useState(false);

  const secret = SECRETS[index];

  const goNext = () => {
    if (index + 1 >= SECRETS.length) {
      setFinished(true);
    } else {
      setDirection(1);
      setIndex((i) => i + 1);
    }
  };

  const goPrev = () => {
    if (index > 0) {
      setDirection(-1);
      setIndex((i) => i - 1);
    }
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            `radial-gradient(ellipse 55% 45% at 50% 40%, ${secret.color}08 0%, transparent 65%)`,
            "radial-gradient(ellipse 100% 50% at 50% 100%, rgba(0,0,0,0.8) 0%, transparent 60%)",
          ].join(", "),
          transition: "background 1.2s ease",
        }}
      />

      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-6 text-[10px] lg:text-sm tracking-[0.3em] uppercase opacity-25 hover:opacity-55 transition-opacity z-20"
        style={{ color: "#C89B3C" }}
      >
        ← El Nexus
      </button>

      <div className="absolute top-5 right-6 flex gap-1.5 z-20">
        {SECRETS.map((_, i) => (
          <div
            key={i}
            className="w-4 h-0.5 rounded-full transition-all duration-500"
            style={{
              backgroundColor:
                i < index ? "#C89B3C" : i === index ? "#F0E6D3" : "#1a1a1a",
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        {!finished ? (
          <motion.div
            key={index}
            custom={direction}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 40 }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, x: d * -40 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="flex flex-col items-center gap-8 px-10 max-w-lg text-center"
          >
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                textShadow: [
                  `0 0 8px ${secret.color}30`,
                  `0 0 24px ${secret.color}80`,
                  `0 0 8px ${secret.color}30`,
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: secret.color, fontSize: 36, lineHeight: 1 }}
            >
              {secret.glyph}
            </motion.div>

            <div className="flex flex-col items-center gap-2">
              <div
                className="h-px w-24"
                style={{
                  background: `linear-gradient(to right, transparent, ${secret.color}60, transparent)`,
                }}
              />
              <h2
                className="text-lg font-bold tracking-[0.35em] uppercase"
                style={{ color: secret.color }}
              >
                {secret.title}
              </h2>
              <div
                className="text-[9px] lg:text-xs tracking-[0.4em] uppercase"
                style={{ color: "#2a2a2a" }}
              >
                {index + 1} / {SECRETS.length}
              </div>
            </div>

            <p
              className="text-sm lg:text-lg leading-[1.9] italic"
              style={{ color: "#7a6a5a" }}
            >
              &ldquo;{secret.text}&rdquo;
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-7 px-10 max-w-md text-center"
          >
            <motion.span
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ color: "#C89B3C", fontSize: 28 }}
            >
              ◈
            </motion.span>
            <div className="flex flex-col gap-3">
              <h2
                className="text-lg font-bold tracking-[0.4em] uppercase"
                style={{ color: "#F0E6D3" }}
              >
                El Sanctum ha hablado
              </h2>
              <p className="text-sm lg:text-base italic leading-relaxed" style={{ color: "#4a3a2a" }}>
                &ldquo;Lo que sabés ahora no puede olvidarse. Pero hay más verdades esperando — en los rincones del mundo que todavía no visitaste.&rdquo;
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="px-7 py-3 rounded text-xs font-bold tracking-widest uppercase transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#C89B3C", color: "#0A0A0F" }}
            >
              Volver al Nexus
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!finished && (
        <div className="absolute bottom-10 flex items-center gap-8">
          <motion.button
            onClick={goPrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center rounded transition-all"
            style={{
              border: `1px solid ${index > 0 ? "#785A28" : "#1a1a1a"}`,
              color: index > 0 ? "#C89B3C" : "#1a1a1a",
              backgroundColor: "transparent",
            }}
            disabled={index === 0}
          >
            ‹
          </motion.button>

          <div className="flex gap-1.5">
            {SECRETS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === index ? "#C89B3C" : "#2a2a2a",
                  transform: i === index ? "scale(1.4)" : "scale(1)",
                }}
              />
            ))}
          </div>

          <motion.button
            onClick={goNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center rounded"
            style={{
              border: "1px solid #785A28",
              color: "#C89B3C",
              backgroundColor: "transparent",
            }}
          >
            ›
          </motion.button>
        </div>
      )}
    </div>
  );
}
