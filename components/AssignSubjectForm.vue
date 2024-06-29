<template>
  <form @submit.prevent="assignSubject">
    <h2 class="text-xl font-semibold mb-4">Assign Subjects to Teacher</h2>

    <label for="teacher" class="block mb-2">Teacher:</label>
    <select id="teacher" v-model="selectedTeacherId" @change="updateTeacherDetails"
      class="border-gray-300 border p-2 mb-4 rounded-md w-full" required>
      <option v-for="teacher in teachers" :key="teacher._id" :value="teacher._id">{{ teacher.name }}</option>
    </select>

    <div v-if="selectedTeacher">
      <p><strong>Name:</strong> {{ selectedTeacher.name }}</p>
      <p><strong>Email:</strong> {{ selectedTeacher.email }}</p>
    </div>

    <label for="class" class="block mb-2">Class:</label>
    <select id="class" v-model="selectedClassId" @change="updateFilteredSubjects"
      class="border-gray-300 border p-2 mb-4 rounded-md w-full" required>
      <option value="">Select a class</option>
      <option v-for="classOption in getClassOptions" :key="classOption._id" :value="classOption._id">{{ classOption.name }}</option>
    </select>

    <label class="block mb-2">Subjects:</label>
    <div v-for="subject in filteredSubjects" :key="subject._id" class="flex items-center mb-2">
      <input type="checkbox" :id="subject._id" :value="subject._id" v-model="selectedSubjects" class="mr-2">
      <label :for="subject._id">{{ subject.name }} ({{ subject.class.name }})</label>
    </div>

    <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
      Assign Subjects
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

definePageMeta({
  middleware: 'auth2'
});

const { authenticated, userEmail, role, school } = storeToRefs(useAuthStore());

const selectedTeacherId = ref('');
const selectedTeacher = ref<any | null>(null);
const selectedSubjects = ref<string[]>([]);
const teachers = ref<any[]>([]);
const schoolSubjects = ref<any[]>([]);
const selectedClassId = ref<string>('');

const assignSubject = async () => {
  if (!selectedTeacherId.value || selectedSubjects.value.length === 0) {
    return;
  }

  for (const subjectId of selectedSubjects.value) {
    const subject = schoolSubjects.value.find(sub => sub._id === subjectId);
    if (subject) {
      const payload = {
        teacher: selectedTeacherId.value,
        subject: {
          id: subject._id,
          name: subject.name,
        },
        class: {
          id: subject.class._id,
          name: subject.class.name,
        },
        school: {
          id: school.value,
          name: subject.school.name,
        },
        term: "First Term",
        year: new Date().getFullYear(),
        academic_year: "2023/2024",
      };

      assignTeacher(payload);
      console.log('Assigned subject:', subject.name, 'to teacher:', selectedTeacher.value.name);
    }
  }

  // Reset form fields after submission
  selectedTeacherId.value = '';
  selectedTeacher.value = null;
  selectedSubjects.value = [];
};

interface Teacher {
  _id: string;
  name: string;
  email: string;
  school: string;
  __v: number;
}

interface teachersFetchResponse {
  teachers: Teacher[];
}

async function assignTeacher(payload: any): Promise<void> {
  try {
    await useFetch(`/api/teachers/assignments`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error(error);
  }
}

const updateTeacherDetails = () => {
  selectedTeacher.value = teachers.value.find(teacher => teacher._id === selectedTeacherId.value) || null;
};

console.log("getting schools");
await useFetch<teachersFetchResponse>(`/api/teachers/school/${school.value}`, {
  method: 'GET',
}).then((response) => {
  if (response.data.value) {
    teachers.value = response.data.value.teachers;
    console.log(response.data.value);
  }
});

await useFetch(`/api/school/${school.value}/subjects`, {
  method: 'GET',
}).then((response) => {
  if (response.data.value) {
    schoolSubjects.value = response.data.value.subjects;
    console.log(response.data.value);
  }
});

const filteredSubjects = computed(() => {
  if (!selectedClassId.value) {
    return schoolSubjects.value; // Return all subjects if no class selected
  }
  return schoolSubjects.value.filter(subject => subject.class._id === selectedClassId.value);
});

const getClassOptions = computed(() => {
  const uniqueClasses: any[] = [];
  schoolSubjects.value.map((subject) => {
    if (!uniqueClasses.some(c => c._id === subject.class._id)) {
      uniqueClasses.push({
        _id: subject.class._id,
        name: subject.class.name
      });
    }
  });
  return uniqueClasses;
});

const updateFilteredSubjects = () => {
  filteredSubjects.value;
};
</script>
