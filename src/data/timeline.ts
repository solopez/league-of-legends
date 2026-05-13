export interface TimelineChampion {
  id: string;
  name: string;
}

export interface TimelineEvent {
  id: string;
  era: string;
  year: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  splash: string;
  color: string;
  champions: TimelineChampion[];
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "watchers",
    era: "El Comienzo",
    year: "Antes del tiempo",
    title: "Los Vigilantes y el Vacío",
    shortDesc: "Entidades eternas intentan cruzar al mundo desde más allá de la realidad.",
    fullDesc:
      "Antes de que el tiempo comenzara, los Vigilantes —seres de pura antimateria— intentaron cruzar desde el Vacío hacia Runeterra para consumirla. Tres hermanas con poder sobre el hielo los enfrentaron: para sellarlos, Lissandra traicionó a su pueblo y los hundió bajo los glaciares del Freljord. El precio fue eterno: millones de vidas congeladas como barrera viviente. El Vacío quedó contenido, pero nunca destruido. Sus grietas siguen abiertas en el sur del mundo, y sus criaturas filtran hacia Runeterra lentamente, esperando el momento en que el sello se rompa por completo.",
    splash: "Kassadin",
    color: "#ba68c8",
    champions: [
      { id: "Lissandra", name: "Lissandra" },
      { id: "Kassadin", name: "Kassadin" },
      { id: "Velkoz", name: "Vel'Koz" },
      { id: "Malzahar", name: "Malzahar" },
    ],
  },
  {
    id: "rune-wars",
    era: "Era Antigua",
    year: "Miles de años atrás",
    title: "La Guerra de las Runas",
    shortDesc: "Magos todopoderosos desfiguran el mundo en una guerra de destrucción total.",
    fullDesc:
      "Las Runas del Mundo son fragmentos del poder que creó Runeterra, capaces de doblar la realidad. Cuando los magos descubrieron su existencia, estalló una guerra sin precedentes: ejércitos enteros borrados de la existencia, continentes resquebrajados, el cielo mismo ardiendo. La devastación fue tan total que las civilizaciones tardaron milenios en recuperarse. Ryze, uno de los últimos testigos de ese horror, dedica su vida inmortal a recuperar las Runas y esconderlas antes de que alguien vuelva a usarlas. Zilean quedó atrapado en todos los momentos del tiempo a la vez, incapaz de escapar de los ecos de esa guerra.",
    splash: "Ryze",
    color: "#7986cb",
    champions: [
      { id: "Ryze", name: "Ryze" },
      { id: "Zilean", name: "Zilean" },
      { id: "Lissandra", name: "Lissandra" },
    ],
  },
  {
    id: "shurima-peak",
    era: "Imperio de Shurima",
    year: "~3000 años atrás",
    title: "El Apogeo del Sol",
    shortDesc: "Shurima, el mayor imperio del mundo, alcanza su gloria máxima.",
    fullDesc:
      "Durante miles de años, el Imperio de Shurima dominó el mundo conocido. Su poder residía en el Disco Solar, una estructura capaz de otorgar la Ascensión: transformar a guerreros dignos en semidioses con poder sobrehumano. Nasus y Renekton fueron los primeros Ascendidos, guardianes eternos del imperio. El joven Azir, criado como esclavo y luego coronado emperador, soñaba con un Shurima aún más grande. Su ambición lo llevó a intentar el acto más audaz de su reinado: conceder la Ascensión a su siervo de confianza, Xerath, para compartir con él la eternidad.",
    splash: "Azir",
    color: "#ffa726",
    champions: [
      { id: "Azir", name: "Azir" },
      { id: "Nasus", name: "Nasus" },
      { id: "Renekton", name: "Renekton" },
      { id: "Sivir", name: "Sivir" },
    ],
  },
  {
    id: "shurima-fall",
    era: "Imperio de Shurima",
    year: "~3000 años atrás",
    title: "La Caída de Shurima",
    shortDesc: "La traición de Xerath destruye el imperio y maldice a sus guardianes.",
    fullDesc:
      "En el momento de la ceremonia de Ascensión, Xerath traicionó a Azir: lo mató e intentó tomar el poder del Sol para sí mismo. El ritual se descontroló. Azir murió, Shurima se derrumbó, y Xerath quedó atrapado en una prisión de energía. Renekton, intentando contenerlo, quedó encerrado con él durante milenios, enloqueciendo lentamente en la oscuridad. El mayor imperio que el mundo había conocido se convirtió en un desierto en cuestión de horas. Miles de años después, Azir resucitó —traído de entre los muertos por el Disco Solar— y encontró solo ruinas donde una vez fue su hogar.",
    splash: "Xerath",
    color: "#ef5350",
    champions: [
      { id: "Xerath", name: "Xerath" },
      { id: "Renekton", name: "Renekton" },
      { id: "Azir", name: "Azir" },
      { id: "Taliyah", name: "Taliyah" },
    ],
  },
  {
    id: "ruination",
    era: "Era de la Ruina",
    year: "~1000 años atrás",
    title: "La Ruina — Nacen las Islas de las Sombras",
    shortDesc: "Un rey desesperado convierte un paraíso en el lugar más oscuro del mundo.",
    fullDesc:
      "Las Islas Benditas eran un lugar de magia luminosa, hogar de secretos capaces de devolver la vida a los muertos. Viego, el Rey Arruinado, llevó allí el cuerpo de su esposa Isolde buscando resucitarla. El ritual salió terriblemente mal: el alma corrompida de Isolde destruyó el corazón mágico de las islas. En segundos, la Niebla Negra —una maldición de muerte pura— se expandió por todo el archipiélago. Todo ser vivo que tocó la niebla murió, y sus almas quedaron atrapadas como espectros eternos al servicio de Viego. Las Islas Benditas se convirtieron en las Islas de las Sombras, y la Niebla sigue creciendo.",
    splash: "Thresh",
    color: "#66bb6a",
    champions: [
      { id: "Thresh", name: "Thresh" },
      { id: "Hecarim", name: "Hecarim" },
      { id: "Kalista", name: "Kalista" },
      { id: "Yorick", name: "Yorick" },
    ],
  },
  {
    id: "nations",
    era: "Era Moderna",
    year: "~900 años atrás",
    title: "Demacia y Noxus — Dos visiones del mundo",
    shortDesc: "De las cenizas de la guerra nacen dos naciones con ideales opuestos.",
    fullDesc:
      "Después de la devastación de las Guerras de las Runas, los supervivientes construyeron nuevas civilizaciones. Demacia se erigió sobre ideales de honor, unidad y rechazo absoluto a la magia. Noxus, en cambio, se fundó sobre un principio brutal pero claro: solo el poder importa, sin importar su origen. Cualquiera puede ascender en Noxus si demuestra su fuerza. Con el tiempo, estas dos naciones se convirtieron en las potencias más grandes de Runeterra, y su rivalidad da forma a casi todos los conflictos del mundo moderno.",
    splash: "Garen",
    color: "#e8d5a3",
    champions: [
      { id: "Garen", name: "Garen" },
      { id: "Darius", name: "Darius" },
      { id: "Lux", name: "Lux" },
      { id: "Swain", name: "Swain" },
    ],
  },
  {
    id: "ionia-invasion",
    era: "Era Moderna",
    year: "~15 años atrás",
    title: "La Invasión Noxiana de Ionia",
    shortDesc: "Noxus ataca el continente místico, despertando una resistencia feroz.",
    fullDesc:
      "Ionia, el Continente Místico, era una tierra de paz y espiritualidad que había evitado durante siglos los conflictos del mundo exterior. Noxus la invadió buscando sus recursos y su posición estratégica. La resistencia ioniana fue brutal: Irelia, la Voluntad de las Cuchillas, lideró una revuelta que expulsó a los invasores de Navori. Pero la guerra dejó heridas profundas. Zed, desesperado por proteger su hogar, abandonó las enseñanzas del Wuju y abrazó las Sombras para ganar poder. Karma cargó con el peso de miles de almas caídas. La paz de Ionia nunca volvió a ser la misma.",
    splash: "Irelia",
    color: "#ce93d8",
    champions: [
      { id: "Irelia", name: "Irelia" },
      { id: "Zed", name: "Zed" },
      { id: "Karma", name: "Karma" },
      { id: "Yasuo", name: "Yasuo" },
    ],
  },
  {
    id: "hextech",
    era: "Era Moderna",
    year: "~20 años atrás",
    title: "El Hextech y la Revolución de Piltover",
    shortDesc: "Una nueva tecnología transforma Piltover en la ciudad del progreso.",
    fullDesc:
      "El descubrimiento de los cristales Hextech —capaces de almacenar y canalizar magia— desencadenó una revolución tecnológica sin precedentes en Piltover. Jayce y Viktor, dos mentes brillantes con visiones distintas, empujaron los límites de lo posible. Piltover se convirtió en la ciudad más rica e innovadora de Runeterra. Pero cada avance en la ciudad de arriba tuvo un costo en Zaun, la ciudad subterránea: contaminación, explotación y desesperanza. El Shimmer comenzó a fluir en las calles de Zaun, alimentando tanto el crimen como la resistencia.",
    splash: "Jayce",
    color: "#ffd54f",
    champions: [
      { id: "Jayce", name: "Jayce" },
      { id: "Viktor", name: "Viktor" },
      { id: "Caitlyn", name: "Caitlyn" },
      { id: "Vi", name: "Vi" },
    ],
  },
  {
    id: "zaun-crisis",
    era: "Era Moderna",
    year: "Presente reciente",
    title: "La Crisis de Zaun — Arcane",
    shortDesc: "La fractura entre Piltover y Zaun estalla en violencia y caos.",
    fullDesc:
      "Las tensiones entre Piltover y Zaun llegaron a un punto de quiebre. Powder —más tarde conocida como Jinx— y su hermana Vi crecieron en las calles de Zaun, entre la pobreza y la violencia. Un accidente trágico separó a las hermanas y marcó a Powder para siempre. Viktor, hijo de Zaun, buscó en la tecnología una forma de trascender el cuerpo humano —la Evolución Gloriosa. Ekko construyó una resistencia desde abajo. El conflicto culminó en una explosión que remeció los cimientos de ambas ciudades.",
    splash: "Jinx",
    color: "#26c6da",
    champions: [
      { id: "Jinx", name: "Jinx" },
      { id: "Vi", name: "Vi" },
      { id: "Viktor", name: "Viktor" },
      { id: "Ekko", name: "Ekko" },
    ],
  },
  {
    id: "present",
    era: "El Presente",
    year: "Ahora",
    title: "El Mundo en el Filo",
    shortDesc: "Múltiples crisis convergen: el Vacío, la Ruina y el retorno de los antiguos.",
    fullDesc:
      "Runeterra atraviesa el momento más peligroso de su historia. Azir ha regresado de entre los muertos para reconstruir Shurima, pero enfrenta a Xerath libre y hambriento de poder. Las grietas del Vacío en el sur se abren cada vez más, y Kassadin busca a su hija Kai'Sa perdida en esa dimensión. Viego desató una segunda Ruina que se extendió por todo el mundo. Noxus sigue su avance imparable. Y en el Freljord, el sello que contiene a los Vigilantes se debilita lentamente con cada generación.",
    splash: "Azir",
    color: "#C89B3C",
    champions: [
      { id: "Azir", name: "Azir" },
      { id: "Kassadin", name: "Kassadin" },
      { id: "Kaisa", name: "Kai'Sa" },
      { id: "Lissandra", name: "Lissandra" },
    ],
  },
];

export default timelineEvents;
