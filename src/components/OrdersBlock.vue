<script setup>
import { storeToRefs } from 'pinia';
import MarginOrder from './MarginOrder.vue';
import { useOrdersBlockStore } from '@/stores/ordersBlock.js';
import { useModalRemoveStore } from "@/stores/modalRemove.js";
const { openDialog } = useModalRemoveStore();
const { showModalRemove, confirmMessage, } = storeToRefs(useModalRemoveStore());
const { blocks } = storeToRefs(useOrdersBlockStore());
const { addBlock, removeBlock, addOrder } = useOrdersBlockStore();
const openRemoveBlockDialog = (blockId) => {
	openDialog("Delete this block?", () => {
		removeBlock(blockId);
	});
};
</script>

<template>
	<div v-for="block in blocks" :key="block.id" :id="'block-' + block.id" class="text-sm mt-2">
		<div class="flex justify-between">
			<input :id="'symbol-' + block.id" type="text" v-model="block.symbol" placeholder="Symbol"
				class="w-[8ch] text-center font-bold bg-gray-900 border uppercase" />
			<div class="">TotalBalance</div>
			<div class="">Reserv</div>
			<button id="tg" class="px-2 bg-gray-700">TG</button>
			<button @click="openRemoveBlockDialog(block.id)" class="px-2 font-bold text-red-600 border border-red-600">
				X
			</button>
			<button @click="addOrder(block)" id="addOrder" class="px-2 font-bold text-green-600 border border-green-600">
				+
			</button>
		</div>
		<hr class="border-green-600 mt-2">
		<MarginOrder :block="block" />
	</div>
</template>
<style scoped></style>