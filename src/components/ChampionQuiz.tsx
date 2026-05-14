import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DD_SPLASH } from "../constants/cdn";
import QUIZ_CHAMPIONS, { type QuizChampion } from "../data/quiz";
import { markVisited } from "../utils/visited";

const TOTAL_QUESTIONS = 5;
const POINTS_TABLE = [500, 400, 300, 200, 100] as const;

function shuffled<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildOptions(correct: QuizChampion, all: QuizChampion[]): QuizChampion[] {
  const wrong = shuffled(all.filter((c) => c.id !== correct.id)).slice(0, 3);
  return shuffled([correct, ...wrong]);
}

function splashStyle(cluesRevealed: number, answered: boolean): string {
  if (answered) return "brightness(0.65) blur(0px) saturate(0.75)";
  const levels = [
    "brightness(0.05) blur(28px) saturate(0.3)",
    "brightness(0.15) blur(20px) saturate(0.45)",
    "brightness(0.28) blur(13px) saturate(0.55)",
    "brightness(0.44) blur(6px)  saturate(0.65)",
    "brightness(0.60) blur(1px)  saturate(0.72)",
  ];
  return levels[Math.min(cluesRevealed, levels.length - 1)];
}

type Phase = "playing" | "correct" | "wrong" | "finished";

