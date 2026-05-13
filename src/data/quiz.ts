export interface QuizChampion {
  id: string;
  name: string;
  region: string;
  regionColor: string;
  clues: [string, string, string, string];
}

const QUIZ_CHAMPIONS: QuizChampion[] = [
  {
    id: "Garen",
    name: "Garen",
    region: "Demacia",
    regionColor: "#e8d5a3",
    clues: [
      "Nació y creció al servicio de una de las naciones más orgullosas de Runeterra.",
      "Su familia lleva generaciones defendiendo su reino con una lealtad absoluta al honor.",
      "Tiene una hermana con poderes mágicos que oculta por miedo a la persecución.",
      "Su grito de batalla se confunde con el nombre de toda su nación.",
    ],
  },
  {
    id: "Lux",
    name: "Lux",
    region: "Demacia",
    regionColor: "#e8d5a3",
    clues: [
      "Pertenece a una de las familias más nobles de su país, aunque carga con un secreto peligroso.",
      "En su nación, la habilidad que posee podría condenarla a prisión — o algo peor.",
      "Su hermano es uno de los guerreros más célebres del reino, ignorante de su verdad.",
      "Teje la luz misma en escudos brillantes y rayos de energía devastadores.",
    ],
  },
  {
    id: "Darius",
    name: "Darius",
    region: "Noxus",
    regionColor: "#ef5350",
    clues: [
      "Surgió desde la pobreza hasta convertirse en el símbolo viviente del poder de su nación.",
      "Para él, el resultado es lo único que importa. La estrategia y el honor son excusas de débiles.",
      "Su hermano menor es uno de los guerreros más vistosos del ejército imperial.",
      "Es conocido como la Mano de su nación: el ejecutor supremo de su voluntad.",
    ],
  },
  {
    id: "Katarina",
    name: "Katarina",
    region: "Noxus",
    regionColor: "#ef5350",
    clues: [
      "Nació en el corazón del imperio más brutal de Runeterra y fue entrenada desde niña como asesina.",
      "Su padre, uno de los generales más temidos, la instruyó él mismo en el arte de matar.",
      "Carga con una cicatriz que es recordatorio permanente de la misión que le costó su reputación.",
      "Se mueve a velocidad sobrehumana entre sus enemigos, acuchillando con múltiples dagas a la vez.",
    ],
  },
  {
    id: "Ashe",
    name: "Ashe",
    region: "Freljord",
    regionColor: "#4fc3f7",
    clues: [
      "Gobierna sobre un pueblo que ha sobrevivido generaciones en uno de los climas más inhóspitos del mundo.",
      "No busca ser reina por poder sino por la esperanza de unir a un pueblo eternamente fragmentado.",
      "Porta el arco de una mítica guerrera ancestral de su pueblo, símbolo de unidad perdida.",
      "Su flecha definitiva puede cruzar el mundo entero antes de congelar a su objetivo en el lugar.",
    ],
  },
  {
    id: "Lissandra",
    name: "Lissandra",
    region: "Freljord",
    regionColor: "#4fc3f7",
    clues: [
      "Vive en las tierras más frías de Runeterra, donde los glaciares guardan secretos de milenios.",
      "Se presenta como protectora de su pueblo, pero sus verdaderos motivos son mucho más oscuros.",
      "Hace miles de años traicionó a su propio pueblo y los congeló vivos para sellar a los Vigilantes.",
      "Se llama a sí misma la Bruja de Hielo, última de las Tres Hermanas que enfrentaron al Vacío.",
    ],
  },
  {
    id: "Yasuo",
    name: "Yasuo",
    region: "Ionia",
    regionColor: "#ce93d8",
    clues: [
      "Nació y se entrenó en las tierras espirituales del continente más místico de Runeterra.",
      "Fue acusado de un crimen que no cometió y lleva años huyendo de ese pasado.",
      "Su propio hermano lo persigue convencido de su culpa, aunque la verdad es completamente otra.",
      "Domina el Camino del Viento, una técnica de esgrima que combina la hoja con el control del aire.",
    ],
  },
  {
    id: "Ahri",
    name: "Ahri",
    region: "Ionia",
    regionColor: "#ce93d8",
    clues: [
      "Habita los bosques espirituales del continente más místico y bello de Runeterra.",
      "Es una vastaya: una criatura mágica a mitad de camino entre el espíritu y el ser mortal.",
      "Puede absorber la esencia vital de sus víctimas, pero carga con la culpa de haberlo hecho.",
      "Tiene nueve colas y hipnotiza a sus presas con una esfera de energía espiritual llameante.",
    ],
  },
  {
    id: "Jhin",
    name: "Jhin",
    region: "Ionia",
    regionColor: "#ce93d8",
    clues: [
      "Nació en las tierras que más valoran la armonía y la belleza — y pervirtió ese ideal por completo.",
      "Es un asesino, pero se considera a sí mismo un artista cuya obra maestra es la muerte perfecta.",
      "Fue capturado y encarcelado por un equipo de élite ioniano del que hoy huye al menos uno de sus miembros.",
      "Dispara exactamente cuatro balas antes de recargar. El cuatro es para él el número de la perfección.",
    ],
  },
  {
    id: "Zed",
    name: "Zed",
    region: "Ionia",
    regionColor: "#ce93d8",
    clues: [
      "Nació en la nación que más valora el equilibrio espiritual y la armonía con la naturaleza.",
      "Fue expulsado de su escuela de combate por buscar un poder que sus maestros consideraban prohibido.",
      "Cuando su nación fue invadida, abandonó sus principios para ganar el poder necesario y defenderla.",
      "Manipula su propia sombra como extensión de su voluntad, usándola como arma y señuelo.",
    ],
  },
  {
    id: "Jinx",
    name: "Jinx",
    region: "Zaun",
    regionColor: "#26c6da",
    clues: [
      "Creció en las calles más peligrosas de la ciudad más oscura que existe bajo el puente.",
      "Para ella el caos no es un medio sino un fin en sí mismo. La destrucción es su forma de diversión.",
      "Una tragedia de infancia la separó de su hermana mayor y la cambió de manera irreversible.",
      "Alterna entre un minigun y un lanzacohetes gigante según cuánta destrucción desee causar.",
    ],
  },
  {
    id: "Vi",
    name: "Vi",
    region: "Piltover",
    regionColor: "#ffd54f",
    clues: [
      "Se crió en los barrios más pobres de una ciudad dividida entre el progreso y la miseria extrema.",
      "Empezó su vida en el crimen antes de unirse a las fuerzas del orden por un sentido de justicia propio.",
      "Busca sin descanso a su hermana menor, de quien fue separada en una noche que cambió todo.",
      "Sus puños mecánicos hextech pueden atravesar paredes — y enemigos — de un solo golpe.",
    ],
  },
  {
    id: "Thresh",
    name: "Thresh",
    region: "Islas de las Sombras",
    regionColor: "#66bb6a",
    clues: [
      "Habita las islas más oscuras y malditas de todo Runeterra, corrompidas por la Niebla Negra.",
      "En vida fue un guardián severo y cruel. En muerte se convirtió en algo mucho, mucho peor.",
      "Colecciona almas arrancadas a sus víctimas y las guarda en una linterna que porta consigo.",
      "Atrapa a sus presas con una cadena espectral y las arrastra hacia él antes de destruirlas.",
    ],
  },
  {
    id: "Hecarim",
    name: "Hecarim",
    region: "Islas de las Sombras",
    regionColor: "#66bb6a",
    clues: [
      "En vida fue un poderoso comandante de caballería. Su muerte en las islas lo transformó en terror puro.",
      "Cruzó las Islas Benditas en el momento exacto de la Ruina y fue consumido por la Niebla Negra.",
      "Lidera a los jinetes espectrales que cabalgan eternamente entre los muertos sin posibilidad de reposo.",
      "Es mitad hombre, mitad caballo espectral. Carga a velocidades imposibles aplastando todo a su paso.",
    ],
  },
  {
    id: "Azir",
    name: "Azir",
    region: "Shurima",
    regionColor: "#ffa726",
    clues: [
      "Gobernó el mayor y más glorioso imperio que el mundo haya conocido, hace más de tres mil años.",
      "Murió traicionado en el momento más importante de su reinado, por alguien en quien confiaba plenamente.",
      "Resucitó siglos después para encontrar que su gran ciudad era solo arena, ruinas y silencio.",
      "Convoca soldados de arena para batallar y reconstruye su capital desde las dunas con su sola voluntad.",
    ],
  },
  {
    id: "Nasus",
    name: "Nasus",
    region: "Shurima",
    regionColor: "#ffa726",
    clues: [
      "Es el guardián eterno de un gran imperio del desierto que cayó hace milenios.",
      "Su cuerpo fue transformado en el de un semidiós por el poder del Sol, otorgándole fuerza inmortal.",
      "Pasó milenios encerrado con su hermano que enloquecía lentamente, intentando contenerlo.",
      "Su bastón acumula poder con cada alma que consume, volviéndose más devastador con el tiempo.",
    ],
  },
  {
    id: "Kassadin",
    name: "Kassadin",
    region: "El Vacío",
    regionColor: "#ba68c8",
    clues: [
      "Dedicó su vida a estudiar las grietas entre dimensiones que aparecen al sur del mundo conocido.",
      "Lo que encontró en ese estudio lo transformó físicamente para siempre, y no de forma benévola.",
      "Busca desesperadamente a su hija, desaparecida en la dimensión más peligrosa de la realidad.",
      "Viste una máscara anti-magia y puede teleportarse a través del Vacío con cada salto que da.",
    ],
  },
  {
    id: "Leona",
    name: "Leona",
    region: "Monte Targon",
    regionColor: "#fff9c4",
    clues: [
      "Entrenó toda su vida en la montaña más alta y sagrada de Runeterra para alcanzar la cima.",
      "Fue elegida por una entidad cósmica para portar su poder y misión en el mundo mortal.",
      "Su fe en el poder del Sol fue tan absoluta que superó todas las pruebas que la montaña le puso.",
      "Invoca rayos solares directos y se envuelve en armadura de luz ardiente para proteger a sus aliados.",
    ],
  },
  {
    id: "MissFortune",
    name: "Miss Fortune",
    region: "Bilgewater",
    regionColor: "#26c6da",
    clues: [
      "Creció en el puerto más peligroso y sin ley de todo Runeterra, donde la vida vale poco.",
      "Presenció cuando era niña el asesinato de su madre y juró que el responsable lo pagaría.",
      "El hombre que destruyó su familia es el mismo que durante años dominó su ciudad entera con terror.",
      "Sus dos pistolas gemelas — los Colmillos — son tan precisas y letales como su sed de venganza.",
    ],
  },
  {
    id: "Gangplank",
    name: "Gangplank",
    region: "Bilgewater",
    regionColor: "#26c6da",
    clues: [
      "Durante años gobernó con puño de hierro el puerto más peligroso y caótico de Runeterra.",
      "Su poder no provenía de un ejército ni de la ley, sino del miedo que su nombre generaba.",
      "Fue derrocado por aquellos que había aplastado durante décadas, incluyendo a alguien con deuda personal.",
      "Come naranjas durante la batalla para regenerarse y dispara con una pistola mientras lucha con su espada.",
    ],
  },
];

export default QUIZ_CHAMPIONS;
