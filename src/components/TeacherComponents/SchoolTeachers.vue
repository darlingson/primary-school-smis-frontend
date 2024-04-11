<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Teachers</h1>
    <ul>
      <li v-for="teacher in teachers" :key="teacher.id" class="mb-2">
        <div class="bg-gray-100 p-4 rounded-md">
          <p class="text-lg font-semibold">{{ teacher.f_name }} {{ teacher.l_name }}</p>
          <p>{{ teacher.sex }}</p>
        </div>
      </li>
    </ul>

    <button
      @click="showAddTeacherModal"
      class="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md mt-4"
    >
      Add Teacher
    </button>

    <div
      v-if="isAddTeacherModalOpen"
      class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-md shadow-xl">
        <h2 class="text-2xl font-bold mb-4">Add Teacher</h2>
        <form @submit.prevent="addTeacher" class="max-w-md">
          <div class="mb-4">
            <label for="firstName" class="block text-sm font-semibold">First Name:</label>
            <input
              v-model="newTeacher.f_name"
              type="text"
              id="firstName"
              required
              class="w-full border rounded-md p-2"
            />
          </div>
          <div class="mb-4">
            <label for="lastName" class="block text-sm font-semibold">Last Name:</label>
            <input
              v-model="newTeacher.l_name"
              type="text"
              id="lastName"
              required
              class="w-full border rounded-md p-2"
            />
          </div>
          <div class="mb-4">
            <label for="sex" class="block text-sm font-semibold">Sex:</label>
            <input
              v-model="newTeacher.sex"
              type="text"
              id="sex"
              required
              class="w-full border rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            class="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Teacher
          </button>
          <button
            @click="closeAddTeacherModal"
            class="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-md ml-4 hover:bg-gray-400"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { createTeacher, fetchAllTeachersBySchoolId } from '../../controllers/TeacherController'
import type { Teacher } from '../interfaces/Teacher'
import { useRoute } from 'vue-router'

const teachers = ref<Teacher[]>([])
const route = useRoute()
var schoolId = ref<string>('')
onMounted(async () => {
  schoolId.value = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
})
const newTeacher = ref<Teacher>({
  id: '',
  f_name: '',
  l_name: '',
  sex: '',
  school_id: '',
  created_at: '',
  teacher_id: ''
})

const isAddTeacherModalOpen = ref(false)

const showAddTeacherModal = () => {
  isAddTeacherModalOpen.value = true
}

const closeAddTeacherModal = () => {
  isAddTeacherModalOpen.value = false
}

const addTeacher = async () => {
  try {
    const addedTeacher = await createTeacher(
      newTeacher.value.f_name,
      newTeacher.value.l_name,
      newTeacher.value.sex,
      schoolId.value
    )

    if (addedTeacher) {
      teachers.value.push(addedTeacher)
      newTeacher.value = {
        id: '',
        f_name: '',
        l_name: '',
        sex: '',
        school_id: '',
        created_at: '',
        teacher_id: ''
      }
      closeAddTeacherModal()
    } else {
      console.error('added teacher is null')
    }
  } catch (error: any) {
    console.error('Error adding teacher:', error.message)
  }
}
const fetchTeachers = async () => {
  const fetchedTeachers = await fetchAllTeachersBySchoolId(schoolId.value)
  if (fetchedTeachers) {
    teachers.value = fetchedTeachers
  }
}
onMounted(() => {
  fetchTeachers()
})
</script>
