<template>
  <div class="panel">
    <div class="panel-header">Program</div>
    <div class="panel-content">
      <div v-if="schedule.length === 0" class="empty-message">
        No program generated yet
      </div>
      <div v-for="(round, index) in schedule" :key="index" class="round-section">
        <div class="round-header" :class="{ active: index === currentRoundIndex }">
          {{ round.name }} - {{ round.distance }}m
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(horse, hIndex) in round.horses" :key="horse.id">
              <td>{{ hIndex + 1 }}</td>
              <td>
                <span class="color-dot" :style="{ background: horse.color }"></span>
                {{ horse.name }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProgramPanel',
  computed: {
    ...mapState(['schedule', 'currentRoundIndex'])
  }
}
</script>

<style scoped>
.round-section {
  margin-bottom: 15px;
}

.round-header.active {
  background: #4CAF50;
  color: white;
}

.color-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 6px;
}

.empty-message {
  color: #999;
  text-align: center;
  padding: 20px;
  font-size: 14px;
}
</style>
