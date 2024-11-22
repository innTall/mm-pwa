<script setup>
import { watch } from "vue";
import { useBybitStore } from "@/stores/bybitSpot.js";
const orderStore = useBybitStore();
// Watch for changes to all blocks and auto-add a new block when needed
const addOrder = () => {
	orderStore.addBlockAtTop(); // Assuming this method is added to the store
};

// Get reactive blocks and total sum from the store
const blocks = orderStore.blocks;
const totalSum = orderStore.totalSum;

// Watch for changes in blocks and add a new block at the top if needed
watch(
	() => orderStore.blocks.map((block) => ({ ...block })), // Deep watch on all blocks
	(newBlocks) => {
		const firstBlock = newBlocks[0]; // Check the first block
		if (orderStore.isBlockComplete(firstBlock)) {
			orderStore.addBlockAtTop(); // Add a new block at the top
		}
	},
	{ deep: true }
);
// Delete block logic with confirmation
const confirmAndDeleteBlock = (index) => {
	const confirmed = window.confirm("Are you sure you want to delete this block?");
	if (confirmed) {
		orderStore.deleteBlock(index);
	}
};
</script>

<template>
	<div class="px-2 py-1">
		<div class="flex justify-between border px-2">
			<p class="">Bybit Spot Order</p>
			<div :class="{
				'text-green-500': orderStore.totalSum > 0,
				'text-red-500': orderStore.totalSum < 0,
				'text-gray-500': orderStore.totalSum === 0,
			}" class="font-bold text-md">
				Total Result: {{ orderStore.totalSum.toFixed(2) }}
			</div>
		</div>
		<div v-for="(block, index) in orderStore.blocks" :key="index">
			<div class="flex">
				<!-- Header -->
				<button @click="confirmAndDeleteBlock(index)" class="w-5 bg-red-600 text-white">
					X
				</button> 
				<div class="container flex justify-between">
					<div class="text-yellow-400 font-bold">Order data</div>
					<div class="flex gap-3">
						<div>Result</div>

						<!-- Profit and Loss Section -->
						<div class="flex gap-2">
							<!-- Profit Radio Button and Label -->
							<label :for="'profit-' + index" :class="{
								'text-green-500 font-bold': block.activeValue === 'profit',
								'text-gray-500': block.activeValue !== 'profit',
							}">
								<input :id="'profit-' + index" type="radio" value="profit" v-model="block.activeValue" />
								TP
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
								SL
							</label>
							<span :class="{
								'text-red-500': block.activeValue === 'loss',
								'text-gray-500': block.activeValue !== 'loss',
							}">
								{{ orderStore.calculateLoss(block.buy, block.amnt, block.sl) }}
							</span>
						</div>
					</div>
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