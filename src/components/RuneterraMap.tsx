import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";


const DD = "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion";
const DD_SPLASH = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash";



import mapImg from "../assets/runeterra-map.jpg";
const MAP_URL = mapImg;


interface Champion {
  id: string;   
  name: string; 
}

interface Region {
  id: string;
  name: string;
  x: number; 
  y: number; 
  color: string;
  lore: string;
  champions: Champion[];
}

const REGIONS: Region[] = [
  {
    id: "freljord",
    name: "Freljord",
    x: 32, y: 12,
    color: "#4fc3f7",
    lore: "Una tierra de glaciares eternos y tormentas perpetuas. El Freljord es un reino de hielo y conflicto donde tres reinas tribales luchan por unificar a un pueblo fragmentado. Bajo sus hielos duermen entidades ancestrales que aguardan el momento de despertar y consumir el mundo.",
    champions: [
      { id: "Ashe", name: "Ashe" },
      { id: "Lissandra", name: "Lissandra" },
      { id: "Sejuani", name: "Sejuani" },
      { id: "Braum", name: "Braum" },
      { id: "Volibear", name: "Volibear" },
      { id: "Tryndamere", name: "Tryndamere" },
    ],
  },
  {
    id: "demacia",
    name: "Demacia",
    x: 22, y: 38,
    color: "#e8d5a3",
    lore: "Una nación construida sobre ideales de honor, justicia y valor. Demacia ha prosperado rechazando la magia, pero esta represión oculta una crisis interna: el surgimiento de magos que no pueden controlar sus poderes y una inquisición despiadada que los caza sin piedad.",
    champions: [
      { id: "Garen", name: "Garen" },
      { id: "Lux", name: "Lux" },
      { id: "JarvanIV", name: "Jarvan IV" },
      { id: "Fiora", name: "Fiora" },
      { id: "Poppy", name: "Poppy" },
      { id: "Sona", name: "Sona" },
    ],
  },
  {
    id: "noxus",
    name: "Noxus",
    x: 40, y: 36,
    color: "#ef5350",
    lore: "Un imperio fundado en la fuerza. No de sangre ni de linaje, sino de poder demostrado en batalla. Noxus conquista y absorbe a sus enemigos, creyendo que sólo a través de la dominación el mundo puede alcanzar su verdadero potencial. Su brutalidad se disfraza de filosofía pragmática.",
    champions: [
      { id: "Darius", name: "Darius" },
      { id: "Katarina", name: "Katarina" },
      { id: "Draven", name: "Draven" },
      { id: "Swain", name: "Swain" },
      { id: "Cassiopeia", name: "Cassiopeia" },
      { id: "Vladimir", name: "Vladimir" },
    ],
  },
  {
    id: "ionia",
    name: "Ionia",
    x: 72, y: 30,
    color: "#ce93d8",
    lore: "Llamado el Continente Místico, Ionia es un archipiélago de belleza espiritual donde la magia fluye con libertad. Sus habitantes vivían en armonía con el mundo natural, hasta que la invasión noxiana dejó cicatrices profundas que aún hoy no terminan de sanar.",
    champions: [
      { id: "Yasuo", name: "Yasuo" },
      { id: "Zed", name: "Zed" },
      { id: "Ahri", name: "Ahri" },
      { id: "Karma", name: "Karma" },
      { id: "Jhin", name: "Jhin" },
      { id: "Irelia", name: "Irelia" },
    ],
  },
  {
    id: "piltover",
    name: "Piltover & Zaun",
    x: 28, y: 52,
    color: "#ffd54f",
    lore: "Piltover, la ciudad del progreso, y Zaun, su oscuro gemelo subterráneo. Juntas representan la dualidad de la tecnología: la innovación brillante de los hextech en la superficie y la desesperación tóxica de los más pobres que pagan el precio del avance.",
    champions: [
      { id: "Jinx", name: "Jinx" },
      { id: "Vi", name: "Vi" },
      { id: "Caitlyn", name: "Caitlyn" },
      { id: "Jayce", name: "Jayce" },
      { id: "Viktor", name: "Viktor" },
      { id: "Ekko", name: "Ekko" },
    ],
  },
  {
    id: "bilgewater",
    name: "Bilgewater",
    x: 20, y: 68,
    color: "#26c6da",
    lore: "El puerto más peligroso del mundo. Bilgewater es una ciudad sin ley donde piratas, cazadores de monstruos y fugitivos de todo Runeterra conviven en permanente caos. Las riquezas del Mar Azul fluyen por sus muelles junto con la sangre de quienes no saben cuidarlas.",
    champions: [
      { id: "MissFortune", name: "Miss Fortune" },
      { id: "Gangplank", name: "Gangplank" },
      { id: "Graves", name: "Graves" },
      { id: "TwistedFate", name: "Twisted Fate" },
      { id: "Pyke", name: "Pyke" },
      { id: "Fizz", name: "Fizz" },
    ],
  },
  {
    id: "shadow-isles",
    name: "Islas de las Sombras",
    x: 10, y: 50,
    color: "#66bb6a",
    lore: "Antaño un reino de magia luminosa, las Islas fueron devastadas por un cataclismo llamado la Ruina. Ahora son un lugar de muerte corrupta donde los espíritus no encuentran reposo y una neblina mortal amenaza con extenderse por todo Runeterra.",
    champions: [
      { id: "Thresh", name: "Thresh" },
      { id: "Hecarim", name: "Hecarim" },
      { id: "Kalista", name: "Kalista" },
      { id: "Yorick", name: "Yorick" },
      { id: "Mordekaiser", name: "Mordekaiser" },
      { id: "Gwen", name: "Gwen" },
    ],
  },
  {
    id: "targon",
    name: "Monte Targon",
    x: 46, y: 58,
    color: "#fff9c4",
    lore: "La montaña más alta de Runeterra y un punto de poder cósmico sin igual. Es donde el mundo mortal toca algo más antiguo y poderoso. Los Aspectos, entidades celestiales, descienden a habitar los cuerpos de los escaladores más resistentes.",
    champions: [
      { id: "Leona", name: "Leona" },
      { id: "Diana", name: "Diana" },
      { id: "Pantheon", name: "Pantheon" },
      { id: "Taric", name: "Taric" },
      { id: "Soraka", name: "Soraka" },
      { id: "Aphelios", name: "Aphelios" },
    ],
  },
  {
    id: "shurima",
    name: "Shurima",
    x: 54, y: 65,
    color: "#ffa726",
    lore: "Un vasto desierto donde yace enterrado un imperio olvidado de gloria inigualable. Shurima cayó hace milenios, pero sus ruinas guardan el poder de los Dioses Ascendidos. El Emperador Azir ha regresado de entre los muertos para reclamar lo que fue de su pueblo.",
    champions: [
      { id: "Azir", name: "Azir" },
      { id: "Nasus", name: "Nasus" },
      { id: "Renekton", name: "Renekton" },
      { id: "Sivir", name: "Sivir" },
      { id: "Taliyah", name: "Taliyah" },
      { id: "Xerath", name: "Xerath" },
    ],
  },
  {
    id: "ixtal",
    name: "Ixtal",
    x: 44, y: 78,
    color: "#81c784",
    lore: "Una nación oculta en la selva más densa de Runeterra. Ixtal es una civilización antigua y orgullosa que decidió aislarse del mundo exterior. Sus habitantes dominan la Elementomagia, el control absoluto de los elementos naturales.",
    champions: [
      { id: "Qiyana", name: "Qiyana" },
      { id: "Nidalee", name: "Nidalee" },
      { id: "Rengar", name: "Rengar" },
      { id: "Zyra", name: "Zyra" },
      { id: "Malphite", name: "Malphite" },
      { id: "Neeko", name: "Neeko" },
    ],
  },
  {
    id: "void",
    name: "El Vacío",
    x: 54, y: 88,
    color: "#ba68c8",
    lore: "Una dimensión de pura antimateria que amenaza con devorar toda la realidad. El Vacío no es un lugar de Runeterra sino una grieta entre mundos, un hambre primordial sin emoción ni propósito más allá de la destrucción total de todo lo que existe.",
    champions: [
      { id: "Kassadin", name: "Kassadin" },
      { id: "Kaisa", name: "Kai'Sa" },
      { id: "KogMaw", name: "Kog'Maw" },
      { id: "Malzahar", name: "Malzahar" },
      { id: "Velkoz", name: "Vel'Koz" },
      { id: "Chogath", name: "Cho'Gath" },
    ],
  },
];



