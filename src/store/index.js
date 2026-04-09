import { createStore } from 'vuex'

const HORSE_NAMES = [
  'Bold Pilot', 'Kafkasli', 'Turbo', 'Haberbatur', 'Devirhan',
  'Odin', 'Ozgunhan', 'Yelhan', 'Timurhan', 'Mirhat',
  'Tansel', 'Bozdağ', 'Mandrake', 'Dragon', 'Hucum',
  'Keremhan', 'Ribella', 'Damista', 'Anatoly', 'Sunday'
]

const HORSE_COLORS = [
  '#FF0000', '#0066FF', '#00CC00', '#FFD700', '#9900FF',
  '#FF6600', '#00CCCC', '#FF0099', '#006600', '#CC0000',
  '#3333FF', '#FFCC00', '#660066', '#00FF99', '#FF3366',
  '#0099CC', '#CC6600', '#333333', '#99CC00', '#FF66CC'
]

const ROUND_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200]

function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function getLapName(index) {
  const names = ['1ST', '2ND', '3RD', '4TH', '5TH', '6TH']
  return `${names[index]} Lap`
}

export default createStore({
  state: {
    horses: [],
    schedule: [],
    results: [],
    currentRoundIndex: 0,
    status: 'idle',
    horsePositions: {},
    animationId: null
  },

  getters: {
    hasSchedule: state => state.schedule.length > 0,
    isRacing: state => state.status === 'running',
    isPaused: state => state.status === 'paused',
    isFinished: state => state.status === 'finished',
    currentRound: state => state.schedule[state.currentRoundIndex] || null
  },

  mutations: {
    SET_HORSES(state, horses) {
      state.horses = horses
    },
    SET_SCHEDULE(state, schedule) {
      state.schedule = schedule
    },
    SET_STATUS(state, status) {
      state.status = status
    },
    SET_CURRENT_ROUND(state, index) {
      state.currentRoundIndex = index
    },
    ADD_RESULT(state, result) {
      state.results.push(result)
    },
    RESET_RACE(state) {
      state.results = []
      state.currentRoundIndex = 0
      state.status = 'idle'
      state.horsePositions = {}
    },
    UPDATE_POSITION(state, { horseId, position }) {
      state.horsePositions = { ...state.horsePositions, [horseId]: position }
    },
    RESET_POSITIONS(state) {
      state.horsePositions = {}
    },
    SET_ANIMATION_ID(state, id) {
      state.animationId = id
    }
  },

  actions: {
    generateHorses({ commit }) {
      const horses = HORSE_NAMES.map((name, i) => ({
        id: i + 1,
        name,
        color: HORSE_COLORS[i],
        condition: Math.floor(Math.random() * 100) + 1
      }))
      commit('SET_HORSES', horses)
    },

    generateSchedule({ commit, state }) {
      commit('RESET_RACE')
      const schedule = ROUND_DISTANCES.map((distance, i) => ({
        name: getLapName(i),
        distance,
        horses: shuffle(state.horses).slice(0, 10)
      }))
      commit('SET_SCHEDULE', schedule)
    },

    startRace({ commit, dispatch }) {
      commit('SET_STATUS', 'running')
      commit('RESET_POSITIONS')
      dispatch('runRound')
    },

    pauseRace({ commit, state }) {
      commit('SET_STATUS', 'paused')
      if (state.animationId) {
        cancelAnimationFrame(state.animationId)
        commit('SET_ANIMATION_ID', null)
      }
    },

    resumeRace({ commit, dispatch }) {
      commit('SET_STATUS', 'running')
      dispatch('runRound')
    },

    runRound({ commit, state, dispatch }) {
      const round = state.schedule[state.currentRoundIndex]
      if (!round) {
        commit('SET_STATUS', 'finished')
        return
      }

      const raceData = {}
      round.horses.forEach(horse => {
        const speed = 0.7 + (horse.condition / 100) * 0.5 + Math.random() * 0.2
        raceData[horse.id] = { position: 0, speed, finished: false }
        commit('UPDATE_POSITION', { horseId: horse.id, position: 0 })
      })

      const duration = 4000 + (round.distance - 1200) * 3
      const startTime = performance.now()
      const finishOrder = []

      const animate = (now) => {
        if (state.status !== 'running') return

        const elapsed = now - startTime
        const progress = elapsed / duration

        round.horses.forEach(horse => {
          const data = raceData[horse.id]
          if (!data.finished) {
            const wobble = Math.sin(elapsed / 150 + horse.id * 0.5) * 0.01
            data.position = Math.min(progress * data.speed + wobble, 1)
            commit('UPDATE_POSITION', { horseId: horse.id, position: Math.max(0, data.position) })

            if (data.position >= 0.98) {
              data.finished = true
              commit('UPDATE_POSITION', { horseId: horse.id, position: 1 })
              if (!finishOrder.includes(horse.id)) {
                finishOrder.push(horse.id)
              }
            }
          }
        })

        if (finishOrder.length === round.horses.length) {
          const ranking = finishOrder.map(id => round.horses.find(h => h.id === id))
          commit('ADD_RESULT', { name: round.name, distance: round.distance, ranking })

          const nextIndex = state.currentRoundIndex + 1
          if (nextIndex < state.schedule.length) {
            setTimeout(() => {
              if (state.status === 'running') {
                commit('SET_CURRENT_ROUND', nextIndex)
                commit('RESET_POSITIONS')
                dispatch('runRound')
              }
            }, 1500)
          } else {
            commit('SET_STATUS', 'finished')
          }
          return
        }

        commit('SET_ANIMATION_ID', requestAnimationFrame(animate))
      }

      commit('SET_ANIMATION_ID', requestAnimationFrame(animate))
    }
  }
})
