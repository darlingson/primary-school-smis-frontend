<template>
  <Auth v-if="!user" />
  <template v-else>
    <NavBar />
    <RouterView />
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Auth from './components/AuthComponents/Auth.vue'
import NavBar from './components/NavBar.vue'
import { RouterView } from 'vue-router'

import { store } from './store'
import { supabase } from './supabase'

// Define the user reference
const user = ref(null)

onMounted(() => {
  user.value = supabase.auth.user()
  supabase.auth.onAuthStateChange((event, session) => {
    user.value = event === 'SIGNED_OUT' ? null : session.user
  })
})
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
