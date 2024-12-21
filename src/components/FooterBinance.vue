<script setup>
import { computed } from 'vue';
import { useMarginBinanceStore } from '@/stores/marginBinance.js';
import { storeToRefs } from 'pinia';
const { totalActiveTpAndSl } = storeToRefs(useMarginBinanceStore());
const appVersion = __APP_VERSION__;
// Helper function to determine color class
const totalActiveTpAndSlColor = computed(() => {
	return totalActiveTpAndSl.value > 0 ? "text-green-500" : totalActiveTpAndSl.value < 0 ? "text-red-500" : "text-white";
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
			<div class="">
				<div class="text-xs">Balance:</div>
				<div class="text-center font-bold" :class="totalActiveTpAndSlColor">{{ totalActiveTpAndSl }}</div>
			</div>
		</div>
	</div>
</template>
<style scoped></style>