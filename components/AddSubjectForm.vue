<template>
  <form @submit.prevent="addSubject">
    <h2 class="text-xl font-semibold mb-4">Add New Subject</h2>
    <label for="subjectName" class="block mb-2">Subject Name:</label>
    <input type="text" id="subjectName" v-model="subjectName" class="border-gray-300 border p-2 mb-4 rounded-md w-full"
      required>
    <div v-if="!isLoading">
      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Add Subject</button>
    </div>
    <div v-else>
      <LoadingComponent />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
const { authenticated, userEmail, role, school, _id } = storeToRefs(useAuthStore());
const subjectName = ref('');
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const addSubject = async () => {
  isLoading.value = true;
  const payload = {
    name: subjectName.value,
    school: school
  }
  // await useFetch('/api/classes', {
  //   method: 'POST',
  //   body: payload
  // }).then((res) => res.json()).then((data) => {
  //   console.log(data)
  // })
  try {
    await useFetch(`/api/classes`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (error:any) {
    console.error(error);
    errorMessage.value = error.message;
    isLoading.value = false;
  }
  console.log('Adding subject:', subjectName.value);
  // Reset form fields after submission
  subjectName.value = '';
  isLoading.value = false;
}
</script>