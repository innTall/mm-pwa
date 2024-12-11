<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth.js';

// State variables
const email = ref('');
const password = ref('');
const error = ref(null);

// Pinia store
const authStore = useAuthStore();

// Login method
const login = async () => {
	try {
		error.value = null;
		await authStore.signIn(email.value, password.value);
	} catch (e) {
		error.value = e.message;
	}
};
</script>

<template>
	<div class="h-full-screen bg-gray-900 z-10 flex mt-20">
		<form class="" @submit.prevent="login">
			<div class="text-center ml-10">
				<h1 id="header" class="font-bold text-xl font-serif forced-color-adjust-auto">MM Trade</h1>
				<p id="description" class="mt-10 mb-5 ">Sign in...</p>
				<div class="">
					<input id="inputField" required type="email" placeholder="Your email" v-model="email"
						class="bg-gray-900 mb-2 border border-green-600 text-center rounded-lg" />
					<input id="password" v-model="password" type="password" placeholder="Password"
						class="bg-gray-900 border border-green-600 text-center rounded-lg" />
				</div>
				<div class="mt-5">
					<button id="button-submit" type="submit" class="bg-gray-700 px-2 border rounded-lg">Login</button>
				</div>
			</div>
		</form>
		<p v-if="error" class="">{{ error }}</p>
	</div>
</template>