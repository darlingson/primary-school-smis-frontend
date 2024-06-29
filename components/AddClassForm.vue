<template>
  <form @submit.prevent="addClass">
    <h2 class="text-xl font-semibold mb-4">Add New Class</h2>
    <label for="className" class="block mb-2">Class Name:</label>
    <input type="text" id="className" v-model="className" class="border-gray-300 border p-2 mb-4 rounded-md w-full"
      required>
    <div v-if="!isLoading">
      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Add Class</button>
    </div>
    <div v-else>
      <LoadingComponent />
    </div>
    <div>
      {{ errorMessage }}
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const className = ref('');
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import LoadingComponent from './LoadingComponent.vue';
const { authenticated, userEmail, role, school, _id } = storeToRefs(useAuthStore());
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const addClass = async () => {
  console.log('Adding class:', className.value);
  isLoading.value = true;
  const payload = {
    name: className.value,
    school: school.value
  }
  try {
    const { data } = await useFetch(`/api/classes`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (!data.value?.success) {
      console.log(data.value?.success)
      console.log(data?.value?.message)
      errorMessage.value = data?.value!.message;
      isLoading.value = false;
    }
    else if(data.value?.success){
      errorMessage.value = data?.value!.message;
    }
  } catch (error: any) {
    console.error(error);
    errorMessage.value = error.message;
    isLoading.value = false;
  }
  // Reset form fields after submission
  isLoading.value = false;
  // Reset form fields after submission
  className.value = '';
}
</script>