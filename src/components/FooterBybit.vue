<script setup>
import { ref, watch } from 'vue';
const appVersion = __APP_VERSION__;
const props = defineProps({
	lastBalance: {
		type: String,
		required: false,
		default: '0.00',
	},
});
// Local state to store the last received balance
const storedBalance = ref(props.lastBalance);
watch(() => props.lastBalance, (newVal) => {
	storedBalance.value = newVal || '0.00'; // Update the stored value when props change
});
</script>

<template>
	<hr class="border-green-600">
	<div class="flex justify-between ml-3 text-sm items-center">
		<div class="text-green-600 underlined">v.{{ appVersion }}</div>
		<div class="">
			<RouterLink :to="{ name: 'MarginBybitRes' }" v-slot="{ isActive }">
				<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']">Margin | </span>
			</RouterLink>
			<RouterLink :to="{ name: 'SpotBybitRes' }" v-slot="{ isActive }">
				<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']">Spot</span>
			</RouterLink>
		</div>
		<div class="">
			<RouterLink :to="{ name: 'DepositBybit' }" v-slot="{ isActive }">
				<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']">Deposit</span>
			</RouterLink>
		</div>
		<div class="p-2">
			<div class="flex justify-between px-2 py-1 gap-3">
				<div>Free money:</div>
				<div class="text-center font-bold">{{ storedBalance }}</div>
			</div>
		</div>
	</div>
</template>
<style scoped></style>