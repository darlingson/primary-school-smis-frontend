<template>
    <form @submit.prevent="addClass">
      <h2 class="text-xl font-semibold mb-4">Add New Class</h2>
      <label for="className" class="block mb-2">Class Name:</label>
      <input type="text" id="className" v-model="className" class="border-gray-300 border p-2 mb-4 rounded-md w-full" required>
      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Add Class</button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const className = ref('');
  
  const addClass = () => {
    // Add logic to handle adding a new class (e.g., API call)
    console.log('Adding class:', className.value);
    // Reset form fields after submission
    className.value = '';
  }
  </script>
  