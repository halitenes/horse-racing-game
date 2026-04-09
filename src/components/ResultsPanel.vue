<template>
  <div class="panel">
    <div class="panel-header">Results</div>
    <div class="panel-content">
      <div v-if="results.length === 0" class="empty-message">
        No results yet
      </div>
      <div v-for="(result, index) in results" :key="index" class="round-section">
        <div class="round-header">
          {{ result.name }} - {{ result.distance }}m
        </div>
        <table>
          <thead>
            <tr>
              <th>Pos</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(horse, hIndex) in result.ranking" :key="horse.id">
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
  name: 'ResultsPanel',
  computed: {
    ...mapState(['results'])
  }
}
</script>

<style scoped>
.round-section {
  margin-bottom: 15px;
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
