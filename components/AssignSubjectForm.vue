<template>
  <form @submit.prevent="assignSubject">
    <h2 class="text-xl font-semibold mb-4">Assign Subject to Teacher</h2>

    <label for="subject" class="block mb-2">Subject:</label>
    <input 
      type="text" 
      id="subject" 
      v-model="subject" 
      class="border-gray-300 border p-2 mb-4 rounded-md w-full" 
      required 
    />

    <label for="teacher" class="block mb-2">Teacher:</label>
    <select 
      id="teacher" 
      v-model="selectedTeacherId" 
      @change="updateTeacherDetails" 
      class="border-gray-300 border p-2 mb-4 rounded-md w-full"
      required
    >
      <option v-for="teacher in teachers" :key="teacher._id" :value="teacher._id">{{ teacher.name }}</option>
    </select>

    <div v-if="selectedTeacher">
      <p><strong>Name:</strong> {{ selectedTeacher.name }}</p>
      <p><strong>Email:</strong> {{ selectedTeacher.email }}</p>
    </div>

    <button 
      type="submit" 
      class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
    >
      Assign Subject
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

definePageMeta({
  middleware: 'auth2'
});

const { authenticated, userEmail, role, school } = storeToRefs(useAuthStore());

const subject = ref('');
const selectedTeacherId = ref('');
const selectedTeacher = ref<any | null>(null);
const teachers = ref<any[]>([]);

const assignSubject = () => {
  // Add logic to handle assigning a subject to a teacher (e.g., API call)
  console.log('Assigning subject:', subject.value, 'to teacher:', selectedTeacher.value.name);
  // Reset form fields after submission
  subject.value = '';
  selectedTeacherId.value = '';
  selectedTeacher.value = null;
};

const updateTeacherDetails = () => {
  selectedTeacher.value = teachers.value.find(teacher => teacher._id === selectedTeacherId.value) || null;
};

console.log("getting schools");
await useFetch(`/api/teachers/school/${school.value}`, {
  method: 'GET',
}).then((response) => {
  if (response.data.value) {
    teachers.value = response.data.value.teachers;
    console.log(response.data.value);
  }
});
</script>
