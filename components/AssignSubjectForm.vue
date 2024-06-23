<template>
    <form @submit.prevent="assignSubject">
      <h2 class="text-xl font-semibold mb-4">Assign Subject to Teacher</h2>
      <label for="subject" class="block mb-2">Subject:</label>
      <input type="text" id="subject" v-model="subject" class="border-gray-300 border p-2 mb-4 rounded-md w-full" required>
      <label for="teacher" class="block mb-2">Teacher:</label>
      <input type="text" id="teacher" v-model="teacher" class="border-gray-300 border p-2 mb-4 rounded-md w-full" required>
      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Assign Subject</button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const subject = ref('');
  const teacher = ref('');
  
  const assignSubject = () => {
    // Add logic to handle assigning a subject to a teacher (e.g., API call)
    console.log('Assigning subject:', subject.value, 'to teacher:', teacher.value);
    // Reset form fields after submission
    subject.value = '';
    teacher.value = '';
  }
  </script>
  