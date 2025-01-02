<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMarginSymbolsStore } from "@/stores/marginSymbols.js";
import { useChartSettingsStore } from "@/stores/chartSettings.js";

defineProps({});
defineOptions({
	inheritAttrs: false, // Prevent automatic inheritance of non-prop attributes
});

const { sortedSymbols } = storeToRefs(useMarginSymbolsStore());
const { scrollToBlock } = useMarginSymbolsStore();
const { baseAsset } = storeToRefs(useChartSettingsStore()); // Import baseAsset from the klinesBybit store
const selectedSymbolId = ref(null); // Track the currently selected symbol

const handleSymbolClick = (symbolId, symbolName) => {
	selectedSymbolId.value = symbolId; // Update the selected symbol ID
	scrollToBlock(symbolId, symbolName); // Perform the scroll action
	baseAsset.value = symbolName; // Update the baseAsset in the klinesBybit store
};
</script>

<template>
	<!-- Block Symbols Section -->
	<div v-bind="$attrs" class="flex gap-2 text-sm items-center overflow-x-auto py-1 border-b border-green-600">
		<div class="">Symbols:</div>
		<ul class="flex gap-2">
			<!-- Link/Button for Each Symbol -->
			<li v-for="symbol in sortedSymbols" :key="symbol.id" @click="handleSymbolClick(symbol.id, symbol.symbol)"
				class="text-blue-500 cursor-pointer hover:underline uppercase transition"
				:class="selectedSymbolId === symbol.id ? 'bg-blue-500 text-white rounded px-2' : ''">
				{{ symbol.symbol }}
			</li>
		</ul>
	</div>
</template>
<style scoped></style>