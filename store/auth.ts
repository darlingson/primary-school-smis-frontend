import { defineStore } from 'pinia';

interface UserPayloadInterface {
  username: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    userEmail: '',
    role: '',
    school: '',
  }),
  persist: true,
  actions: {
    async authenticateUser({ username, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      const { data, pending }: any = await useFetch('/api/auth/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email: username,
          password: password,
        },
      });
      this.loading = pending;

      if (data.value) {
        const token = useCookie('token');
        token.value = data?.value?.token;
        this.authenticated = true;
        this.userEmail = data?.value?.email;
        this.role = data?.value?.role;
        this.school = data?.value?.school;
      }
    },
    logUserOut() {
      const token = useCookie('token');
      this.authenticated = false;
      token.value = null;
      this.userEmail = '';
    },
  },
});