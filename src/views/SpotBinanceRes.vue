<script setup>
import FooterBinance from '../components/FooterBinance.vue';
import { ref, watch, nextTick } from "vue";
import { useSpotBinanceResStore } from "@/stores/spotBinanceRes.js";
import { storeToRefs } from "pinia";

const { isBlockComplete, addBlock, removeBlock } = useSpotBinanceResStore();
const { blocks, blockMetrics, totalProfit } = storeToRefs(useSpotBinanceResStore());

const isFirstClickOnSell = ref(true); // Flag to track the first click
// Function to handle the first focus on the sell field
const handleSellFocus = () => {
	if (isFirstClickOnSell.value) {
		addBlock(); // Add a new block
		isFirstClickOnSell.value = false; // Prevent subsequent additions
	}
};

// Watch for changes in blocks and add a new block at the top if needed
watch(
	() => blocks.value.map((block) => ({ ...block })), // Deep watch on all blocks
	(newBlocks) => {
		const firstBlock = newBlocks[0]; // Check the first block
		if (isBlockComplete(firstBlock)) {
			addBlock(); // Add a new block at the top
		}
	},
	{ deep: true }
);

const clearField = (field) => {
	if (field && typeof field === 'object' && 'value' in field) {
		field.value = '';
	} else {
		field = '';
	}
};
// Helper functions
const isEditable = (block) => block.activeMetric === 'roi';
const isDeletable = (block) => block.activeMetric === 'roi';
</script>

<template>
	<div class="container min-h-screen mb-10 px-2 py-1 text-sm">
		<div class="flex justify-between border px-2 py-1">
			<div class="">BINANCE Spot Order</div>
			<div class="text-center font-bold">
				<div class="">Total Profit: $, {{ totalProfit }}</div>
			</div>
		</div>
		<!-- Dynamic Block -->
		<div v-for="(block, index) in blocks" :key="index" class="mb-2">
			<div class="container flex justify-between py-1 items-center">
				<div class="flex items-center gap-3">
					<div v-if="isDeletable(block)" class="text-right">
						<button class="w-5 bg-red-600 text-white hover:bg-red-700" @click="removeBlock(index)">
							X
						</button>
					</div>
					<div class="text-yellow-400 font-bold">Order {{ index + 1 }}</div>
				</div>
				<!-- ROI Section -->
				<div class="flex gap-3">
					<label :for="'roi-' + index" class="flex items-center">
						<input :id="'roi-' + index" type="radio" :name="'metric-' + index" value="roi" v-model="block.activeMetric"
							class="mr-1" />
						ROI, %
					</label>
					<span class="">{{ blockMetrics[index]?.roi }}</span>
					<!-- TP Section -->
					<label :for="'tp-' + index" class="flex items-center">
						<input :id="'tp-' + index" type="radio" :name="'metric-' + index" value="tp" v-model="block.activeMetric"
							class="mr-1" />
						TP, $
					</label>
					<span class="">{{ blockMetrics[index]?.tp }}</span>
				</div>
			</div>
			<!-- Input Fields -->
			<div class="flex justify-between px-2">
				<div class="">
					<input :id="'date-' + index" type="date" v-model="block.date" placeholder="Date"
						class="w-[8ch] bg-gray-900 text-center appearance-none" :disabled="!isEditable(block)"
						@focus="clearField(date)" />
					<input :id="'symbol-' + index" type="text" v-model="block.symbol" placeholder="Symbol"
						class="w-[6ch] bg-gray-900 text-center uppercase" :disabled="!isEditable(block)"
						@focus="clearField(symbol)" />
					<input :id="'buy-' + index" type="number" v-model="block.buy" placeholder="Buy"
						class="w-[8ch] bg-gray-900 text-center text-green-400 appearance-none" :disabled="!isEditable(block)"
						@focus="clearField(buy)" />
					<input :id="'amnt-' + index" type="number" v-model="block.amnt" placeholder="Amnt"
						class="w-[6ch] bg-gray-900 text-center appearance-none" :disabled="!isEditable(block)"
						@focus="clearField(amnt)" />
					<input :id="'sell-' + index" type="number" v-model="block.sell" placeholder="Sell"
						class="w-[8ch] bg-gray-900 text-center text-red-600 appearance-none" :disabled="!isEditable(block)"
						@focus="clearField(sell); handleSellFocus" />
				</div>
				<div class="font-bold">{{ blockMetrics[index]?.cost }}</div>
			</div>
			<hr class="border-green-600 mt-1" />
		</div>
		<footer class="fixed bottom-0 left-0 w-full h-12 z-10 bg-gray-900">
			<FooterBinance />
		</footer>
	</div>
</template>

<style scoped></style>