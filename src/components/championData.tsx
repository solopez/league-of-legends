const BASE_URL = "/league-of-legends/";

interface ChampionData {
  imageUrl: string;
  history: string;
  abilities: string[];
}

type ChampionName =
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

const championData: Record<ChampionName, ChampionData> = {
  Caitlyn: {
    imageUrl: `${BASE_URL}caitlyn.png`,
    history:
      "Caitlyn es la sheriff de Piltover, conocida por su gran habilidad en el manejo de su rifle.",
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
  "Xin Zhao": {
    imageUrl: `${BASE_URL}xin-zhao.png`,
    history:
      "Xin Zhao es un guerrero valiente de Ionia, un hombre conocido por su inquebrantable honor y valentía.",
    abilities: [
      "Three Talon Strike",
      "Wind Becomes Lightning",
      "Audacious Charge",
      "Crescent Sweep",
    ],
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
  "Miss Fortune": {
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
  Darius: {
    imageUrl: `${BASE_URL}darius.png`,
    history:
      "Darius es un comandante militar brutal de Noxus, conocido como el 'Hombre de Hierro'.",
    abilities: [
      "Decimate",
      "Crippling Strike",
      "Apprehend",
      "Noxian Guillotine",
    ],
  },
  Nidalee: {
    imageUrl: `${BASE_URL}nidalee.png`,
    history:
      "Nidalee es una cazadora de Ionia, con la habilidad de transformarse en una pantera.",
    abilities: [
      "Javelin Toss",
      "Bushwhack",
      "Primal Surge",
      "Aspect Of The Cougar",
    ],
  },
  Ahri: {
    imageUrl: `${BASE_URL}ahri.png`,
    history:
      "Ahri es una hechicera que busca descubrir más sobre sus misteriosos orígenes.",
    abilities: ["Orb of Deception", "Fox-Fire", "Charm", "Spirit Rush"],
  },
  Zyra: {
    imageUrl: `${BASE_URL}zyra.png`,
    history: "Zyra es una criatura vegetal nacida del caos en la naturaleza.",
    abilities: [
      "Deadly Spines",
      "Rampant Growth",
      "Grasping Roots",
      "Stranglethorns",
    ],
  },
  Gragas: {
    imageUrl: `${BASE_URL}gragas.png`,
    history:
      "Gragas es un cervecero de Freljord, conocido por su habilidad para derribar a sus enemigos con barriles.",
    abilities: ["Barrel Roll", "Drunken Rage", "Body Slam", "Explosive Cask"],
  },
  Aurelion: {
    imageUrl: `${BASE_URL}aurelion.png`,
    history:
      "Aurelion Sol es un ser cósmico que forjó estrellas y galaxias con su propia voluntad.",
    abilities: [
      "Starsurge",
      "Celestial Expansion",
      "Comet of Legend",
      "Voice of Light",
    ],
  },
  Garen: {
    imageUrl: `${BASE_URL}garen.png`,
    history:
      "Garen es un guerrero de Demacia, leal hasta la muerte a su patria.",
    abilities: ["Decisive Strike", "Courage", "Judgment", "Demacian Justice"],
  },
  Blitz: {
    imageUrl: `${BASE_URL}blitz.png`,
    history:
      "Blitzcrank es una máquina creada para proteger Zaun, pero su impulso por ayudar a los demás lo lleva a situaciones peligrosas.",
    abilities: ["Rocket Grab", "Overdrive", "Power Fist", "Static Field"],
  },
  Nami: {
    imageUrl: `${BASE_URL}nami.png`,
    history: "Nami es una sirena de Ionia que lucha para proteger su pueblo.",
    abilities: ["Aqua Prison", "Ebb and Flow", "Tidal Wave", "Surging Tides"],
  },
  Nasus: {
    imageUrl: `${BASE_URL}nasus.png`,
    history:
      "Nasus es un dios antiguo de Shurima, guardián de la sabiduría y la justicia.",
    abilities: [
      "Siphoning Strike",
      "Wither",
      "Spirit Fire",
      "Fury of the Sands",
    ],
  },
};

export default championData;
