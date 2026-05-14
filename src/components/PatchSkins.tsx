import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 48;

const VERSIONS_URL = "https://ddragon.leagueoflegends.com/api/versions.json";
const CHAMPS_URL = (v: string) =>
  `https://ddragon.leagueoflegends.com/cdn/${v}/data/en_US/champion.json`;
const CD_SKINS = (patch: string) =>
  `https://raw.communitydragon.org/${patch}/plugins/rcp-be-lol-game-data/global/default/v1/skins.json`;
const LOADING_ART = (champId: string, num: number) =>
  `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champId}_${num}.jpg`;
const SPLASH_ART = (champId: string, num: number) =>
  `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champId}_${num}.jpg`;

interface CDSkin {
  id: number;
  isBase: boolean;
  name: string;
  rarity: string;
  isLegacy: boolean;
}

interface DisplaySkin {
  id: number;
  skinNum: number;
  name: string;
  champKey: number;
  champId: string;
  champName: string;
  rarity: string;
  isLegacy: boolean;
  isNew: boolean;
}

const RARITY: Record<string, { label: string; color: string }> = {
  kNoRarity:      { label: "Normal",        color: "#5a5a6a" },
  kEpic:          { label: "Épica",         color: "#0bc4c2" },
  kLegendary:     { label: "Legendaria",    color: "#d4a537" },
  kMythic:        { label: "Mítica",        color: "#ed6e34" },
  kUltimate:      { label: "Ultimate",      color: "#c94040" },
  kExalted:       { label: "Exaltada",      color: "#a855f7" },
  kTranscendent:  { label: "Transcendente", color: "#F0E6D3" },
};

type Filter = "nuevo" | "epic" | "legendary" | "mythic" | "ultimate" | "legacy" | "all";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "nuevo",     label: "Nuevo" },
  { id: "epic",      label: "Épica" },
  { id: "legendary", label: "Legendaria" },
  { id: "mythic",    label: "Mítica" },
  { id: "ultimate",  label: "Ultimate" },
  { id: "legacy",    label: "Legacy" },
  { id: "all",       label: "Todo" },
];

function isMajorPatch(v: string) {
  return /^\d+\.\d+\.1$/.test(v);
}

async function loadData(): Promise<{ skins: DisplaySkin[]; patch: string }> {
  const allVersions: string[] = await fetch(VERSIONS_URL).then((r) => r.json());
  const major = allVersions.filter(isMajorPatch);
  const v0 = major[0];
  const v1 = major[1];
  const patchLabel = v0.split(".").slice(0, 2).join(".");
  const prevLabel  = v1.split(".").slice(0, 2).join(".");

  const [champRes, currentSkins, prevSkins] = await Promise.all([
    fetch(CHAMPS_URL(v0)).then((r) => r.json()),
    fetch(CD_SKINS("latest")).then((r) => r.json()) as Promise<Record<string, CDSkin>>,
    fetch(CD_SKINS(prevLabel)).then((r) => r.json()).catch(() => ({} as Record<string, CDSkin>)),
  ]);

  const keyToChamp = new Map<number, { id: string; name: string }>();
  for (const champ of Object.values(champRes.data) as Array<{ key: string; id: string; name: string }>) {
    keyToChamp.set(parseInt(champ.key), { id: champ.id, name: champ.name });
  }

  const prevIds = new Set(Object.keys(prevSkins).map(Number));

  const skins: DisplaySkin[] = Object.values(currentSkins)
    .filter((s) => !s.isBase)
    .map((s) => {
      const champKey = Math.floor(s.id / 1000);
      const skinNum  = s.id % 1000;
      const champ    = keyToChamp.get(champKey);
      if (!champ) return null;
      return {
        id:        s.id,
        skinNum,
        name:      s.name,
        champKey,
        champId:   champ.id,
        champName: champ.name,
        rarity:    s.rarity || "kNoRarity",
        isLegacy:  s.isLegacy,
        isNew:     !prevIds.has(s.id),
      };
    })
    .filter(Boolean) as DisplaySkin[];

  void patchLabel;
  return { skins, patch: patchLabel };
}

