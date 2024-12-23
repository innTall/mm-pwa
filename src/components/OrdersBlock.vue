<script setup>
import { storeToRefs } from 'pinia';
import { useOrdersBlockStore } from '@/stores/ordersBlock';
const { blocks } = storeToRefs(useOrdersBlockStore());
const { removeBlock, } = useOrdersBlockStore();
</script>

<template>
	<div>
		<div v-for="block in blocks" :key="block.id" class="flex justify-between text-sm mt-2">
			<input type="text" v-model="block.symbol" placeholder="Symbol"
				class="w-[8ch] text-center font-bold bg-gray-900 border uppercase" />
			<input type="number" v-model="block.interval" placeholder="tf" class="w-[8ch] bg-gray-900 border text-center" />
			<input type="text" v-model="block.quoteAsset" placeholder="usdt" class="w-[8ch] bg-gray-900 border text-center uppercase" />
			<button @click="removeBlock(block.id)" class="px-2 font-bold text-red-600 border border-red-600">
				X Block
			</button>
		</div>
		<hr class="border-green-600 mt-2">
	</div>
</template>
<style scoped></style>