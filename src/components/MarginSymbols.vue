<script setup>
import { storeToRefs } from 'pinia';
import { useMarginSymbolsStore } from "@/stores/marginSymbols.js";
const { sortedSymbols } = storeToRefs(useMarginSymbolsStore());
const { scrollToBlock } = useMarginSymbolsStore();
</script>

<template>
	<!-- Block Symbols Section -->
	<div class="">
		<div class="h-6 flex gap-2 text-sm items-center">
			<div class="">Symbols:</div>
			<ul class="flex gap-2">
				<!-- Link/Button for Each Symbol -->
				<li v-for="symbol in sortedSymbols" :key="symbol.id"
					class="text-blue-500 cursor-pointer hover:underline uppercase"
					@click="scrollToBlock(symbol.id)">
					{{ symbol.symbol }}
				</li>
			</ul>
		</div>
		<hr class="border-green-600">
	</div>
</template>
<style scoped>
/* Highlight effect for blocks */
.highlight {
	animation: highlightFade 1s ease-in-out;
	background-color: rgba(0, 255, 0, 0.2);
}
@keyframes highlightFade {
	0% {
		background-color: rgba(0, 255, 0, 0.4);
	}
	100% {
		background-color: transparent;
	}
}
</style>