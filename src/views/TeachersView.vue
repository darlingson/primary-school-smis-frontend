<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase.js'

const countries = ref([])

async function getCountries() {
  const { data } = await supabase.from('teachers').select()
  console.log(data)
  countries.value = data
}

onMounted(() => {
  getCountries()
})
</script>

<template>
  <ul>
    <li v-for="country in countries" :key="country.teacher_id">{{ country.created_at }}</li>
  </ul>
</template>
