<template>
  <div>
    <h1>Home Page</h1>
    <p>Welcome to the home page!</p>
    <p v-if="userEmail">Logged in as: {{ userEmail }}</p>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth'; 
const { authenticated,userEmail } = storeToRefs(useAuthStore());
  definePageMeta({
    middleware: 'auth2'
})

</script>
