<!-- <script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
</script> -->

<!-- <template>
  <main>
    <TheWelcome />
  </main>
</template> -->

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-teal-600 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-white text-2xl font-bold">School Management System</h1>
        <!-- Add any navigation elements here -->
      </div>
    </header>
    <main class="container mx-auto mt-8">
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Dashboard Overview</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white p-4 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold mb-2">Total Students</h3>
            <p class="text-gray-700">500</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold mb-2">Total Teachers</h3>
            <p class="text-gray-700">25</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold mb-2">Upcoming Events</h3>
            <p class="text-gray-700">Parent-Teacher Meeting (May 20)</p>
          </div>
        </div>
      </section>
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Quick Links</h2>
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <li class="bg-white p-4 rounded-lg shadow-md">Gradebook</li>
          <li class="bg-white p-4 rounded-lg shadow-md">Attendance</li>
          <li class="bg-white p-4 rounded-lg shadow-md">Courses</li>
          <li class="bg-white p-4 rounded-lg shadow-md">Reports</li>
        </ul>
      </section>
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Announcements</h2>
        <ul>
          <li class="mb-2">New Class Schedule for the Spring Semester</li>
          <li class="mb-2">Upcoming Field Trip to the Science Museum</li>
        </ul>
      </section>

      <section class="mb-8 mx-auto">
        <h2 class="text-xl font-semibold mb-4">Calendar</h2>
        <Calendar />
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-teal-600 p-4 mt-8">
      <div class="container mx-auto text-white text-center">
        <p>&copy; 2024 School Management System</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import Calendar from '@/components/CalendarComponent.vue'
</script>
