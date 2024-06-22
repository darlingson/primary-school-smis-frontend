<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <header class="bg-gray-800 text-white">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <nuxt-link to="/" class="text-xl font-bold">Home</nuxt-link>
          <nuxt-link to="/about" class="ml-4">About</nuxt-link>
        </div>
        <div>
          <ul class="flex space-x-4">
            <li v-if="!authenticated">
              <nuxt-link to="/login" class="text-white hover:text-gray-300">Login</nuxt-link>
            </li>
            <li v-if="authenticated">
              <button @click="logout" class="text-white hover:text-gray-300">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="flex-1">
      <div class="container mx-auto px-4 py-8">
        <slot />
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white">
      <div class="container mx-auto px-4 py-4">
        <h1 class="text-xl">Web App by Darlingson</h1>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const router = useRouter();
const { logUserOut } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());

const logout = () => {
  logUserOut();
  router.push('/login');
};
</script>

<style scoped>
/* Responsive classes using Tailwind CSS */
@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}
</style>
