const BASE_URL = "/league-of-legends/images/";

interface ChampionData {
  imageUrl: string;
  history: string;
  abilities: string[];
}

export type ChampionName =
  | "Ashe"
  | "Jinx"
  | "Samira"
  | "Gwen"
  | "Urgot"
  | "MissFortune"
  | "Evelynn"
  | "Seraphine"
  | "Lux"
  | "Blitz";

const championData: Record<ChampionName, ChampionData> = {
  Ashe: {
    imageUrl: `${BASE_URL}ashe.png`,
    history:
      "Ashe es la sheriff de Piltover, conocida por su gran habilidad en el manejo de su rifle.",
    abilities: [
      "Yordle Snap Trap",
      "Piltover Peacemaker",
      "90 Caliber Net",
      "Ace in the Hole",
    ],
  },
  Jinx: {
    imageUrl: `${BASE_URL}jinx.png`,
    history:
      "Jinx es una criminal psicópata de Zaun que disfruta sembrar caos con su arsenal explosivo.",
    abilities: [
      "Switcheroo!",
      "Zap!",
      "Flame Chompers!",
      "Super Mega Death Rocket!",
    ],
  },
  Samira: {
    imageUrl: `${BASE_URL}samira.png`,
    history:
      "Samira es una mercenaria de Shurima, famosa por su estilo de lucha atrevido y letal.",
    abilities: ["Flair", "Blade Whirl", "Wild Rush", "Inferno Trigger"],
  },
  Gwen: {
    imageUrl: `${BASE_URL}gwen.png`,
    history:
      "Gwen es una muñeca viviente creada por un hechicero en los límites de la magia.",
    abilities: ["Snip Snip!", "Hallowed Mist", "Skip 'n Slash", "Needlework"],
  },
  Urgot: {
    imageUrl: `${BASE_URL}urgot.png`,
    history:
      "Urgot es un antiguo líder de la Liga de la Ciudad de Zaun transformado en una máquina con sed de venganza.",
    abilities: ["Corrosive Charge", "Purge", "Disdain", "Fear Beyond Death"],
  },

  Evelynn: {
    imageUrl: `${BASE_URL}evelynn.png`,
    history:
      "Evelynn es un demonio seductor y peligroso que se alimenta del sufrimiento de los demás.",
    abilities: ["Demon Shade", "Hate Spike", "Allure", "Whiplash"],
  },
  Seraphine: {
    imageUrl: `${BASE_URL}seraphine.png`,
    history:
      "Seraphine es una cantante de Piltover y Zaun que usa su música para inspirar y sanar a los demás.",
    abilities: ["High Note", "Surround Sound", "Beat Drop", "Encore"],
  },
  MissFortune: {
    imageUrl: `${BASE_URL}miss-fortune.png`,
    history:
      "Miss Fortune es una tiradora de la región de Bilgewater, famosa por su puntería mortal.",
    abilities: ["Double Up", "Strut", "Make It Rain", "Bullet Time"],
  },
  Lux: {
    imageUrl: `${BASE_URL}lux.png`,
    history:
      "Lux es una maga poderosa de Demacia, conocida por su dominio de la magia de luz.",
    abilities: [
      "Light Binding",
      "Prismatic Barrier",
      "Lucent Singularity",
      "Final Spark",
    ],
  },
  Blitz: {
    imageUrl: `${BASE_URL}blitz.png`,
    history:
      "Blitzcrank es una máquina creada para proteger Zaun, pero su impulso por ayudar a los demás lo lleva a situaciones peligrosas.",
    abilities: ["Rocket Grab", "Overdrive", "Power Fist", "Static Field"],
  },
};

export default championData;
