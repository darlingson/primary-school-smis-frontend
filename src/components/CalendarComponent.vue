<template>
  <div>
    <table class="table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">Sun</th>
          <th class="px-4 py-2">Mon</th>
          <th class="px-4 py-2">Tue</th>
          <th class="px-4 py-2">Wed</th>
          <th class="px-4 py-2">Thu</th>
          <th class="px-4 py-2">Fri</th>
          <th class="px-4 py-2">Sat</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in weeks" :key="week">
          <td v-for="day in week" :key="day.date" class="px-4 py-2">{{ day.day }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Day {
  date: string
  day: string
}

export default defineComponent({
  data() {
    return {
      currentDate: new Date()
    }
  },
  computed: {
    weeks(): Day[][] {
      const currentDate = new Date(this.currentDate)
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
      const startDate = new Date(firstDayOfMonth)
      startDate.setDate(startDate.getDate() - startDate.getDay()) // Start from Sunday
      const endDate = new Date(lastDayOfMonth)
      endDate.setDate(endDate.getDate() + (6 - endDate.getDay())) // End on Saturday

      const weeks: Day[][] = []
      let currentWeek: Day[] = []

      while (startDate <= endDate) {
        currentWeek.push({
          date: startDate.toISOString(),
          day: startDate.getDate().toString()
        })

        if (startDate.getDay() === 6) {
          weeks.push(currentWeek)
          currentWeek = []
        }

        startDate.setDate(startDate.getDate() + 1)
      }

      return weeks
    }
  }
})
</script>

<style>
/* You can include additional Tailwind CSS styles here */
</style>
