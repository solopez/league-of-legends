import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DD_SPLASH } from "../constants/cdn";

type Path = "guerrero" | "sabio" | "explorador" | "observador";

interface Answer {
  text: string;
  path: Path;
}

interface Question {
  text: string;
  glyph: string;
  answers: Answer[];
}

const QUESTIONS: Question[] = [
  {
    text: "Antes de entrar a Runeterra, ¿qué harías primero?",
    glyph: "I",
    answers: [
      { text: "Forjar una alianza. El poder se construye con otros.", path: "guerrero" },
      { text: "Estudiar sus crónicas. Conocer antes de actuar.", path: "sabio" },
      { text: "Recorrerla de extremo a extremo. Sin mapa.", path: "explorador" },
      { text: "Observar en silencio hasta entender sus secretos.", path: "observador" },
    ],
  },
  {
    text: "¿Qué fuerza te define por encima de todas las demás?",
    glyph: "II",
    answers: [
      { text: "La voluntad que no se dobla ante nada.", path: "guerrero" },
      { text: "La memoria de lo que otros eligieron olvidar.", path: "sabio" },
      { text: "La curiosidad que ningún muro puede contener.", path: "explorador" },
      { text: "La capacidad de ver lo que permanece oculto.", path: "observador" },
    ],
  },
  {
    text: "Al final del camino, ¿qué dejás atrás?",
    glyph: "III",
    answers: [
      { text: "A los que no tuvieron el coraje de seguirte.", path: "guerrero" },
      { text: "Preguntas que ya no necesitan respuesta.", path: "sabio" },
      { text: "Fronteras que nunca deberían haber existido.", path: "explorador" },
      { text: "El nombre que ya no te pertenece.", path: "observador" },
    ],
  },
];

interface Result {
  path: Path;
  title: string;
  region: string;
  champion: string;
  message: string;
  color: string;
  cta: string;
  route: string;
}

const RESULTS: Record<Path, Result> = {
  guerrero: {
    path: "guerrero",
    title: "El Guerrero",
    region: "Noxus",
    champion: "Darius",
    message:
      "Tu camino es la batalla. En Noxus, el poder se demuestra — no se hereda, no se ruega. Solo existe quien lo toma.",
    color: "#ef5350",
    cta: "Entrar al Lobby",
    route: "/lobby",
  },
  sabio: {
    path: "sabio",
    title: "El Sabio",
    region: "Shurima",
    champion: "Azir",
    message:
      "Tu camino es la memoria. Los imperios caen, pero la sabiduría persiste bajo la arena. Shurima espera a quien sepa leerla.",
    color: "#ffa726",
    cta: "Ver la Historia",
    route: "/lore",
  },
  explorador: {
    path: "explorador",
    title: "El Explorador",
    region: "Freljord",
    champion: "Ashe",
    message:
      "Tu camino es el mundo. Hay tierras que ningún mapa terminó de dibujar, pueblos que ningún rey logró unir. El Freljord te aguarda.",
    color: "#4fc3f7",
    cta: "Explorar el Mapa",
    route: "/runeterra",
  },
  observador: {
    path: "observador",
    title: "El Observador",
    region: "Ionia",
    champion: "Ahri",
    message:
      "Tu camino es el conocimiento de los otros. En Ionia, los secretos florecen entre la niebla. Los héroes no se eligen — se revelan.",
    color: "#ce93d8",
    cta: "Ver los Campeones",
    route: "/champions",
  },
};

