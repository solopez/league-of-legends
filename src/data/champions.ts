import { IMAGES_BASE } from "../constants/cdn";

export interface ChampionData {
  imageUrl: string;
  ddId: string;
  history: string;
  abilities: string[];
}

export type ChampionName =
  | "Ashe"
  | "MissFortune"
  | "Blitz";

const champions: Record<ChampionName, ChampionData> = {
  Ashe: {
    imageUrl: `${IMAGES_BASE}/ashe.png`,
    ddId: "Ashe",
    history:
      "Warmother de los Avarosans del Freljord, Ashe usa el hielo y la estrategia para unir a las tribus en guerra. No busca la paz desde la debilidad, sino desde el poder de la unidad.",
    abilities: ["Ranger's Focus", "Volley", "Hawkshot", "Enchanted Crystal Arrow"],
  },
  MissFortune: {
    imageUrl: `${IMAGES_BASE}/miss-fortune.png`,
    ddId: "MissFortune",
    history:
      "Cazarrecompensas de Bilgewater que busca venganza contra Gangplank por el asesinato de su madre. Sus pistolas Twin Fangs son tan letales como su determinación inquebrantable.",
    abilities: ["Double Up", "Strut", "Make It Rain", "Bullet Time"],
  },
  Blitz: {
    imageUrl: `${IMAGES_BASE}/blitz.png`,
    ddId: "Blitzcrank",
    history:
      "Gólem de vapor creado en Zaun para limpiar sus zonas más tóxicas. Blitzcrank desarrolló conciencia propia y ahora busca su lugar en el mundo entre los humanos que lo rodean.",
    abilities: ["Rocket Grab", "Overdrive", "Power Fist", "Static Field"],
  },
};

export default champions;
