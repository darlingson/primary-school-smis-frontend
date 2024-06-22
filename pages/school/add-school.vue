<template>
  <div class="max-w-lg mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Add School</h1>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">School Name:</label>
        <input type="text" id="name" v-model="form.name" required class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div>
        <label for="type" class="block text-sm font-medium text-gray-700">School Type:</label>
        <select id="type" v-model="form.type" required class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
          <option value="" disabled>Select school type</option>
          <option value="private">Private</option>
          <option value="government">Government</option>
          <option value="church">Church</option>
        </select>
      </div>
      <div>
        <label for="address" class="block text-sm font-medium text-gray-700">Address:</label>
        <input type="text" id="address" v-model="form.address" required class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div>
        <label for="location" class="block text-sm font-medium text-gray-700">Location:</label>
        <input type="text" id="location" v-model="form.location" required class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
        <input type="email" id="email" v-model="form.email" required class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700">Phone:</label>
        <input type="tel" id="phone" v-model="form.phone" required class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div>
        <label for="adminEmail" class="block text-sm font-medium text-gray-700">Admin Email:</label>
        <input type="email" id="adminEmail" v-model="form.adminEmail" required class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div>
        <button type="submit" class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">Add School</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const form = reactive({
  name: '',
  type: '',
  address: '',
  location: '',
  email: '',
  phone: '',
  adminEmail: ''
});

const submitForm = () => {
  console.log('Form submitted:', form);
  // Add your form submission logic here
};
</script>

<style>
/* No additional styles needed, using Tailwind CSS */
</style>
