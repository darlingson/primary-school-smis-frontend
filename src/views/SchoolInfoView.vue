<template>
  <div class="container mx-auto p-4 flex">
    <!-- Left section -->
    <div class="w-1/2 pr-4">
      <h1 class="text-3xl font-bold mb-4">{{ schoolData?.school_name }}</h1>
      <!-- Display school information here -->
      <div>
        <p><span class="font-semibold">Level:</span> {{ schoolData?.level }}</p>
        <p><span class="font-semibold">Region:</span> {{ schoolData?.region }}</p>
        <p><span class="font-semibold">District:</span> {{ schoolData?.district }}</p>
        <!-- Add more school information fields as needed -->
      </div>
      <div class="mt-6">
        <!-- Buttons to edit school info, add teachers, and add students -->
        <button
          @click="showEditForm"
          class="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 mr-4"
        >
          Edit School Info
        </button>
        <button
          @click="showAddTeachersForm"
          class="bg-green-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-600 mr-4"
        >
          Add Teachers
        </button>
        <button
          @click="showAddStudentsForm"
          class="bg-yellow-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-yellow-600"
        >
          Add Students
        </button>
      </div>
    </div>

    <!-- Right section -->
    <div class="w-1/2 pl-4">
      <!-- Dynamic content based on button clicked -->
      <template v-if="showEditFormFlag">
        <!-- Display edit school form here -->
        <!-- ... -->
      </template>
      <template v-else-if="showAddTeachersFormFlag">
        <!-- Display add teachers form here -->
        <!-- ... -->
      </template>
      <template v-else-if="showAddStudentsFormFlag">
        <!-- Display add students form here -->
        <!-- ... -->
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchSchoolById } from '../controllers/SchoolController'
import { useRoute } from 'vue-router'
import type { School } from '../components/interfaces/School'

const showEditFormFlag = ref(false)
const showAddTeachersFormFlag = ref(false)
const showAddStudentsFormFlag = ref(false)

const schoolData = ref<School | null>(null)
const route = useRoute()
onMounted(async () => {
  const schoolId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id // Access school ID from route params
  if (schoolId) {
    schoolData.value = await fetchSchoolById(schoolId)
  }
})

const showEditForm = () => {
  showEditFormFlag.value = true
  showAddTeachersFormFlag.value = false
  showAddStudentsFormFlag.value = false
}

const showAddTeachersForm = () => {
  showEditFormFlag.value = false
  showAddTeachersFormFlag.value = true
  showAddStudentsFormFlag.value = false
}

const showAddStudentsForm = () => {
  showEditFormFlag.value = false
  showAddTeachersFormFlag.value = false
  showAddStudentsFormFlag.value = true
}
</script>
