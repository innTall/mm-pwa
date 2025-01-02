<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import MarginOrder from './MarginOrder.vue';
import { useOrdersBlockStore } from '@/stores/ordersBlock.js';
import { useModalRemoveStore } from "@/stores/modalRemove.js";
const { openDialog } = useModalRemoveStore();
const { blocks, totalActiveTpAndSl } = storeToRefs(useOrdersBlockStore());
const { removeBlock, addOrder } = useOrdersBlockStore();
const telegramChannelUrl = "https://t.me/grids_to_long"; // Replace with your Telegram channel URL
const openRemoveBlockDialog = (blockId) => {
	openDialog("Delete this block?", () => {
		removeBlock(blockId);
	});
};
const getBlockTotalColor = (blockIndex) => {
	const value = totalActiveTpAndSl.value[blockIndex]; // Assuming this is computed for each block
	return value > 0 ? "text-green-500" : value < 0 ? "text-red-500" : "text-white";
};
// Computed property to show only the last block.
//const visibleBlocks = computed(() => {
//	return blocks.value.slice(-1); // Returns the last block in the list.
//});
</script>

<template>
	<div v-bind="$attrs" class="text-sm pt-2 border-b border-green-600">
		<div v-for="(block, index) in blocks" :key="block.id" :id="'block-' + block.id" class="">
			<div class="flex justify-between pb-2 border-b">
				<input :id="'symbol-' + block.id" type="text" v-model="block.symbol" placeholder="Symbol"
					class="w-[8ch] text-center font-bold bg-gray-900 border uppercase" />
				<div class="font-bold">
					<span :class="getBlockTotalColor(index)">{{ totalActiveTpAndSl[index].toFixed(2) }}</span>
				</div>
				<div class="">Reserv</div>
				<div class="flex items-center space-x-4">
					<a :href="telegramChannelUrl" target="_blank" rel="noopener noreferrer"
						class="text-blue-500 hover:text-blue-700">
						<!-- Telegram Icon SVG -->
						<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 border border-blue-500 rounded-full" fill="none"
							viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
							<path
								d="M21.743 3.263a1.254 1.254 0 0 0-1.396-.026L3.88 11.394c-.355.215-.572.574-.57.98.002.406.222.765.578.977l4.064 2.357c.261.15.578.142.832-.019l2.95-1.844 2.142 2.16c.168.169.422.241.66.185a.786.786 0 0 0 .504-.456l3.73-11.942a.788.788 0 0 0-.007-.51z" />
						</svg>
					</a>
				</div>
				<button @click="openRemoveBlockDialog(block.id)" class="px-2 font-bold text-red-600 border border-red-600">
					X
				</button>
				<button @click="addOrder(block)" id="addOrder" class="px-2 font-bold text-green-600 border border-green-600">
					+
				</button>
			</div>
			<div class="overflow-y-auto h-16">
				<MarginOrder :block="block" />
			</div>
		</div>
	</div>
</template>
<style scoped></style>