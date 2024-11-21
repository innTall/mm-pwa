<script setup>
import { watch } from "vue";
import { useBybitStore } from "@/stores/bybitSpot.js";
const orderStore = useBybitStore();
// Watch for changes to all blocks and auto-add a new block when needed
const addOrder = () => {
	orderStore.addBlock();
};

const blocks = orderStore.blocks;
const totalSum = orderStore.totalSum;

watch(
	() => orderStore.blocks.map((block) => ({ ...block })), // Deep watch on all blocks
	(newBlocks) => {
		const lastBlock = newBlocks[newBlocks.length - 1];
		if (orderStore.isBlockComplete(lastBlock)) {
			orderStore.addBlock();
		}
	},
	{ deep: true }
);
</script>

<template>
	<div class="px-2 py-1">
		<div class="flex justify-between border px-2">
			<p class="">Bybit Margin Order</p>
			<div :class="{
				'text-green-500': orderStore.totalSum > 0,
				'text-red-500': orderStore.totalSum < 0,
				'text-gray-500': orderStore.totalSum === 0,
			}" class="font-bold text-md">
				Total Result: {{ orderStore.totalSum.toFixed(2) }}
			</div>
		</div>
		<div v-for="(block, index) in orderStore.blocks" :key="index">
			<div class="flex gap-3">
				<!-- Header -->
				<div class="flex gap-5">
					<p class="text-yellow-400 font-bold">Order data</p>
					<p>Result</p>
				</div>

				<!-- Profit and Loss Section -->
				<div class="flex gap-2">
					<!-- Profit Radio Button and Label -->
					<label :for="'profit-' + index" :class="{
						'text-green-500 font-bold': block.activeValue === 'profit',
						'text-gray-500': block.activeValue !== 'profit',
					}">
						<input :id="'profit-' + index" type="radio" value="profit" v-model="block.activeValue" />
						Profit
					</label>
					<span :class="{
						'text-green-500': block.activeValue === 'profit',
						'text-gray-500': block.activeValue !== 'profit',
					}">
						{{ orderStore.calculateProfit(block.buy, block.amnt, block.tp) }}
					</span>

					<!-- Loss Radio Button and Label -->
					<label :for="'loss-' + index" :class="{
						'text-red-500 font-bold': block.activeValue === 'loss',
						'text-gray-500': block.activeValue !== 'loss',
					}">
						<input :id="'loss-' + index" type="radio" value="loss" v-model="block.activeValue" />
						Loss
					</label>
					<span :class="{
						'text-red-500': block.activeValue === 'loss',
						'text-gray-500': block.activeValue !== 'loss',
					}">
						{{ orderStore.calculateLoss(block.buy, block.amnt, block.sl) }}
					</span>
				</div>
			</div>

			<!-- Input Fields -->
			<div class="">
				<input :id="'date-' + index" type="date" v-model="block.date" placeholder="Date"
					class="w-1/6 bg-gray-900 font-bold text-center" />
				<input :id="'symbol-' + index" type="text" v-model="block.symbol" placeholder="Symbol"
					class="w-1/6 bg-gray-900 font-bold text-center" />
				<input :id="'buy-' + index" type="number" v-model="block.buy" placeholder="Buy"
					class="w-1/6 bg-gray-900 font-bold text-center text-blue-400" />
				<input :id="'amnt-' + index" type="number" v-model="block.amnt" placeholder="Amnt"
					class="w-1/6 bg-gray-900 font-bold text-center" />
				<input :id="'tp-' + index" type="number" v-model="block.tp" placeholder="TP"
					class="w-1/6 bg-gray-900 font-bold text-center text-green-400" />
				<input :id="'sl-' + index" type="number" v-model="block.sl" placeholder="SL"
					class="w-1/6 bg-gray-900 font-bold text-center text-red-400" />
			</div>
			<hr class="border-green-600 mt-2" />
		</div>
	</div>
</template>

<style scoped></style>