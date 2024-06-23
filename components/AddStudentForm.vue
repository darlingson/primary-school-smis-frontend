<template>
    <form @submit.prevent="registerStudent">
      <h2 class="text-xl font-semibold mb-4">Register New Student</h2>
      <label for="studentName" class="block mb-2">Student Name:</label>
      <input type="text" id="studentName" v-model="studentName" class="border-gray-300 border p-2 mb-4 rounded-md w-full" required>
      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Register Student</button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const studentName = ref('');
  
  const registerStudent = () => {
    // Add logic to handle registering a new student (e.g., API call)
    console.log('Registering student:', studentName.value);
    // Reset form fields after submission
    studentName.value = '';
  }
  </script>
  