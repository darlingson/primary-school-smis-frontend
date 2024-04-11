<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar.vue'
import './index.css'
</script>
<template>
  <NavBar />
  <RouterView />
</template>
