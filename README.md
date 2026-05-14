# League of Legends – El Nexus

Proyecto frontend desarrollado en **React** inspirado en el universo de **League of Legends**.  
Arranca como un cliente de lobby y fue creciendo hasta convertirse en una experiencia completa: lore, exploración, quizzes, catálogo de skins en vivo y secretos desbloqueables.

🌐 **Demo en producción:** https://solopez.github.io/league-of-legends

> ⚠️ Este proyecto es **fan-made** y no tiene ninguna afiliación oficial con Riot Games.  
> Todos los assets, datos de campeones y skins pertenecen a Riot Games.

<img width="1428" height="1100" alt="image" src="https://github.com/user-attachments/assets/22e3a70a-a175-4742-a755-912c479cd3bc" />

<img width="1428" height="1097" alt="image" src="https://github.com/user-attachments/assets/9c2c36b5-47d4-4127-964f-12bec3042789" />

<img width="1431" height="1088" alt="image" src="https://github.com/user-attachments/assets/86e154a0-1b7a-4f3b-91a7-4190796cd9f7" />


---

## ✨ Secciones

### 🏠 El Nexus · Hub principal
Pantalla de entrada con navegación estilo profecía. Cada frase lleva a una sección del sitio. Incluye un banner en vivo con el parche actual y contador de skins nuevas. Contiene secretos desbloqueables según las secciones que visitás.

### 🎮 Lobby
Lobby de partida estilo cliente oficial. Slots de jugadores con `PlayerCard` y `EmptySlot`, modelos 3D animados con `<model-viewer>`, y transición a la selección de campeones.

### 🖼️ Selección de Campeones
Grid de campeones con datos reales vía **Data Dragon API**. Al seleccionar uno se despliega su lore, región, dificultad y habilidades. Anima con Framer Motion.

### ⚔️ Partida 1v1
Mini-juego: reducí la vida del enemigo antes de que te elimine. Integrado al flujo lobby → champion select → game.

### 🌍 Mapa de Runeterra
Mapa interactivo con puntos de región animados. Al hacer clic en una región se despliega su descripción y campeones asociados.

### 📜 Línea del Tiempo
Cronología del lore de Runeterra con eventos históricos. Cada evento abre un modal con descripción completa, imagen y campeones relacionados.

### 🧭 Explorador de Campeones
Catálogo completo de campeones con búsqueda, filtro por región y ficha detallada con habilidades.

### 🧩 Quiz · ¿Quién soy?
Adivinar el campeón a partir de pistas progresivas. Puntuación por velocidad de respuesta.

### 🎨 Catálogo de Skins · Parche actual
Catálogo en vivo de **todas las skins** del juego, con detección automática de las nuevas en el parche actual. Filtros por rareza (Épica, Legendaria, Mítica, Ultimate, Legacy), buscador, paginación y modal de splash art. Datos obtenidos de **Community Dragon** en una sola request.

### 🔮 El Oráculo *(desbloqueable)*
Quiz de personalidad de 3 preguntas que te asigna un arquetipo (Guerrero, Sabio, Explorador, Observador) y te redirige a la región que te corresponde. Se desbloquea al visitar varias secciones.

### ◈ El Sanctum *(desbloqueable)*
Colección de 7 secretos del lore de Runeterra, presentados como revelaciones con animaciones. Se desbloquea al completar el Oráculo.

---

## 🧱 Stack tecnológico

| Categoría | Tecnología |
|---|---|
| Framework | **React 19** |
| Lenguaje | **TypeScript** |
| Build tool | **Vite** |
| Estilos | **Tailwind CSS v4** |
| Animaciones | **Framer Motion v12** |
| Routing | **React Router DOM** |
| Modelos 3D | **@google/model-viewer** |
| Testing | **Vitest + React Testing Library** |
| APIs | **Data Dragon · Community Dragon** |

---

## 🌐 APIs utilizadas

- **[Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon)** — versiones de parche, datos de campeones, splash arts, loading arts
- **[Community Dragon](https://www.communitydragon.org/)** — catálogo completo de skins con rareza y metadata

---

## 📁 Estructura principal

```
src/
├── components/         # Todas las pantallas y componentes UI
│   ├── NexusHub        # Hub / home con navegación
│   ├── GameLobby       # Lobby de partida
│   ├── ChampionSelect  # Selección de campeones
│   ├── ChampionExplorer# Catálogo de campeones
│   ├── ChampionQuiz    # Quiz ¿Quién soy?
│   ├── RuneterraMap    # Mapa interactivo
│   ├── LoreTimeline    # Línea del tiempo
│   ├── PatchSkins      # Catálogo de skins en vivo
│   ├── Oraculo         # Quiz de personalidad (secreto)
│   ├── Sanctum         # Colección de secretos (secreto)
│   └── Game            # Partida 1v1
├── constants/
│   └── cdn.ts          # URLs centralizadas de APIs
├── data/
│   ├── champions.ts    # Lore y abilities locales
│   ├── regions.ts      # Datos de regiones de Runeterra
│   └── timeline.ts     # Eventos de la línea del tiempo
└── utils/
    └── visited.ts      # Lógica de desbloqueo de secretos
```

---

## 🚀 Correr en local

```bash
npm install
npm run dev
```

```bash
# Tests
npm run test
```

---

