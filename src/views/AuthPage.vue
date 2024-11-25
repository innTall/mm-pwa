<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase.js';

const loading = ref(false);
const email = ref('');

const handleLogin = async () => {
	try {
		loading.value = true
		const { error } = await supabase.auth.signInWithOtp({
			email: email.value,
		});
		console.log("Error:", error);
		if (error) throw error
		alert('Check your email for the login link!')
	} catch (error) {
		if (error instanceof Error) {
			alert(error.message)
		}
	} finally {
		loading.value = false
	}
}

</script>

<template>
	<div class="h-full-screen bg-gray-900 z-10 flex mt-20">
		<form class="" @submit.prevent="handleLogin">
			<div class="text-center ml-10">
				<h1 id="header" class="font-bold text-xl font-serif forced-color-adjust-auto">MM Trade</h1>
				<p id="description" class="text-right mt-10 ">Sign in...</p>
				<div>
					<input id="inputField" required type="email" placeholder="Your email" v-model="email"
						class="bg-gray-900 border border-green-600 text-center rounded-lg" />
				</div>
				<div class="mt-5 text-right">
					<input type="submit" id="button block" :value="loading ? 'Loading' : 'Send magic link'" :disabled="loading" 
					class="bg-gray-700 px-2 border rounded-lg"/>
				</div>
			</div>
		</form>
	</div>
</template>