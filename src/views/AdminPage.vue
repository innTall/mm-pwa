<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';

const users = ref([]);
const fetchUsers = async () => {
	const { data } = await supabase.from('users').select('*');
	users.value = data;
};
</script>

<template>
	<div>
		<h1>Admin Dashboard</h1>
		<p>Welcome, {{ user.email }}</p>
		<p>Your role: {{ user.role }}</p>
		<button @click="fetchUsers">View All Users</button>
		<ul>
			<li v-for="user in users" :key="user.id">{{ user.email }} ({{ user.role }})</li>
		</ul>
	</div>
</template>