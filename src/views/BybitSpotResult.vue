<script setup>
import { ref, watch, computed } from "vue";
import { useBybitStore } from "@/stores/bybit.js";
import { storeToRefs } from "pinia";

const { isBlockComplete, addBlock, removeBlock } = useBybitStore();
const { blocks, blockMetrics, totalProfit } = storeToRefs(useBybitStore());

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
</script>

<template>
	<div class="px-2 py-1">
		<div class="flex justify-between border px-2">
			<div class="">Bybit Spot Order</div>
			<div class="text-center font-bold">
				<div class="">Total Profit: $, {{ totalProfit }}</div>
			</div>
		</div>
		<!-- Dynamic Block -->
		<div v-for="(block, index) in blocks" :key="index" class="mb-2">
			<div class="container flex justify-between mt-1 items-center">
				<div class="flex items-center">
					<div v-if="block.activeMetric === 'roi'" class="text-right">
						<button class="w-5 bg-red-600 text-white hover:bg-red-700" @click="removeBlock(index)">
							X
						</button>
					</div>
					<div class="text-yellow-400 font-bold">Order {{ index + 1 }}</div>
				</div>
				<div class="flex justify-between">
					<!-- ROI Section -->
					<div class="flex gap-3">
						<label :for="'roi-' + index" class="flex items-center">
							<input :id="'roi-' + index" type="radio" :name="'metric-' + index" value="roi"
								v-model="block.activeMetric" class="mr-1" />
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
			</div>
			<!-- Input Fields -->
			<div class="flex justify-between px-2">
				<div class="">
					<input :id="'date-' + index" type="date" v-model="block.date" placeholder="Date"
						class="w-[8ch] bg-gray-900 text-center appearance-none" @focus="clearField(date)" />
					<input :id="'symbol-' + index" type="text" v-model="block.symbol" placeholder="Symbol"
						class="w-[6ch] bg-gray-900 text-center" @focus="clearField(symbol)" />
					<input :id="'buy-' + index" type="number" v-model="block.buy" placeholder="Buy"
						class="w-[8ch] bg-gray-900 text-center text-green-400 appearance-none" @focus="clearField(buy)" />
					<input :id="'amnt-' + index" type="number" v-model="block.amnt" placeholder="Amnt"
						class="w-[6ch] bg-gray-900 text-center appearance-none" @focus="clearField(amnt)" />
					<input :id="'sell-' + index" type="number" v-model="block.sell" placeholder="Sell"
						class="w-[8ch] bg-gray-900 text-center text-red-600 appearance-none" @focus="clearField(sell)" />
				</div>
				<div class="font-bold">{{ blockMetrics[index]?.cost }}</div>
			</div>
			<hr class="border-green-600 mt-1" />
		</div>
	</div>
</template>

<style scoped></style>