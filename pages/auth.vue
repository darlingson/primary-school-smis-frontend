<template>
    <div>
      <h1>Auth Page</h1>
      <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
          <input v-model="loginEmail" type="email" placeholder="Email" required />
          <input v-model="loginPassword" type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
      <div>
        <h2>Signup</h2>
        <form @submit.prevent="signup">
          <input v-model="signupEmail" type="email" placeholder="Email" required />
          <input v-model="signupPassword" type="password" placeholder="Password" required />
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useFetch } from '@nuxt/http';
  
  const loginEmail = ref('');
  const loginPassword = ref('');
  const signupEmail = ref('');
  const signupPassword = ref('');
  
  const login = async () => {
    const { data, error } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: { email: loginEmail.value, password: loginPassword.value }
    });
    if (error) {
      alert('Login failed');
    } else {
      alert('Login successful');
    }
  };
  
  const signup = async () => {
    const { data, error } = await useFetch('/api/auth/signup', {
      method: 'POST',
      body: { email: signupEmail.value, password: signupPassword.value }
    });
    if (error) {
      alert('Signup failed');
    } else {
      alert('Signup successful');
    }
  };
  </script>
  