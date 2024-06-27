<template>
  <div class="container mx-auto p-6">
    <header class="bg-blue-600 text-white p-6 rounded mb-6 shadow-lg">
      <h1 class="text-3xl font-bold">Welcome <span class="font-normal">{{ userInfo?.name }} </span> to the School
        Management System</h1>
      <p v-if="userEmail" class="mt-2">Logged in as: <strong>{{ userEmail }}</strong></p>
    </header>
    <main class="flex">
      <section class="w-2/3 pr-4">
        <div v-if="role" class="bg-gray-100 p-6 rounded mb-6 shadow-md">
          <p class="text-xl">Your Role: <strong>{{ role }}</strong></p>
        </div>
        <div v-if="teacherSchool" class="bg-white p-6 rounded mb-6 shadow-md">
          <h2 class="text-2xl font-semibold mb-4">School Information</h2>
          <p class="mb-2"><strong>School Name:</strong> {{ teacherSchool.school.name }}</p>
          <p><strong>School Type:</strong> {{ teacherSchool.school.type }}</p>
        </div>
      </section>
      <section class="w-1/3 pl-4">
        <div class="bg-gray-50 p-6 rounded shadow-md">
          <h2 class="text-2xl font-semibold mb-4">Assigned Subjects</h2>
          <div v-if="!assignedSubjects.length" class="text-center text-gray-500">No subjects assigned yet.</div>
          <ul>
            <li v-for="subject in assignedSubjects" :key="subject._id" class="mb-2">
              {{ subject.name }}
            </li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
const { authenticated, userEmail, role, school, _id } = storeToRefs(useAuthStore());
const userInfo = ref<UserInfo | null>(null);
const assignedSubjects = ref<any[]>([]);
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
interface UserInfo {
  _id: string;
  name: string;
  email: string;
  role: string;
  school: string;
}
interface SchoolTeacher {
  school: SchoolDetails;
}
const teacherSchool = ref<SchoolTeacher | null>(null);
const result = await useFetch<SchoolTeacher>('/api/school/' + school.value);
teacherSchool.value = result.data.value;


const userInforesult = await useFetch<any>('/api/teachers/' + _id.value);
userInfo.value = userInforesult.data.value.user_info as UserInfo;

const assignedSubjectsResult = await useFetch<any>(`/api/teachers/${_id.value}/assignments/`);
assignedSubjects.value = assignedSubjectsResult.data.value.assignments;
console.log(assignedSubjects.value)
</script>

<style></style>