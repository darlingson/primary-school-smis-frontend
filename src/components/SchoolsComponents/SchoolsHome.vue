<template>
  <div class="container mx-auto p-4">
    <button
      @click="showModal = true"
      class="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600"
    >
      Add School
    </button>

    <h1 class="text-3xl font-bold mb-4">List of Schools</h1>
    <ul>
      <li v-for="school in schools" :key="school.id" class="mb-2">
        <div
          @click="navigateToSchoolInfo(school.id)"
          class="bg-gray-100 p-4 rounded-md cursor-pointer"
        >
          <p class="text-lg font-semibold">{{ school.school_name }}</p>
          <p>{{ school.level }} - {{ school.region }}</p>
        </div>
      </li>
    </ul>

    <!-- Modal -->
    <div v-show="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-2xl font-bold mt-8 mb-4">Add New School</h2>
        <form @submit.prevent="addNewSchool" class="max-w-md">
          <div class="mb-4">
            <label for="schoolName" class="block text-sm font-semibold">School Name:</label>
            <input
              type="text"
              id="schoolName"
              v-model="newSchool.school_name"
              required
              class="w-full border rounded-md p-2"
            />
          </div>

          <div class="mb-4">
            <label for="level" class="block text-sm font-semibold">Level:</label>
            <input
              type="text"
              id="level"
              v-model="newSchool.level"
              required
              class="w-full border rounded-md p-2"
            />
          </div>

          <div class="mb-4">
            <label for="region" class="block text-sm font-semibold">Region:</label>
            <input
              type="text"
              id="region"
              v-model="newSchool.region"
              required
              class="w-full border rounded-md p-2"
            />
          </div>

          <div class="mb-4">
            <label for="district" class="block text-sm font-semibold">District:</label>
            <input
              type="text"
              id="district"
              v-model="newSchool.district"
              required
              class="w-full border rounded-md p-2"
            />
          </div>

          <div class="mb-4">
            <label for="constituency" class="block text-sm font-semibold">Constituency:</label>
            <input
              type="text"
              id="constituency"
              v-model="newSchool.constituency"
              required
              class="w-full border rounded-md p-2"
            />
          </div>

          <div class="mb-4">
            <label for="traditionalAuthority" class="block text-sm font-semibold"
              >Traditional Authority:</label
            >
            <input
              type="text"
              id="traditionalAuthority"
              v-model="newSchool.traditional_authority"
              required
              class="w-full border rounded-md p-2"
            />
          </div>

          <div class="mb-4">
            <label for="village" class="block text-sm font-semibold">Village:</label>
            <input
              type="text"
              id="village"
              v-model="newSchool.village"
              required
              class="w-full border rounded-md p-2"
            />
          </div>

          <button
            type="submit"
            class="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600"
            :disabled="isSubmitting"
          >
            <template v-if="isSubmitting">
              <svg
                class="animate-spin h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.76 0-5.202-1.131-7-2.965z"
                ></path>
              </svg>
              Adding...
            </template>
            <template v-else>Add School</template>
          </button>
          <button
            @click="showModal = false"
            class="bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600"
          >
            Close
          </button>
        </form>
      </div>
    </div>
    <!-- Modal Overlay -->
    <div v-show="showModal" class="fixed inset-0 bg-black opacity-50"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createSchool, fetchAllSchools } from '../../controllers/SchoolController'
import type { School } from '../interfaces/School'
import { useRouter } from 'vue-router'
const schools = ref<School[]>([])
const newSchool = ref<School>({
  id: '',
  created_at: '',
  school_name: '',
  level: '',
  region: '',
  district: '',
  constituency: '',
  traditional_authority: '',
  village: ''
})
const isSubmitting = ref(false)
const showModal = ref(false)
const fetchSchools = async () => {
  const fetchedSchools = await fetchAllSchools()
  if (fetchedSchools) {
    schools.value = fetchedSchools
  }
}

const addNewSchool = async () => {
  try {
    isSubmitting.value = true
    const addedSchool = await createSchool(
      newSchool.value.school_name,
      newSchool.value.level,
      newSchool.value.region,
      newSchool.value.district,
      newSchool.value.constituency,
      newSchool.value.traditional_authority,
      newSchool.value.village
    )
    if (addedSchool) {
      schools.value.push(addedSchool)
      newSchool.value = {
        id: '',
        created_at: '',
        school_name: '',
        level: '',
        region: '',
        district: '',
        constituency: '',
        traditional_authority: '',
        village: ''
      }
      clearForm()
    }
  } finally {
    isSubmitting.value = false
  }
}
const clearForm = () => {
  newSchool.value = {
    id: '',
    created_at: '',
    school_name: '',
    level: '',
    region: '',
    district: '',
    constituency: '',
    traditional_authority: '',
    village: ''
  }
}
const router = useRouter()

const navigateToSchoolInfo = (schoolId: string) => {
  router.push({ name: 'SchoolInfo', params: { id: schoolId } })
}
fetchSchools()
</script>