function applyFilter(skins: DisplaySkin[], filter: Filter, search: string): DisplaySkin[] {
  let result = skins;

  if (filter === "nuevo")     result = result.filter((s) => s.isNew);
  else if (filter === "epic")      result = result.filter((s) => s.rarity === "kEpic");
  else if (filter === "legendary") result = result.filter((s) => s.rarity === "kLegendary");
  else if (filter === "mythic")    result = result.filter((s) => s.rarity === "kMythic");
  else if (filter === "ultimate")  result = result.filter((s) => ["kUltimate","kExalted","kTranscendent"].includes(s.rarity));
  else if (filter === "legacy")    result = result.filter((s) => s.isLegacy);

  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter(
      (s) => s.name.toLowerCase().includes(q) || s.champName.toLowerCase().includes(q)
    );
  }

  return result;
}

type Status = "loading" | "done" | "error";

export default function PatchSkins() {
  const navigate = useNavigate();
  const [status, setStatus]   = useState<Status>("loading");
  const [allSkins, setAll]    = useState<DisplaySkin[]>([]);
  const [patch, setPatch]     = useState("");
  const [filter, setFilter]   = useState<Filter>("nuevo");
  const [search, setSearch]   = useState("");
  const [page, setPage]       = useState(1);
  const [selected, setSelected] = useState<DisplaySkin | null>(null);

  useEffect(() => {
    loadData()
      .then(({ skins, patch }) => {
        setAll(skins);
        setPatch(patch);
        setStatus("done");
      })
      .catch(() => setStatus("error"));
  }, []);

  const filtered = useMemo(() => applyFilter(allSkins, filter, search), [allSkins, filter, search]);
  const visible  = filtered.slice(0, page * PAGE_SIZE);
  const hasMore  = visible.length < filtered.length;

  const handleFilter = (f: Filter) => { setFilter(f); setPage(1); };
  const handleSearch = (v: string) => { setSearch(v);  setPage(1); };

  const newCount = allSkins.filter((s) => s.isNew).length;

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: "#0A0A0F" }}>
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 35% at 50% 0%, rgba(200,155,60,0.055) 0%, transparent 60%)",
        }}
      />

      <button
        onClick={() => navigate("/")}
        className="fixed top-5 left-6 z-30 text-[10px] lg:text-sm tracking-[0.3em] uppercase opacity-35 hover:opacity-65 transition-opacity"
        style={{ color: "#C89B3C" }}
      >
        ← El Nexus
      </button>

      <div className="relative z-10 max-w-6xl mx-auto px-5 pt-14 pb-24">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-2 mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-14" style={{ background: "linear-gradient(to right, transparent, #C89B3C)" }} />
            <span style={{ color: "#C89B3C", fontSize: 10 }}>✦</span>
            <h1 className="text-xl font-bold tracking-[0.4em] uppercase" style={{ color: "#F0E6D3" }}>
              Skins
            </h1>
            <span style={{ color: "#C89B3C", fontSize: 10 }}>✦</span>
            <div className="h-px w-14" style={{ background: "linear-gradient(to left, transparent, #C89B3C)" }} />
          </div>
          {patch && (
            <span className="text-[10px] lg:text-sm tracking-[0.35em] uppercase" style={{ color: "#2a2a2a" }}>
              Parche {patch} · {newCount > 0 ? `${newCount} nuevas` : "cargando..."}
            </span>
          )}
        </motion.div>

        {status === "loading" && (
          <div className="flex flex-col items-center gap-4 mt-28">
            <motion.span
              animate={{ opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              style={{ color: "#C89B3C", fontSize: 28 }}
            >
              ✦
            </motion.span>
            <span className="text-[10px] lg:text-sm tracking-[0.3em] uppercase" style={{ color: "#2a2a2a" }}>
              Cargando catálogo...
            </span>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-4 mt-28">
            <span className="text-sm italic" style={{ color: "#5a4a3a" }}>
              &ldquo;El Nexus no responde.&rdquo;
            </span>
            <button
              onClick={() => window.location.reload()}
              className="text-[10px] lg:text-sm tracking-widest uppercase px-5 py-2 rounded transition-opacity hover:opacity-75"
              style={{ border: "1px solid #785A28", color: "#C89B3C" }}
            >
              Reintentar
            </button>
          </div>
        )}

        {status === "done" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex flex-wrap gap-1.5">
                {FILTERS.map((f) => (
                  <FilterTab
                    key={f.id}
                    label={f.label}
                    active={filter === f.id}
                    badge={f.id === "nuevo" && newCount > 0 ? newCount : undefined}
                    onClick={() => handleFilter(f.id)}
                  />
                ))}
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Buscar skin o campeón..."
                  className="w-full rounded px-4 py-2.5 text-xs lg:text-sm tracking-wide outline-none"
                  style={{
                    backgroundColor: "#0d0d12",
                    border: "1px solid #1e1e1e",
                    color: "#A0937D",
                    caretColor: "#C89B3C",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#785A28")}
                  onBlur={(e)  => (e.target.style.borderColor = "#1e1e1e")}
                />
                {search && (
                  <button
                    onClick={() => handleSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs opacity-40 hover:opacity-70 transition-opacity"
                    style={{ color: "#C89B3C" }}
                  >
                    ✕
                  </button>
                )}
              </div>

              <p className="text-[10px] lg:text-sm tracking-[0.2em] uppercase" style={{ color: "#2a2a2a" }}>
                {filtered.length === 0
                  ? "Sin resultados"
                  : `${filtered.length} skin${filtered.length !== 1 ? "s" : ""}`}
              </p>
            </div>

            {filtered.length === 0 ? (
              <p className="text-center text-sm italic mt-16" style={{ color: "#3a3a3a" }}>
                &ldquo;El Nexus no guarda esa invocación.&rdquo;
              </p>
            ) : (
              <>
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
                  className="grid gap-2"
                  style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}
                >
                  {visible.map((skin) => (
                    <SkinCard key={skin.id} skin={skin} onClick={() => setSelected(skin)} />
                  ))}
                </motion.div>

                {hasMore && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      className="px-8 py-2.5 rounded text-[10px] lg:text-sm tracking-widest uppercase transition-opacity hover:opacity-75"
                      style={{ border: "1px solid #785A28", color: "#C89B3C" }}
                    >
                      Cargar más · {filtered.length - visible.length} restantes
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="bd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ backgroundColor: "rgba(0,0,0,0.88)" }}
              onClick={() => setSelected(null)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.94, y: 22 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.27, ease: "easeOut" }}
              className="relative rounded overflow-hidden pointer-events-auto w-full"
              style={{
                maxWidth: "820px",
                maxHeight: "90vh",
                border: "1px solid #785A28",
                background: "hsl(220 20% 7%)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded text-xs font-bold hover:opacity-70 transition-opacity"
                style={{ color: "#C89B3C", backgroundColor: "rgba(0,0,0,0.75)", border: "1px solid #785A28" }}
              >
                ✕
              </button>

              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1215/717" }}>
                <img
                  src={SPLASH_ART(selected.champId, selected.skinNum)}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.85) saturate(0.9)" }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to top, hsl(220 20% 7%) 0%, transparent 45%)" }}
                />
              </div>

              <div className="px-6 py-5 flex items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    {selected.isNew && (
                      <span
                        className="text-[8px] tracking-[0.3em] uppercase px-2 py-0.5 rounded"
                        style={{ backgroundColor: "rgba(200,155,60,0.15)", border: "1px solid #785A2870", color: "#C89B3C" }}
                      >
                        nuevo
                      </span>
                    )}
                    {selected.isLegacy && (
                      <span
                        className="text-[8px] tracking-[0.3em] uppercase px-2 py-0.5 rounded"
                        style={{ backgroundColor: "rgba(90,90,90,0.15)", border: "1px solid #3a3a3a", color: "#5a5a5a" }}
                      >
                        legacy
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold tracking-[0.3em] uppercase" style={{ color: "#F0E6D3" }}>
                    {selected.name}
                  </h2>
                  <span className="text-[11px] lg:text-sm tracking-[0.3em] uppercase" style={{ color: "#785A28" }}>
                    {selected.champName}
                  </span>
                </div>

                {RARITY[selected.rarity] && selected.rarity !== "kNoRarity" && (
                  <span
                    className="text-[9px] lg:text-xs tracking-[0.3em] uppercase px-3 py-1.5 rounded flex-shrink-0"
                    style={{
                      border: `1px solid ${RARITY[selected.rarity].color}40`,
                      color: RARITY[selected.rarity].color,
                      backgroundColor: `${RARITY[selected.rarity].color}10`,
                    }}
                  >
                    {RARITY[selected.rarity].label}
                  </span>
                )}
              </div>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterTab({
  label,
  active,
  badge,
  onClick,
}: {
  label: string;
  active: boolean;
  badge?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] lg:text-sm tracking-[0.25em] uppercase font-bold transition-all"
      style={{
        border: `1px solid ${active ? "#785A28" : "#1e1e1e"}`,
        backgroundColor: active ? "rgba(200,155,60,0.1)" : "transparent",
        color: active ? "#C89B3C" : "#3a3a3a",
      }}
    >
      {label}
      {badge !== undefined && (
        <span
          className="text-[8px] px-1.5 py-px rounded-full"
          style={{ backgroundColor: "#C89B3C", color: "#0A0A0F", fontWeight: 800 }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

function SkinCard({ skin, onClick }: { skin: DisplaySkin; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const rarity = RARITY[skin.rarity];

  return (
    <motion.button
      variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.28 } } }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded cursor-pointer text-left w-full"
      style={{
        aspectRatio: "308/560",
        border: `1px solid ${hovered ? (rarity?.color ?? "#C89B3C") : skin.isNew ? "#785A2860" : "#1a1a1a"}`,
        boxShadow: hovered ? `0 0 18px ${rarity?.color ?? "#C89B3C"}22` : "none",
        transition: "border-color 0.18s, box-shadow 0.18s",
        backgroundColor: "#0d0d12",
      }}
    >
      {!imgError ? (
        <img
          src={LOADING_ART(skin.champId, skin.skinNum)}
          alt={skin.name}
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.35s ease, filter 0.22s",
            filter: hovered ? "brightness(0.7)" : "brightness(0.5)",
          }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 55% at 50% 35%, #1a1a2a, #0d0d12)" }}
        />
      )}

      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(10,10,15,0.96) 0%, rgba(10,10,15,0.05) 55%, transparent 100%)" }}
      />

      {skin.isNew && (
        <div className="absolute top-1.5 left-1.5">
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[7px] tracking-widest uppercase px-1.5 py-0.5 rounded"
            style={{ backgroundColor: "rgba(10,10,15,0.9)", border: "1px solid #C89B3C60", color: "#C89B3C" }}
          >
            nuevo
          </motion.span>
        </div>
      )}

      {rarity && skin.rarity !== "kNoRarity" && (
        <div className="absolute top-1.5 right-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: rarity.color, boxShadow: `0 0 6px ${rarity.color}` }}
            title={rarity.label}
          />
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 px-2.5 pb-2.5 flex flex-col gap-0.5">
        <div
          className="h-px mb-1"
          style={{
            background: `linear-gradient(to right, ${hovered ? (rarity?.color ?? "#C89B3C") + "55" : "#1e1e1e"}, transparent)`,
            transition: "background 0.18s",
          }}
        />
        <span className="text-[10px] lg:text-sm font-bold tracking-wide leading-tight" style={{ color: "#F0E6D3" }}>
          {skin.name}
        </span>
        <span className="text-[8px] tracking-[0.2em] uppercase" style={{ color: "#5a5a5a" }}>
          {skin.champName}
        </span>
      </div>
    </motion.button>
  );
}
