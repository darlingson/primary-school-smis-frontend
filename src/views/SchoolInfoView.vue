<template>
  <div class="container mx-auto p-4 flex">
    <div class="w-1/2 pr-4">
      <h1 class="text-3xl font-bold mb-4">{{ schoolData?.school_name }}</h1>
      <div>
        <p><span class="font-semibold">Level:</span> {{ schoolData?.level }}</p>
        <p><span class="font-semibold">Region:</span> {{ schoolData?.region }}</p>
        <p><span class="font-semibold">District:</span> {{ schoolData?.district }}</p>
        <p><span class="font-semibold">District:</span> {{ schoolData?.constituency }}</p>
        <p><span class="font-semibold">District:</span> {{ schoolData?.traditional_authority }}</p>
        <p><span class="font-semibold">District:</span> {{ schoolData?.village }}</p>
      </div>
      <div class="mt-6">
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

    <div class="w-1/2 pl-4">
      <template v-if="showEditFormFlag"> </template>
      <template v-else-if="showAddTeachersFormFlag">
        <SchoolTeachers />
      </template>
      <template v-else-if="showAddStudentsFormFlag"> </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchSchoolById } from '../controllers/SchoolController'
import { useRoute } from 'vue-router'
import type { School } from '../components/interfaces/School'
import SchoolTeachers from '@/components/TeacherComponents/SchoolTeachers.vue'
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
