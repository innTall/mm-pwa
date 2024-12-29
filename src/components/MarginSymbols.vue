<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMarginSymbolsStore } from "@/stores/marginSymbols.js";
import { useKlinesBybitStore } from "@/stores/klinesBybit.js";

const { sortedSymbols } = storeToRefs(useMarginSymbolsStore());
const { scrollToBlock } = useMarginSymbolsStore();
const { baseAsset } = storeToRefs(useKlinesBybitStore()); // Import baseAsset from the klinesBybit store
const selectedSymbolId = ref(null); // Track the currently selected symbol

const handleSymbolClick = (symbolId, symbolName) => {
	selectedSymbolId.value = symbolId; // Update the selected symbol ID
	scrollToBlock(symbolId, symbolName); // Perform the scroll action
	baseAsset.value = symbolName; // Update the baseAsset in the klinesBybit store
};
</script>

<template>
	<!-- Block Symbols Section -->
	<div class="overflow-x-auto">
		<div class="h-6 flex gap-2 text-sm items-center">
			<div class="">Symbols:</div>
			<ul class="flex gap-2">
				<!-- Link/Button for Each Symbol -->
				<li v-for="symbol in sortedSymbols" :key="symbol.id"
					@click="handleSymbolClick(symbol.id, symbol.symbol)"
					class="text-blue-500 cursor-pointer hover:underline uppercase transition"
					:class="selectedSymbolId === symbol.id ? 'bg-blue-500 text-white rounded px-2' : ''"
					>
					{{ symbol.symbol }}
				</li>
			</ul>
		</div>
		<hr class="border-green-600">
	</div>
</template>
<style scoped></style>