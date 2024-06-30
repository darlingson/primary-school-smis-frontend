<template>
  <form @submit.prevent="addSubject">
    <h2 class="text-xl font-semibold mb-4">Add New Subject</h2>
    <label for="className" class="block mb-2">Class Name:</label>
    <select id="className" v-model="className" class="border-gray-300 border p-2 mb-4 rounded-md w-full">
      <option value="" disabled selected>Select class</option>
      <option v-for="schoolClass in classes" :key="schoolClass._id" :value="schoolClass._id">{{ schoolClass.name }}
      </option>
    </select>
    <label for="subjectName" class="block mb-2">Subject Name:</label>
    <input type="text" id="subjectName" v-model="subjectName" class="border-gray-300 border p-2 mb-4 rounded-md w-full"
      required>
    <div>
      <label for="subjectType" class="block mb-2">Subject Type:</label>
      <select id="subjectType" v-model="subjectType" class="border-gray-300 border p-2 mb-4 rounded-md w-full">
        <option value="" disabled selected>Select subject type</option>
        <option v-for="type, index in subjectTypesList" :key="type" :value="type">{{ type }} </option>
      </select>
    </div>
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
const subjectType = ref('');
const className = ref('');
const classID = ref('');
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const classes = ref<SchoolClass[]>();
const subjectTypesList = ["science", "humanities", "socialStudies", "language", "other"]
const addSubject = async () => {
  isLoading.value = true;
  const payload = {
    name: subjectName.value,
    type: subjectType.value,
    class: className.value,
    school: school
  }
  try {
    const { data } = await useFetch(`/api/subjects`, {
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
      errorMessage.value = data?.value!.message;
      // Reset form fields after submission
      subjectName.value = '';
      subjectType.value = '';
      className.value = '';
      classID.value = '';
      isLoading.value = false;
    }
  } catch (error: any) {
    console.error(error);
    errorMessage.value = error.message;
    isLoading.value = false;
  }
  console.log('Adding subject:', subjectName.value);
}
interface SchoolClass {
  _id: string;
  name: string;
  school: string;
  students: string[];
  subjects: string[];
  __v: number;
}

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
const getClasses = async () => {

}
getClasses();
</script>