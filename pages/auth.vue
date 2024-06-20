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
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const loginEmail = ref<string>('');
  const loginPassword = ref<string>('');
  const signupEmail = ref<string>('');
  const signupPassword = ref<string>('');
  
  const router = useRouter();
  
  const login = async () => {
    try {
      const { data } = await useFetch<{ token: string }>('/api/auth/login', {
        method: 'POST',
        body: { email: loginEmail.value, password: loginPassword.value }
      });
  
      if (data?.value?.token) {
        localStorage.setItem('authToken', data.value.token);
        await router.push('/');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      alert('Login failed');
    }
  };
  
  const signup = async () => {
    try {
      const { data } = await useFetch<{ token: string }>('/api/auth/signup', {
        method: 'POST',
        body: { email: signupEmail.value, password: signupPassword.value }
      });
  
      if (data?.value?.token) {
        localStorage.setItem('authToken', data.value.token);
        await router.push('/');
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      alert('Signup failed');
    }
  };
  </script>
  