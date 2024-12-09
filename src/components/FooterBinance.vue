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
	<div class="flex justify-between text-sm ml-3 items-center">
		<div class="text-green-600 underlined">v.{{ appVersion }}</div>
		<div class="">
			<RouterLink :to="{ name: 'MarginBinanceRes' }" v-slot="{ isActive }">
				<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']">Margin |</span>
			</RouterLink>
			<RouterLink :to="{ name: 'SpotBinanceRes' }" v-slot="{ isActive }">
				<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Spot</span>
			</RouterLink>
		</div>
		<div class="">
			<RouterLink :to="{ name: 'DepositBinance' }" v-slot="{ isActive }">
				<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']">Deposit</span>
			</RouterLink>
		</div>
		<div class="p-2">
			<div class="flex justify-between px-2 py-1 gap-3 items-center">
				<div>Free money:</div>
				<div class="text-center font-bold">{{ storedBalance }}</div>
			</div>
		</div>
	</div>
</template>
<style scoped></style>