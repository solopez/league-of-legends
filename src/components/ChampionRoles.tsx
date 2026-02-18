export type ChampionRole =
  | "Marksman"
  | "Mage"
  | "Assassin"
  | "Fighter"
  | "Tank"
  | "Support";

export type ChampionName =
  | "Caitlyn"
  | "Jinx"
  | "Samira"
  | "Gwen"
  | "Urgot"
  | "Xin Zhao"
  | "Evelynn"
  | "Seraphine"
  | "Miss Fortune"
  | "Lux"
  | "Darius"
  | "Nidalee"
  | "Ahri"
  | "Zyra"
  | "Gragas"
  | "Aurelion"
  | "Garen"
  | "Blitz"
  | "Nami"
  | "Nasus";

export const championRoles: Record<ChampionName, ChampionRole> = {
  Caitlyn: "Marksman",
  Jinx: "Marksman",
  Samira: "Marksman",
  Gwen: "Fighter",
  Urgot: "Tank",
  "Xin Zhao": "Fighter",
  Evelynn: "Assassin",
  Seraphine: "Support",
  "Miss Fortune": "Marksman",
  Lux: "Mage",
  Darius: "Fighter",
  Nidalee: "Assassin",
  Ahri: "Mage",
  Zyra: "Mage",
  Gragas: "Tank",
  Aurelion: "Mage",
  Garen: "Fighter",
  Blitz: "Tank",
  Nami: "Support",
  Nasus: "Tank",
};

interface ChampionStats {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

export const generateStatsByRole = (role: ChampionRole): ChampionStats => {
  switch (role) {
    case "Marksman":
      return { attack: 9, defense: 3, magic: 2, difficulty: 6 };

    case "Mage":
      return { attack: 4, defense: 3, magic: 9, difficulty: 7 };

    case "Assassin":
      return { attack: 8, defense: 3, magic: 6, difficulty: 8 };

    case "Fighter":
      return { attack: 7, defense: 6, magic: 2, difficulty: 5 };

    case "Tank":
      return { attack: 4, defense: 9, magic: 3, difficulty: 4 };

    case "Support":
      return { attack: 3, defense: 5, magic: 8, difficulty: 5 };

    default:
      return { attack: 5, defense: 5, magic: 5, difficulty: 5 };
  }
};