export default function RuneterraMap() {
  const [selected, setSelected] = useState<Region | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      {}
      {MAP_URL ? (
        <img
          src={MAP_URL}
          alt="Mapa de Runeterra"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.55 }}
        />
      ) : (
        
        <div
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(ellipse 60% 50% at 35% 45%, rgba(200,155,60,0.07) 0%, transparent 100%)",
              "radial-gradient(ellipse 40% 40% at 70% 65%, rgba(79,195,247,0.04) 0%, transparent 100%)",
              "radial-gradient(ellipse 50% 60% at 15% 55%, rgba(102,187,106,0.03) 0%, transparent 100%)",
            ].join(", "),
          }}
        />
      )}

      {}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: MAP_URL
            ? "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 40%, rgba(0,0,0,0.55) 100%)"
            : undefined,
        }}
      />

      {}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-6 left-0 right-0 z-10 flex flex-col items-center gap-1 pointer-events-none"
      >
        <div className="flex items-center gap-3">
          <div
            className="h-px w-20"
            style={{ background: "linear-gradient(to right, transparent, #C89B3C)" }}
          />
          <span style={{ color: "#C89B3C", fontSize: 10 }}>✦</span>
          <h1
            className="text-2xl font-bold tracking-[0.3em] uppercase"
            style={{ color: "#F0E6D3" }}
          >
            Runeterra
          </h1>
          <span style={{ color: "#C89B3C", fontSize: 10 }}>✦</span>
          <div
            className="h-px w-20"
            style={{ background: "linear-gradient(to left, transparent, #C89B3C)" }}
          />
        </div>
        <p
          className="text-[10px] tracking-[0.35em] uppercase"
          style={{ color: "#4a4a4a" }}
        >
          Explora las regiones del mundo
        </p>
      </motion.div>

      {}
      {REGIONS.map((region, index) => (
        <motion.button
          key={region.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 + index * 0.055, duration: 0.25, ease: "backOut" }}
          className="absolute z-20"
          style={{
            left: `${region.x}%`,
            top: `${region.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          onMouseEnter={() => setHovered(region.id)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => setSelected(region)}
        >
          {}
          <AnimatePresence>
            {hovered === region.id && (
              <motion.div
                className="absolute rounded-full border"
                style={{ borderColor: region.color, inset: -6 }}
                initial={{ scale: 0.9, opacity: 0.7 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, repeat: Infinity, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          {}
          <motion.div
            className="w-3 h-3 rounded-full border-2"
            style={{
              backgroundColor: region.color + "22",
              borderColor: region.color,
            }}
            animate={{
              scale: hovered === region.id ? 1.5 : selected?.id === region.id ? 1.3 : 1,
              boxShadow:
                hovered === region.id
                  ? `0 0 14px 4px ${region.color}55`
                  : selected?.id === region.id
                  ? `0 0 10px 2px ${region.color}40`
                  : `0 0 4px 1px ${region.color}25`,
            }}
            transition={{ duration: 0.15 }}
          />

          {}
          <AnimatePresence>
            {(hovered === region.id || selected?.id === region.id) && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.13 }}
                className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
              >
                <span
                  className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: "rgba(5,5,10,0.9)",
                    border: `1px solid ${region.color}50`,
                    color: "#F0E6D3",
                  }}
                >
                  {region.name}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      ))}

      {}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-20"
            onClick={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

      {}
      <AnimatePresence>
        {selected && (
          <motion.aside
            key={selected.id}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-80 z-30 overflow-y-auto"
            style={{
              borderLeft: "1px solid #785A28",
              background:
                "linear-gradient(160deg, hsl(220 20% 13% / 0.99), hsl(220 20% 7% / 1))",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded transition-opacity hover:opacity-70 text-xs font-bold"
              style={{
                color: "#C89B3C",
                backgroundColor: "rgba(0,0,0,0.6)",
                border: "1px solid #785A28",
              }}
            >
              ✕
            </button>

            {}
            <div className="relative h-44 overflow-hidden flex-shrink-0">
              <img
                src={`${DD_SPLASH}/${selected.champions[0].id}_0.jpg`}
                alt={selected.name}
                className="w-full h-full object-cover object-top"
                style={{ filter: "brightness(0.65) saturate(0.85)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 30%, hsl(220 20% 10%) 100%)",
                }}
              />
              {}
              <div className="absolute bottom-3 left-4 right-10">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: selected.color }}
                  />
                  <h2
                    className="text-lg font-bold tracking-widest uppercase leading-none"
                    style={{ color: "#F0E6D3" }}
                  >
                    {selected.name}
                  </h2>
                </div>
                <div
                  className="h-px"
                  style={{
                    background: `linear-gradient(to right, ${selected.color}90, transparent)`,
                  }}
                />
              </div>
            </div>

            {}
            <div className="p-4 flex flex-col gap-4">
              {}
              <p className="text-sm leading-relaxed" style={{ color: "#A0937D" }}>
                {selected.lore}
              </p>

              {}
              <div
                className="h-px"
                style={{
                  background: "linear-gradient(to right, #785A28 20%, transparent 100%)",
                }}
              />

              {}
              <div>
                <p
                  className="text-[10px] tracking-[0.3em] uppercase font-bold mb-3"
                  style={{ color: "#C89B3C" }}
                >
                  Campeones destacados
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {selected.champions.map((champ, i) => (
                    <motion.div
                      key={champ.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.065, duration: 0.2 }}
                      className="flex flex-col items-center gap-1 group cursor-default"
                    >
                      <ChampionPortrait
                        id={champ.id}
                        name={champ.name}
                        baseUrl={DD}
                        accentColor={selected.color}
                      />
                      <span
                        className="text-[9px] tracking-wide text-center leading-tight"
                        style={{ color: "#5a5a5a" }}
                      >
                        {champ.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}



function ChampionPortrait({
  id,
  name,
  baseUrl,
  accentColor,
}: {
  id: string;
  name: string;
  baseUrl: string;
  accentColor: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-16 h-16 overflow-hidden rounded transition-all duration-200"
      style={{
        border: `1px solid ${hovered ? accentColor : "#785A28"}`,
        boxShadow: hovered ? `0 0 10px ${accentColor}40` : "0 2px 8px rgba(0,0,0,0.5)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={name}
    >
      <img
        src={`${baseUrl}/${id}.png`}
        alt={name}
        className="w-full h-full object-cover"
        style={{ transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.2s" }}
      />
    </div>
  );
}
