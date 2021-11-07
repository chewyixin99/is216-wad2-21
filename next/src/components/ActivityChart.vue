<template>
  <div>
    <canvas id="activity-chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
import ActivityData from './activity-data.js'

export default {
  name: 'ActivityChart',
  data() {
    return {
      ActivityData: ActivityData
    }
  },
  mounted() {
    const ctx = document.getElementById('activity-chart');
    new Chart(ctx, this.ActivityData);
  }
}
</script>