export default function Oraculo() {
  const navigate = useNavigate();
  const [qIndex, setQIndex] = useState(0);
  const [scores, setScores] = useState<Record<Path, number>>({
    guerrero: 0,
    sabio: 0,
    explorador: 0,
    observador: 0,
  });
  const [result, setResult] = useState<Result | null>(null);
  const [phase, setPhase] = useState<"intro" | "questions" | "result">("intro");

  const handleAnswer = (path: Path) => {
    const newScores = { ...scores, [path]: scores[path] + 1 };
    setScores(newScores);

    if (qIndex + 1 >= QUESTIONS.length) {
      const winner = (Object.entries(newScores) as [Path, number][]).reduce(
        (a, b) => (b[1] >= a[1] ? b : a)
      )[0];
      setTimeout(() => {
        setResult(RESULTS[winner]);
        setPhase("result");
      }, 300);
    } else {
      setQIndex((i) => i + 1);
    }
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-6 text-[10px] tracking-[0.3em] uppercase opacity-30 hover:opacity-60 transition-opacity z-20"
        style={{ color: "#C89B3C" }}
      >
        ← El Nexus
      </button>

      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-8 px-8 text-center max-w-lg"
          >
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ color: "#ba68c8", fontSize: 32 }}
            >
              ◈
            </motion.div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center gap-3">
                <div
                  className="h-px w-12"
                  style={{ background: "linear-gradient(to right, transparent, #ba68c8)" }}
                />
                <h1
                  className="text-xl font-bold tracking-[0.4em] uppercase"
                  style={{ color: "#F0E6D3" }}
                >
                  El Oráculo
                </h1>
                <div
                  className="h-px w-12"
                  style={{ background: "linear-gradient(to left, transparent, #ba68c8)" }}
                />
              </div>
              <p
                className="text-sm leading-relaxed italic"
                style={{ color: "#6a5a7a" }}
              >
                "Antes de que el mundo tuviera nombre, algo observaba. Responde con
                verdad y el destino que te pertenece se volverá visible."
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setPhase("questions")}
              className="px-8 py-3 rounded text-xs font-bold tracking-widest uppercase"
              style={{
                border: "1px solid #ba68c860",
                color: "#ba68c8",
                backgroundColor: "#ba68c80d",
              }}
            >
              Comenzar
            </motion.button>
          </motion.div>
        )}

        {phase === "questions" && (
          <motion.div
            key={`q-${qIndex}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col items-center gap-10 px-6 w-full max-w-lg"
          >
            <div className="flex gap-2">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-0.5 rounded-full"
                  style={{
                    backgroundColor:
                      i < qIndex ? "#ba68c8" : i === qIndex ? "#F0E6D3" : "#1e1e1e",
                    transition: "background-color 0.3s",
                  }}
                />
              ))}
            </div>

            <div
              className="text-xs tracking-[0.5em] uppercase"
              style={{ color: "#ba68c840" }}
            >
              {QUESTIONS[qIndex].glyph}
            </div>

            <p
              className="text-lg text-center leading-relaxed"
              style={{ color: "#F0E6D3", fontStyle: "italic" }}
            >
              &ldquo;{QUESTIONS[qIndex].text}&rdquo;
            </p>

            <div className="flex flex-col gap-3 w-full">
              {QUESTIONS[qIndex].answers.map((ans, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  whileHover={{ scale: 1.015, borderColor: "#ba68c8" }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleAnswer(ans.path)}
                  className="w-full py-3.5 px-5 rounded text-sm text-left transition-colors cursor-pointer"
                  style={{
                    border: "1px solid #2a2a2a",
                    backgroundColor: "rgba(10,10,15,0.7)",
                    color: "#A0937D",
                  }}
                >
                  {ans.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "result" && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <img
              src={`${DD_SPLASH}/${result.champion}_0.jpg`}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{ filter: "brightness(0.22) saturate(0.6)", transform: "scale(1.04)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.85) 100%)`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 60% 50% at 50% 40%, ${result.color}12 0%, transparent 70%)`,
              }}
            />

            <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center max-w-md">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="text-[10px] tracking-[0.5em] uppercase font-bold"
                  style={{ color: result.color }}
                >
                  El Oráculo ha hablado
                </div>
                <div
                  className="h-px w-32"
                  style={{
                    background: `linear-gradient(to right, transparent, ${result.color}, transparent)`,
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className="text-xs tracking-[0.4em] uppercase"
                  style={{ color: `${result.color}90` }}
                >
                  {result.region}
                </div>
                <h2
                  className="text-4xl font-bold tracking-widest uppercase"
                  style={{ color: "#F0E6D3" }}
                >
                  {result.title}
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
                className="text-sm leading-relaxed italic"
                style={{ color: "#A0937D" }}
              >
                &ldquo;{result.message}&rdquo;
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex gap-3 mt-2"
              >
                <button
                  onClick={() => navigate("/")}
                  className="px-5 py-2.5 rounded text-xs tracking-widest uppercase transition-opacity hover:opacity-70"
                  style={{ border: "1px solid #785A28", color: "#C89B3C", backgroundColor: "transparent" }}
                >
                  ← El Nexus
                </button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate(result.route)}
                  className="px-6 py-2.5 rounded text-xs font-bold tracking-widest uppercase"
                  style={{ backgroundColor: result.color, color: "#0A0A0F" }}
                >
                  {result.cta} →
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
