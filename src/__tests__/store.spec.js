import { describe, it, expect, beforeEach } from 'vitest'
import store from '../store'

describe('Vuex Store', () => {
  beforeEach(() => {
    store.commit('SET_HORSES', [])
    store.commit('SET_SCHEDULE', [])
    store.commit('RESET_RACE')
  })

  describe('generateHorses', () => {
    it('should generate 20 horses', async () => {
      await store.dispatch('generateHorses')
      expect(store.state.horses.length).toBe(20)
    })

    it('each horse should have unique color', async () => {
      await store.dispatch('generateHorses')
      const colors = store.state.horses.map(h => h.color)
      const uniqueColors = [...new Set(colors)]
      expect(uniqueColors.length).toBe(20)
    })

    it('each horse should have condition between 1-100', async () => {
      await store.dispatch('generateHorses')
      store.state.horses.forEach(horse => {
        expect(horse.condition).toBeGreaterThanOrEqual(1)
        expect(horse.condition).toBeLessThanOrEqual(100)
      })
    })
  })

  describe('generateSchedule', () => {
    beforeEach(async () => {
      await store.dispatch('generateHorses')
    })

    it('should generate 6 rounds', async () => {
      await store.dispatch('generateSchedule')
      expect(store.state.schedule.length).toBe(6)
    })

    it('each round should have 10 horses', async () => {
      await store.dispatch('generateSchedule')
      store.state.schedule.forEach(round => {
        expect(round.horses.length).toBe(10)
      })
    })

    it('rounds should have correct distances', async () => {
      await store.dispatch('generateSchedule')
      const distances = store.state.schedule.map(r => r.distance)
      expect(distances).toEqual([1200, 1400, 1600, 1800, 2000, 2200])
    })
  })

  describe('getters', () => {
    it('hasSchedule should return false when empty', () => {
      expect(store.getters.hasSchedule).toBe(false)
    })

    it('hasSchedule should return true after generating', async () => {
      await store.dispatch('generateHorses')
      await store.dispatch('generateSchedule')
      expect(store.getters.hasSchedule).toBe(true)
    })
  })
})
