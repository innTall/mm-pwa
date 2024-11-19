<script setup>
import { watch } from "vue";
import { useOrderStore } from "@/stores/orders.js";
const orderStore = useOrderStore();
// Watch for changes to all blocks and auto-add a new block when needed
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
	<div>
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
					<label :class="{
						'text-green-500 font-bold': block.activeValue === 'profit',
						'text-gray-500': block.activeValue !== 'profit',
					}">
						<input type="radio" value="profit" v-model="block.activeValue" />
						Profit
					</label>
					<span :class="{
						'text-green-500': block.activeValue === 'profit',
						'text-gray-500': block.activeValue !== 'profit',
					}">
						{{ orderStore.calculateProfit(block.buy, block.amnt, block.tp) }}
					</span>

					<!-- Loss Radio Button and Label -->
					<label :class="{
						'text-red-500 font-bold': block.activeValue === 'loss',
						'text-gray-500': block.activeValue !== 'loss',
					}">
						<input type="radio" value="loss" v-model="block.activeValue" />
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
			<input id="a" type="date" v-model="block.date" placeholder="Date"
				class="w-1/6 bg-gray-900 font-bold text-center" />
			<input id="b" type="text" v-model="block.symbol" placeholder="Symbol"
				class="w-1/6 bg-gray-900 font-bold text-center" />
			<input id="c" type="number" v-model="block.buy" placeholder="Buy"
				class="w-1/6 bg-gray-900 font-bold text-center" />
			<input id="d" type="number" v-model="block.amnt" placeholder="Amnt"
				class="w-1/6 bg-gray-900 font-bold text-center" />
			<input id="e" type="number" v-model="block.tp" placeholder="TP" class="w-1/6 bg-gray-900 font-bold text-center" />
			<input id="f" type="number" v-model="block.sl" placeholder="SL" class="w-1/6 bg-gray-900 font-bold text-center" />

			<hr class="bg-green-600 mt-4" />
		</div>
	</div>
</template>

<style scoped></style>