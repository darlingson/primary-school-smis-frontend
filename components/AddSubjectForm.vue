<template>
    <form @submit.prevent="addSubject">
      <h2 class="text-xl font-semibold mb-4">Add New Subject</h2>
      <label for="subjectName" class="block mb-2">Subject Name:</label>
      <input type="text" id="subjectName" v-model="subjectName" class="border-gray-300 border p-2 mb-4 rounded-md w-full" required>
      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Add Subject</button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const subjectName = ref('');
  
  const addSubject = () => {
    // Add logic to handle adding a new subject (e.g., API call)
    console.log('Adding subject:', subjectName.value);
    // Reset form fields after submission
    subjectName.value = '';
  }
  </script>
  