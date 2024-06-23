<template>
  <div>
    <h1>Home Page</h1>
    <p>Welcome to the home page!</p>
    <p v-if="userEmail">Logged in as: {{ userEmail }}</p>
    <p v-if="role">Role: {{ role }}</p>
    <div v-if="teacherSchool">
      <div>Name: {{ teacherSchool.school.name }}</div>
      <div>Type: {{ teacherSchool.school.type }}</div>
      <div>Address: {{ teacherSchool.school.address }}</div>
      <div>Location: {{ teacherSchool.school.location }}</div>
      <div>Email: {{ teacherSchool.school.email }}</div>
      <div>Phone: {{ teacherSchool.school.phone }}</div>
      <div>Admin Email: {{ teacherSchool.school.adminEmail }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
console.log(teacherSchool.value)
//check if role is admin but no school is set, then navigate to add school page
if (role.value === 'schoolAdmin' && !school.value) {
  navigateTo('school/add-school');
}

</script>
