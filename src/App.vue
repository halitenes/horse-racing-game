<template>
  <div class="app">
    <header class="header">
      <h1>Horse Racing</h1>
      <div class="header-buttons">
        <button
          class="btn btn-primary"
          @click="generateProgram"
          :disabled="isRacing"
        >
          GENERATE PROGRAM
        </button>
        <button
          class="btn btn-secondary"
          @click="toggleRace"
          :disabled="!hasSchedule"
        >
          {{ raceButtonText }}
        </button>
      </div>
    </header>

    <main class="main-content">
      <HorseList />
      <RaceTrack />
      <ProgramPanel />
      <ResultsPanel />
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import HorseList from './components/HorseList.vue'
import RaceTrack from './components/RaceTrack.vue'
import ProgramPanel from './components/ProgramPanel.vue'
import ResultsPanel from './components/ResultsPanel.vue'

export default {
  name: 'App',
  components: {
    HorseList,
    RaceTrack,
    ProgramPanel,
    ResultsPanel
  },
  computed: {
    ...mapGetters(['hasSchedule', 'isRacing', 'isPaused', 'isFinished']),
    raceButtonText() {
      if (this.isFinished) return 'FINISHED'
      if (this.isPaused) return 'RESUME'
      if (this.isRacing) return 'PAUSE'
      return 'START'
    }
  },
  methods: {
    ...mapActions(['generateHorses', 'generateSchedule', 'startRace', 'pauseRace', 'resumeRace']),
    generateProgram() {
      this.generateHorses()
      this.generateSchedule()
    },
    toggleRace() {
      if (this.isFinished) return
      if (this.isRacing) {
        this.pauseRace()
      } else {
        if (this.isPaused) {
          this.resumeRace()
        } else {
          this.startRace()
        }
      }
    }
  }
}
</script>
