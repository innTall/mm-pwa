<script setup>
import { useOrderStore } from "@/stores/orders.js";

const orderStore = useOrderStore();
</script>

<template>
	<div class="flex justify-between">
		<div class="">
			<RouterLink :to="{ name: 'Trade' }"> Trade |</RouterLink>
			<RouterLink :to="{ name: 'Order' }"> Order |</RouterLink>
		</div>
		<!-- Sum Display -->
		<div :class="{
			'text-green-500': orderStore.totalSum > 0,
			'text-red-500': orderStore.totalSum < 0,
			'text-gray-500': orderStore.totalSum === 0,
		}" class="font-bold text-md">
			Total Result: {{ orderStore.totalSum.toFixed(2) }}
		</div>
	</div>
</template>