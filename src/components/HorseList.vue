<template>
  <div class="panel">
    <div class="panel-header">Horse List (1-20)</div>
    <div class="panel-content">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Condition</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="horse in horses" :key="horse.id">
            <td>{{ horse.name }}</td>
            <td>{{ horse.condition }}</td>
            <td>
              <span class="color-box" :style="{ background: horse.color }"></span>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="horses.length === 0" class="empty-message">
        Click "Generate Program" to create horses
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HorseList',
  computed: {
    ...mapState(['horses'])
  }
}
</script>

<style scoped>
.empty-message {
  color: #999;
  text-align: center;
  padding: 20px;
  font-size: 14px;
}
</style>
