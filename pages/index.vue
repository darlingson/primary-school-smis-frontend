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
      <section class="w-1/3 pl-4">
        <div class="bg-gray-50 p-6 rounded shadow-md">
          <h2 class="text-2xl font-semibold mb-4">Admin Actions</h2>
          <div
            class="flex max-w-full snap-x snap-mandatory space-x-3 overflow-x-auto whitespace-nowrap bg-gray-200 p-2 px-4">
            <button @click="currentForm = 'addClass'"
              class="bg-white text-black rounded-md border-2 border-blue-600 px-4 py-2 hover:bg-stone-500">Add
              Class</button>
            <button @click="currentForm = 'addSubject'"
              class="bg-white text-black rounded-md border-2 border-blue-600 px-4 py-2 hover:bg-stone-500">Add
              Subject</button>
            <button @click="currentForm = 'addStudent'"
              class="bg-white text-black rounded-md border-2 border-blue-600 px-4 py-2 hover:bg-stone-500">Register
              Student</button>
            <button @click="currentForm = 'assignSubject'"
              class="bg-white text-black rounded-md border-2 border-blue-600 px-4 py-2 hover:bg-stone-500">Assign
              Subject to
              Teacher</button>
          </div>
          <div class="bg-white p-6 rounded shadow-md">
            <component :is="currentFormComponent" />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>





<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
const { authenticated, userEmail, role, school } = storeToRefs(useAuthStore());
definePageMeta({
  middleware: 'auth2'
})
import AddClassForm from '~/components/AddClassForm.vue';
import AddSubjectForm from '~/components/AddSubjectForm.vue';
import AddStudentForm from '~/components/AddStudentForm.vue';
import AssignSubjectForm from '~/components/AssignSubjectForm.vue';
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
const currentForm = ref('addClass');
const teacherSchool = ref<SchoolTeacher | null>(null);
const result = await useFetch<SchoolTeacher>('/api/school/' + school.value);
teacherSchool.value = result.data.value;
console.log(teacherSchool.value)
//check if role is admin but no school is set, then navigate to add school page
if (role.value === 'schoolAdmin' && !school.value) {
  navigateTo('school/add-school');
}
if(role.value === 'teacher'){
  navigateTo('teachers/home');
}
const currentFormComponent = computed(() => {
  switch (currentForm.value) {
    case 'addClass':
      return AddClassForm;
    case 'addSubject':
      return AddSubjectForm;
    case 'addStudent':
      return AddStudentForm;
    case 'assignSubject':
      return AssignSubjectForm;
    default:
      return AddClassForm; // Default to Add Class form
  }
});
</script>
