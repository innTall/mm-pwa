<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

// Pinia store
const authStore = useAuthStore();
const user = authStore.user;

// Vue Router
const router = useRouter();

// Redirect to login if not authenticated
if (!user) {
	router.replace('/login');
}

// Sign-out function
const signOut = async () => {
	await authStore.signOut();
	router.replace('/login');
};
</script>

<template>
	<div>
		<h3 class="font-bold text-red-600">Protected Page</h3>
		<p v-if="user">Welcome, {{ user.email }}!</p>
		<p v-else>Redirecting to login...</p>
		<button @click="signOut">Sign Out</button>
	</div>
</template>
<style scoped></style>