export default function ChampionQuiz() {
  const navigate = useNavigate();

  useEffect(() => { markVisited("quiz"); }, []);
  const questions = useMemo(
    () => shuffled(QUIZ_CHAMPIONS).slice(0, TOTAL_QUESTIONS),
    []
  );

  const [qIndex, setQIndex] = useState(0);
  const [cluesRevealed, setCluesRevealed] = useState(0);
  const [phase, setPhase] = useState<Phase>("playing");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastPoints, setLastPoints] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const current = questions[qIndex];

  const options = useMemo(
    () => buildOptions(current, QUIZ_CHAMPIONS),
    [qIndex]
  );

  const answered = phase === "correct" || phase === "wrong";

  const handleAnswer = (champ: QuizChampion) => {
    if (phase !== "playing") return;
    setSelected(champ.id);
    if (champ.id === current.id) {
      const pts = POINTS_TABLE[Math.min(cluesRevealed, POINTS_TABLE.length - 1)];
      setLastPoints(pts);
      setScore((s) => s + pts);
      setStreak((s) => s + 1);
      setPhase("correct");
    } else {
      setLastPoints(0);
      setStreak(0);
      setPhase("wrong");
    }
  };

  const handleNext = () => {
    if (qIndex + 1 >= TOTAL_QUESTIONS) {
      setPhase("finished");
    } else {
      setQIndex((i) => i + 1);
      setCluesRevealed(0);
      setPhase("playing");
      setSelected(null);
    }
  };

  if (phase === "finished") {
    return (
      <FinishedScreen
        score={score}
        total={TOTAL_QUESTIONS}
        onRestart={() => window.location.reload()}
        onHub={() => navigate("/")}
      />
    );
  }

  const currentPoints = POINTS_TABLE[Math.min(cluesRevealed, POINTS_TABLE.length - 1)];
  const nextCluePoints = POINTS_TABLE[Math.min(cluesRevealed + 1, POINTS_TABLE.length - 1)];
  const canRevealMore = cluesRevealed < current.clues.length;

  return (
    <div
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      <motion.div
        key={current.id}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <img
          src={`${DD_SPLASH}/${current.id}_0.jpg`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{
            filter: splashStyle(cluesRevealed, answered),
            transform: "scale(1.04)",
            transition: "filter 1.1s ease",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,15,0.45) 0%, rgba(10,10,15,0.65) 55%, rgba(10,10,15,0.96) 100%)",
          }}
        />
      </motion.div>

      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 pt-5">
        <button
          onClick={() => navigate("/")}
          className="text-[10px] lg:text-sm tracking-[0.3em] uppercase transition-opacity opacity-35 hover:opacity-65"
          style={{ color: "#C89B3C" }}
        >
          ← El Nexus
        </button>

        <div className="flex items-center gap-5">
          <AnimatePresence>
            {streak >= 2 && (
              <motion.span
                key={streak}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="text-[10px] lg:text-sm tracking-widest uppercase"
                style={{ color: "#ffa726" }}
              >
                🔥 {streak} en racha
              </motion.span>
            )}
          </AnimatePresence>

          <div className="text-right">
            <div
              className="text-[9px] lg:text-xs tracking-[0.3em] uppercase"
              style={{ color: "#785A28" }}
            >
              Puntos
            </div>
            <motion.div
              key={score}
              initial={{ scale: 1.35, color: "#C89B3C" }}
              animate={{ scale: 1, color: "#F0E6D3" }}
              transition={{ duration: 0.45 }}
              className="text-lg font-bold leading-none"
            >
              {score.toLocaleString()}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute top-[52px] left-6 right-6 flex gap-1.5 z-20">
        {questions.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-0.5 rounded-full"
            style={{
              backgroundColor:
                i < qIndex ? "#C89B3C" : i === qIndex ? "#F0E6D3" : "#1c1c1c",
              transition: "background-color 0.4s",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 gap-4 pt-20 pb-40 z-10">
        <motion.div
          key={`label-${qIndex}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3"
        >
          <div
            className="h-px w-10"
            style={{ background: "linear-gradient(to right, transparent, #C89B3C)" }}
          />
          <span
            className="text-[10px] lg:text-sm tracking-[0.45em] uppercase font-bold"
            style={{ color: "#C89B3C" }}
          >
            ¿ Quién soy ?
          </span>
          <div
            className="h-px w-10"
            style={{ background: "linear-gradient(to left, transparent, #C89B3C)" }}
          />
        </motion.div>

        <div className="flex flex-col items-center gap-2 w-full max-w-md min-h-[128px] justify-center">
          <AnimatePresence>
            {cluesRevealed === 0 && phase === "playing" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-center"
                style={{ color: "#2e2e2e" }}
              >
                Adiviná directamente o revelá pistas para ayudarte
              </motion.p>
            )}
          </AnimatePresence>

          {Array.from({ length: cluesRevealed }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="w-full px-4 py-2.5 rounded text-sm text-center"
              style={{
                backgroundColor: "rgba(200,155,60,0.07)",
                border: "1px solid rgba(200,155,60,0.17)",
                color: "#A0937D",
              }}
            >
              <span className="font-bold mr-2" style={{ color: "#C89B3C" }}>
                Pista {i + 1}:
              </span>
              {current.clues[i]}
            </motion.div>
          ))}
        </div>

        {phase === "playing" && canRevealMore && (
          <motion.button
            onClick={() => setCluesRevealed((c) => c + 1)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2 rounded text-[10px] lg:text-sm tracking-widest uppercase"
            style={{
              border: "1px solid rgba(200,155,60,0.22)",
              color: "#785A28",
              backgroundColor: "transparent",
            }}
          >
            Revelar pista {cluesRevealed + 1}
            <span className="ml-2 opacity-55">· val. {nextCluePoints} pts</span>
          </motion.button>
        )}

        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-1.5"
            >
              {phase === "correct" ? (
                <>
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 230 }}
                    className="text-3xl font-bold tracking-widest"
                    style={{ color: "#C89B3C" }}
                  >
                    +{lastPoints}
                  </motion.div>
                  <div
                    className="text-xs tracking-[0.3em] uppercase font-bold"
                    style={{ color: "#66bb6a" }}
                  >
                    ¡Correcto!
                  </div>
                  <div className="text-[10px] lg:text-sm" style={{ color: "#5a5a5a" }}>
                    {current.region}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="text-xs tracking-[0.3em] uppercase font-bold"
                    style={{ color: "#ef5350" }}
                  >
                    Incorrecto
                  </div>
                  <div className="text-xs" style={{ color: "#A0937D" }}>
                    Era{" "}
                    <span style={{ color: "#F0E6D3", fontWeight: "bold" }}>
                      {current.name}
                    </span>{" "}
                    <span style={{ color: "#3a3a3a" }}>· {current.region}</span>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-4 right-4 z-20">
        <div className="grid grid-cols-2 gap-2.5 max-w-lg mx-auto">
          {options.map((opt) => {
            const isCorrect = opt.id === current.id;
            const isSelected = opt.id === selected;

            let borderColor = "#785A28";
            let bgColor = "rgba(10,10,15,0.82)";
            let textColor = "#F0E6D3";

            if (answered) {
              if (isCorrect) {
                borderColor = "#66bb6a";
                bgColor = "rgba(102,187,106,0.13)";
                textColor = "#66bb6a";
              } else if (isSelected) {
                borderColor = "#ef5350";
                bgColor = "rgba(239,83,80,0.11)";
                textColor = "#ef5350";
              } else {
                borderColor = "#1e1e1e";
                textColor = "#2e2e2e";
              }
            }

            return (
              <motion.button
                key={opt.id}
                onClick={() => handleAnswer(opt)}
                disabled={answered}
                whileHover={!answered ? { scale: 1.025, borderColor: "#C89B3C" } : {}}
                whileTap={!answered ? { scale: 0.975 } : {}}
                className="py-3.5 px-4 rounded text-sm font-bold tracking-wide cursor-pointer disabled:cursor-default"
                style={{
                  border: `1px solid ${borderColor}`,
                  backgroundColor: bgColor,
                  color: textColor,
                  transition: "background-color 0.3s, border-color 0.3s, color 0.3s",
                }}
              >
                {opt.name}
              </motion.button>
            );
          })}
        </div>

        {phase === "playing" && (
          <p
            className="text-center text-[9px] lg:text-xs tracking-widest uppercase mt-2"
            style={{ color: "#2a2a2a" }}
          >
            Respuesta correcta ahora · {currentPoints} pts
          </p>
        )}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.button
            key="next"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleNext}
            className="absolute bottom-6 right-6 z-30 px-5 py-2.5 rounded text-xs font-bold tracking-widest uppercase"
            style={{ backgroundColor: "#C89B3C", color: "#0A0A0F" }}
          >
            {qIndex + 1 >= TOTAL_QUESTIONS ? "Ver resultado →" : "Siguiente →"}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function FinishedScreen({
  score,
  total,
  onRestart,
  onHub,
}: {
  score: number;
  total: number;
  onRestart: () => void;
  onHub: () => void;
}) {
  const maxScore = total * 500;
  const pct = Math.round((score / maxScore) * 100);
  const rank =
    pct >= 90
      ? "Maestro del Lore"
      : pct >= 70
      ? "Explorador de Runeterra"
      : pct >= 50
      ? "Iniciado del Nexus"
      : "Novato del Nexus";
  const rankColor =
    pct >= 90 ? "#C89B3C" : pct >= 70 ? "#ce93d8" : pct >= 50 ? "#4fc3f7" : "#5a5a5a";

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center gap-8"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="flex flex-col items-center gap-5"
      >
        <div className="flex items-center gap-3">
          <div
            className="h-px w-16"
            style={{ background: "linear-gradient(to right, transparent, #C89B3C)" }}
          />
          <span style={{ color: "#C89B3C", fontSize: 10 }}>✦</span>
          <span
            className="text-[10px] lg:text-sm tracking-[0.4em] uppercase"
            style={{ color: "#C89B3C" }}
          >
            Resultado Final
          </span>
          <span style={{ color: "#C89B3C", fontSize: 10 }}>✦</span>
          <div
            className="h-px w-16"
            style={{ background: "linear-gradient(to left, transparent, #C89B3C)" }}
          />
        </div>

        <motion.div
          initial={{ scale: 0.65, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.18, type: "spring", stiffness: 140 }}
          className="text-7xl font-bold"
          style={{ color: "#F0E6D3" }}
        >
          {score.toLocaleString()}
        </motion.div>

        <div className="flex flex-col items-center gap-1">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-sm font-bold tracking-[0.25em] uppercase"
            style={{ color: rankColor }}
          >
            {rank}
          </motion.span>
          <span className="text-xs" style={{ color: "#3a3a3a" }}>
            {pct}% del puntaje máximo
          </span>
        </div>

        <div
          className="w-52 h-0.5 rounded-full overflow-hidden"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: "linear-gradient(to right, #785A28, #C89B3C)" }}
          />
        </div>

        <div className="flex gap-3 mt-2">
          <button
            onClick={onHub}
            className="px-6 py-3 rounded text-xs tracking-widest uppercase transition-opacity hover:opacity-75"
            style={{
              border: "1px solid #785A28",
              color: "#C89B3C",
              backgroundColor: "transparent",
            }}
          >
            ← El Nexus
          </button>
          <button
            onClick={onRestart}
            className="px-6 py-3 rounded text-xs font-bold tracking-widest uppercase transition-opacity hover:opacity-88"
            style={{ backgroundColor: "#C89B3C", color: "#0A0A0F" }}
          >
            Jugar de nuevo
          </button>
        </div>
      </motion.div>
    </div>
  );
}
