<template>
  <div class="container mx-auto p-6">
    <div class="flex flex-col md:flex-row justify-between items-center bg-gray-100 rounded shadow-lg p-6">
      <div class="flex items-center">
        <h1 class="text-3xl font-bold mr-4">Welcome <span class="font-normal">{{ userInfo?.name }}</span></h1>
        <img class="w-16 h-16 rounded-full object-cover" src="https://fakeimg.pl/600x400" alt="Profile Picture" />
      </div>
      <div v-if="userEmail">
        <p class="text-gray-500">Logged in as: <strong>{{ userEmail }}</strong></p>
      </div>
    </div>
    <main class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <section v-if="role" class="bg-white p-6 rounded shadow-md">
        <p class="text-xl font-semibold">Your Role</p>
        <p class="mt-2">{{ role }}</p>
      </section>
      <section v-if="teacherSchool" class="bg-white p-6 rounded shadow-md">
        <h2 class="text-2xl font-semibold">School Information</h2>
        <p class="mb-2"><strong>School Name:</strong> {{ teacherSchool.school.name }}</p>
        <p><strong>School Type:</strong> {{ teacherSchool.school.type }}</p>
      </section>
      <section class="bg-white p-6 rounded shadow-md">
        <h2 class="text-2xl font-semibold">Assigned Subjects</h2>
        <div v-if="!assignedSubjects.length" class="text-center text-gray-500">No subjects assigned yet.</div>
        <ul v-else>
          <li v-for="subject in assignedSubjects" :key="subject._id" class="mb-2">
            {{ subject.name }}
          </li>
        </ul>
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