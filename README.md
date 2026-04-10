# Horse Racing Game

Interactive horse racing simulation game built with Vue 3 and Vuex.

## Features

- 20 unique horses with different conditions (1-100)
- 6 race rounds with varying distances (1200m - 2200m)
- Real-time race animation
- Race schedule generation
- Results tracking for each round
- Start/Pause functionality

## Tech Stack

- Vue 3
- Vuex 4 (State Management)
- Vite (Build Tool)
- Vitest (Unit Testing)

## Project Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run unit tests
npm test

# Build for production
npm run build
```

## How to Play

1. Click **"Generate Program"** to create a new race schedule with 6 rounds
2. Click **"Start"** to begin the race
3. Watch horses compete in each round
4. View results in the Results panel after each round completes
5. Use **"Pause"** to stop the race temporarily

## Project Structure

```
src/
├── components/
│   ├── HorseList.vue      # Displays all 20 horses
│   ├── RaceTrack.vue      # Race animation and track
│   ├── ProgramPanel.vue   # Shows race schedule
│   └── ResultsPanel.vue   # Displays race results
├── store/
│   └── index.js           # Vuex store (horses, schedule, results)
├── __tests__/
│   └── store.spec.js      # Unit tests
├── App.vue
└── main.js
```

## Game Rules

- Each race consists of 6 rounds
- 10 random horses are selected for each round
- Horse speed is influenced by their condition score
- Round distances: 1200m, 1400m, 1600m, 1800m, 2000m, 2200m
