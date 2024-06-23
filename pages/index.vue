<template>
  <div>
    <h1>Home Page</h1>
    <p>Welcome to the home page!</p>
    <p v-if="userEmail">Logged in as: {{ userEmail }}</p>
    <p v-if="role">Role: {{ role }}</p>
    <p v-if="school">School: {{ teacherSchool.data }}</p>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
const { authenticated, userEmail, role, school } = storeToRefs(useAuthStore());
definePageMeta({
  middleware: 'auth2'
})
console.log(school.value)
const teacherSchool = await useFetch('/api/school/'+ school.value,{

})
//check if role is admin but no school is set, then navigate to add school page
if (role.value === 'schoolAdmin' && !school.value) {
  navigateTo('school/add-school');
}

</script>
