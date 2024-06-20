<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 class="text-2xl font-bold mb-6 text-center">Auth Page</h1>
            <div>
                <div class="flex justify-center mb-6">
                    <button :class="{ 'bg-blue-500 text-white': showLogin, 'bg-gray-200': !showLogin }"
                        class="px-4 py-2 rounded-l-lg" @click="showLogin = true">
                        Login
                    </button>
                    <button :class="{ 'bg-blue-500 text-white': !showLogin, 'bg-gray-200': showLogin }"
                        class="px-4 py-2 rounded-r-lg" @click="showLogin = false">
                        Signup
                    </button>
                </div>
                <div v-if="showLogin">
                    <h2 class="text-xl font-semibold mb-4">Login</h2>
                    <form @submit.prevent="login">
                        <div class="mb-4">
                            <input v-model="loginEmail" type="email" placeholder="Email"
                                class="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                        <div class="mb-4">
                            <input v-model="loginPassword" type="password" placeholder="Password"
                                class="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                        <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg">
                            Login
                        </button>
                    </form>
                    <p v-if="loginError" class="text-red-500 mt-4">{{ loginError }}</p>
                </div>
                <div v-else>
                    <h2 class="text-xl font-semibold mb-4">Signup</h2>
                    <form @submit.prevent="signup">
                        <div class="mb-4">
                            <input v-model="signupName" type="text" placeholder="Name" class="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                        <div class="mb-4">
                            <input v-model="signupEmail" type="email" placeholder="Email"
                                class="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                        <div class="mb-4">
                            <input v-model="signupPassword" type="password" placeholder="Password"
                                class="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                        <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg">
                            Signup
                        </button>
                    </form>
                    <p v-if="signupError" class="text-red-500 mt-4">{{ signupError }}</p>
                </div>
            </div>
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
const showLogin = ref<boolean>(true);
const loginError = ref<string | null>(null);
const signupError = ref<string | null>(null);
const signupName = ref<string | null>('');

const router = useRouter();

const login = async () => {
    loginError.value = null;
    try {
        const { data } = await useFetch<{ token: string }>('/api/auth/login', {
            method: 'POST',
            body: { email: loginEmail.value, password: loginPassword.value }
        });

        if (data?.value?.token) {
            localStorage.setItem('authToken', data.value.token);
            await router.push('/');
        } else {
            loginError.value = 'Login failed';
        }
    } catch (error) {
        loginError.value = 'Login failed';
    }
};

const signup = async () => {
    signupError.value = null;
    try {
        const { data } = await useFetch<{ token: string }>('/api/auth/signup', {
            method: 'POST',
            body: { email: signupEmail.value, password: signupPassword.value, name: signupName.value }
        });
        console.log(data)
        if (data?.value?.token) {
            localStorage.setItem('authToken', data.value.token);
            await router.push('/');
        } else if (data._value.message) {
            signupError.value = data._value.message;
        }
    } catch (error) {
        signupError.value = 'Signup failed';
    }
};
</script>

<style>
body {
    @apply bg-gray-100;
}
</style>