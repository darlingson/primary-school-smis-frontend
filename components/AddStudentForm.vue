<template>
  <form @submit.prevent="registerStudent">
    <h2 class="text-xl font-semibold mb-4">Register New Student</h2>
    <label for="studentName" class="block mb-2">Student Name:</label>
    <input type="text" id="studentName" v-model="studentName" class="border-gray-300 border p-2 mb-4 rounded-md w-full"
      required>
    <label for="className" class="block mb-2">Class Name:</label>
    <select id="className" v-model="className" class="border-gray-300 border p-2 mb-4 rounded-md w-full">
      <option value="" disabled selected>Select class</option>
      <option v-for="schoolClass in classes" :key="schoolClass._id" :value="schoolClass._id">{{ schoolClass.name }}
      </option>
    </select>
    <label for="homeAddress" class="block mb-2">Home address</label>
    <input type="text" id="homeAddress" v-model="homeAddress" class="border-gray-300 border p-2 mb-4 rounded-md w-full"
      required>
    <label for="guardianName" class="block mb-2">Guardian Name</label>
    <input type="text" id="guardianName" v-model="guardianName"
      class="border-gray-300 border p-2 mb-4 rounded-md w-full" required>
    <label for="guardianPhone" class="block mb-2">Guardian Phone</label>
    <input type="text" id="guardianPhone" v-model="guardianPhone"
      class="border-gray-300 border p-2 mb-4 rounded-md w-full" required>
    <label for="guardianEmail" class="block mb-2">Guardian Email</label>
    <input type="text" id="guardianEmail" v-model="guardianEmail"
      class="border-gray-300 border p-2 mb-4 rounded-md w-full" required>
    <div v-if="isLoading" class="text-center">
      <LoadingComponent />
    </div>
    <div v-else>
      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Register Student</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LoadingComponent from './LoadingComponent.vue';
const studentName = ref('');
const classes = ref<SchoolClass[] | null>(null);
const errorMessage = ref<string | null>(null);
const className = ref('');
const classID = ref('');
const homeAddress = ref('');
const guardianName = ref('');
const guardianPhone = ref('');
const guardianEmail = ref('');
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
const { authenticated, userEmail, role, school, _id } = storeToRefs(useAuthStore());
const isLoading = ref(false);

interface SchoolClass {
  _id: string;
  name: string;
  school: string;
  students: string[];
  subjects: string[];
  __v: number;
}

const registerStudent = async () => {
  // Add logic to handle registering a new student (e.g., API call)
  isLoading.value = true;
  const payload = {
    name: studentName.value,
    class: className.value,
    school: school.value,
    homeAddress: homeAddress.value,
    guardian: guardianName.value,
    guardianPhone: guardianPhone.value,
    guardianEmail: guardianEmail.value
  }

  try {
    const { data } = await useFetch(`/api/students`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (!data.value?.success) {
      console.log(data.value?.success)
      console.log(data?.value?.message)
      errorMessage.value = data?.value!.message;
      isLoading.value = false;
    }
    else if (data.value?.success) {
      //the registration was successful
      errorMessage.value = data?.value!.message;
      // Reset form fields after submission
      clearForm();
      isLoading.value = false;
    }
  }
  catch (error: any) {
    console.error(error);
    errorMessage.value = error.message;
    isLoading.value = false;
  }


  console.log('Registering student:', payload);
}
const clearForm = () => {
  // Reset form fields after submission
  studentName.value = '';
  className.value = '';
  homeAddress.value = '';
  guardianName.value = '';
  guardianPhone.value = '';
  guardianEmail.value = '';
}
const fetchClasses = async () => {
  try {
    const { data } = await useFetch<{ message: string, classes: SchoolClass[], success: boolean }>(`/api/classes/${school.value}/schoolclasses`);
    console.log(data)
    if (!data.value?.success) {
      console.log(data.value?.success)
      console.log(data?.value?.message)
      errorMessage.value = data?.value!.message;
    }
    else if (data.value?.success) {
      classes.value = data?.value?.classes;
      errorMessage.value = data?.value!.message;
    }
  } catch (error: any) {
    console.error(error);
    errorMessage.value = error.message;
  }
}

fetchClasses();
</script>