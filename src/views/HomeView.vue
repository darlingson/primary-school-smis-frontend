<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
</script>

<!-- <template>
  <main>
    <TheWelcome />
  </main>
</template> -->

<template>
  <div class="min-h-screen bg-teal-500">
    <header class="bg-teal-600 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-white text-2xl font-bold">Primary School Admin Dashboard</h1>
        <!-- You can add any navigation elements here -->
      </div>
    </header>
    <main class="container mx-auto mt-8">
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold mb-4">Manage Students</h2>
          <!-- Add icon/image and description -->
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold mb-4">Manage Teachers</h2>
          <!-- Add icon/image and description -->
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold mb-4">View Reports</h2>
          <!-- Add icon/image and description -->
        </div>
        <!-- Add more sections as needed -->
      </section>
    </main>
    <footer class="bg-teal-600 p-4 mt-8">
      <div class="container mx-auto text-white text-center">
        <p>&copy; 2024 Primary School Admin Dashboard</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts"></script>
