<script setup>
import FooterBinance from './FooterBinance.vue';
import { watch } from 'vue';
import { useDepoBinanceStore } from '@/stores/depoBinance.js';
import { storeToRefs } from "pinia";

const { addBlock, deactivateBlock, updateLastBalance } = useDepoBinanceStore();
const { blocks, balances, lastBalance } = storeToRefs(useDepoBinanceStore());
const handleAddBlock = (index) => {
	deactivateBlock(index); // Deactivate the current block
	addBlock(); // Add a new block
};

watch(balances, () => {
	updateLastBalance(); // Update lastBalance when balances change
});
</script>

<template>
	<div class="">
		<div class="p-2 text-sm">
			<div class="flex justify-between border px-2 py-1">
				<div class="">BINANCE Balance</div>
				<!-- Total Profit and Loss Display -->
				<div class="text-center">
					<p :class="{
						'text-green-500 font-bold': balances > blocks.deposit,
						'text-red-500 font-bold': balances <= blocks.deposit,
					}">
						Total: {{ balances.value }}
					</p>
				</div>
			</div>

			<div v-for="(block, index) in blocks" :key="index" class="p-2 text-sm">
				<div class="flex justify-between text-center text-xs">
					<div class="">Date:</div>
					<div class="">Deposit:</div>
					<div class="">Wallet:</div>
					<div class="">Orders:</div>
					<div class="">Profit:</div>
					<div class="">Balance:</div>
				</div>
				<div class="flex justify-between text-center">
					<input id="date" type="date" v-model="block.date" step="1" placeholder="Date" :disabled="!block.isActive"
						class="w-[7ch] bg-gray-900 text-center">
					<input id="deposit" type="number" v-model="block.deposit" step="5" placeholder="Deposit" appearance-none
						required :disabled="!block.isActive" class="w-[7ch] bg-gray-900 text-center">
					<input id="wallet" type="number" v-model="block.wallet" step="0.005" placeholder="Wallet" appearance-none
						required :disabled="!block.isActive" class="w-[7ch] bg-gray-900 text-center">
					<input id="orders" type="number" v-model="block.orders" step="0.5" placeholder="Orders" appearance-none
						required :disabled="!block.isActive" class="w-[7ch] bg-gray-900 text-center">
					<input id="profit" type="number" v-model="block.profit" step="0.05" placeholder="Profit" appearance-none
						required :disabled="!block.isActive" class="w-[7ch] bg-gray-900 text-center">
					<div class="">{{ balances[index] }}</div>
				</div>
				<button v-if="block.isActive" @click="handleAddBlock(index)" class="mt-2 px-4 py-1 bg-green-600 text-white">
					Add New Block
				</button>
				<hr class="border-green-600">
			</div>
		</div>
		<div class="fixed bottom-0 left-0 w-full h-12 z-10 bg-gray-900">
			<!-- Passing lastBalance to the child component -->
			<FooterBinance :lastBalance="lastBalance" />
		</div>
	</div>
</template>
<style scoped></style>
