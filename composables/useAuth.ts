// composables/useAuth.ts
import { ref } from 'vue';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { useRuntimeConfig } from '#imports';

const isLoggedIn = ref(false);

export function useAuth() {
  const config = useRuntimeConfig();
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
      isLoggedIn.value = !!decoded;
    } catch (error) {
      isLoggedIn.value = false;
    }
  }

  return {
    isLoggedIn
  };
}
