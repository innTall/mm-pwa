<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useChartSettingsStore } from '@/stores/chartSettings.js';
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'; // Import Heroicons Outline Camera
//import { useMarginSymbolsStore } from "@/stores/marginSymbols.js";
//import { downloadJSON } from "@/utils/json.js";
const { interval, quoteAsset, limit } = storeToRefs(useChartSettingsStore());
//const { klineData } = storeToRefs(useMarginSymbolsStore()); // Use reactive store variable
defineProps({});
defineOptions({
	inheritAttrs: false, // Prevent automatic inheritance of non-prop attributes
});

// Modal state
const isModalOpen = ref(false);

// Interval options
const intervals = [
	{ key: '5', label: '5m' },
	{ key: '15', label: '15m' },
	{ key: '60', label: '1h' },
	{ key: '240', label: '4h' },
	{ key: 'D', label: 'D' }
];

// Handle interval change
const setInterval = (value) => {
	interval.value = value;
};

// Toggle modal
const toggleModal = () => {
	isModalOpen.value = !isModalOpen.value;
};
</script>

<template>
	<div v-bind="$attrs" class="flex justify-between text-sm">
		<!-- Interval Links -->
		<div class="flex justify-between gap-1 py-2">
			<div class="uppercase underline font-bold">{{ quoteAsset }}</div>
			<div v-for="value in intervals" :key="value.key" @click="setInterval(value.key)"
				class="cursor-pointer px-1 transition-colors duration-200" :class="{'text-white underline font-bold': interval === value.key,
					'text-gray-500': interval !== value.key}">
				{{ value.label }}
			</div>
		</div>

		<!-- Open Modal Button -->
		<div class="text-white items-center text-sm pt-1">
			<button @click="toggleModal" class="">
				<EllipsisHorizontalIcon class="w-6 h-6" />
			</button>
			<!--button @click="downloadJSON(klineData.value)" :disabled="!klineData"
				class="bg-gray-700 px-2 text-white rounded hover:bg-gray-600">
				JSON
			</button-->
		</div>

		<!-- Modal -->
		<div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 z-10 flex items-center justify-center">
			<div class="bg-gray-900 p-4 rounded shadow-lg w-80">
				<h3 class="text-lg text-white mb-4">Chart Settings</h3>
				<label class="block mb-2">
					<span class="text-white">Quote Asset:</span>
					<input id="quoteAsset" type="text" v-model="quoteAsset" placeholder="usdt"
						class="w-full bg-gray-800 border text-center uppercase rounded px-2 py-1 text-white" />
				</label>
				<label class="block mb-4">
					<span class="text-white">Limit:</span>
					<input id="limit" type="number" v-model="limit" placeholder="200-1000"
						class="w-full bg-gray-800 border text-center rounded px-2 py-1 text-white" />
				</label>
				<div class="flex justify-between">
					<button @click="toggleModal" class="bg-gray-700 px-2 text-white rounded hover:bg-gray-600">
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>