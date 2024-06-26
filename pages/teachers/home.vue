<template>
  <div class="container mx-auto p-6">
    <header class="bg-blue-600 text-white p-6 rounded mb-6 shadow-lg">
      <h1 class="text-3xl font-bold">Welcome to the School Management System</h1>
      <p v-if="userEmail" class="mt-2">Logged in as: <strong>{{ userEmail }}</strong></p>
    </header>
    <main class="flex">
      <section class="w-2/3 pr-4">
        <div v-if="role" class="bg-gray-100 p-6 rounded mb-6 shadow-md">
          <p class="text-xl">Your Role: <strong>{{ role }}</strong></p>
        </div>
        <div v-if="teacherSchool" class="bg-white p-6 rounded mb-6 shadow-md">
          <h2 class="text-2xl font-semibold mb-4">Your School Information</h2>
          <p class="mb-2"><strong>School Name:</strong> {{ teacherSchool.school.name }}</p>
          <p><strong>School Type:</strong> {{ teacherSchool.school.type }}</p>
        </div>
      </section>
      </main>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
const { authenticated, userEmail, role, school } = storeToRefs(useAuthStore());
definePageMeta({
  middleware: 'auth2'
})
interface SchoolDetails {
  _id: string;
  name: string;
  type: string;
  address: string;
  location: string;
  email: string;
  phone: string;
  adminEmail: string;
  __v: number;
}
interface SchoolTeacher {
  school: SchoolDetails;
}
const teacherSchool = ref<SchoolTeacher | null>(null);
const result = await useFetch<SchoolTeacher>('/api/school/' + school.value);
teacherSchool.value = result.data.value;
</script>

<style>

</style>