const KEY = "nexus_visited";

export type Section = "runeterra" | "lore" | "champions" | "quiz";

export const getVisited = (): Section[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};

export const markVisited = (section: Section): void => {
  try {
    const visited = getVisited();
    if (!visited.includes(section)) {
      localStorage.setItem(KEY, JSON.stringify([...visited, section]));
    }
  } catch {}
};

export const isOraculoUnlocked = (): boolean => getVisited().length >= 2;

export const isSanctumUnlocked = (): boolean => {
  const v = getVisited();
  return (["runeterra", "lore", "champions"] as Section[]).every((s) =>
    v.includes(s)
  );
};
