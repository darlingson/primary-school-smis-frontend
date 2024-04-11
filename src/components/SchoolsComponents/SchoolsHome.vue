<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">List of Schools</h1>
    <ul>
      <li v-for="school in schools" :key="school.id" class="mb-2">
        <div class="bg-gray-100 p-4 rounded-md">
          <p class="text-lg font-semibold">{{ school.school_name }}</p>
          <p>{{ school.level }} - {{ school.region }}</p>
        </div>
      </li>
    </ul>

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
      >
        Add School
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createSchool, fetchAllSchools } from '../../controllers/SchoolController'
import type { School } from '../interfaces/School'
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

const fetchSchools = async () => {
  const fetchedSchools = await fetchAllSchools()
  if (fetchedSchools) {
    schools.value = fetchedSchools
  }
}

const addNewSchool = async () => {
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
  }
}

fetchSchools()
</script>
