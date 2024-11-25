<script setup>
import FooterBybit from './FooterBybit.vue';
import { watch } from 'vue';
import { useDepoBybitStore } from '@/stores/depoBybit.js';
import { storeToRefs } from "pinia";

const { addBlock, deactivateBlock, updateLastBalance } = useDepoBybitStore();
const { blocks, balances, lastBalance } = storeToRefs(useDepoBybitStore());
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
				<div class="">BYBIT Balance</div>
				<!-- Total Profit and Loss Display -->
				<div class="text-center font-bold">
					<p :class="{
						'text-green-500 font-bold': balances > blocks.deposit,
						'text-red-500 font-bold': balances <= blocks.deposit,
					}">
						Total Balance: {{ balances.value }}
					</p>
				</div>
			</div>

			<div v-for="(block, index) in blocks" :key="index" class="p-2 text-sm">
				<div class="flex justify-between text-center text-xs">
					<div class="">Date:</div>
					<div class="">Deposit:</div>
					<div class="">Wallet:</div>
					<div class="">Balance:</div>
				</div>
				<div class="flex justify-between">
					<input id="date" type="date" v-model="block.date" step="1" placeholder="Date" :disabled="!block.isActive"
						class="w-[8ch] bg-gray-900 text-center">
					<input id="deposit" type="number" v-model="block.deposit" step="5" placeholder="Deposit" appearance-none
						required :disabled="!block.isActive" class="w-[8ch] bg-gray-900 text-center">
					<input id="wallet" type="number" v-model="block.wallet" step="0.005" placeholder="Wallet" appearance-none
						required :disabled="!block.isActive" class="w-[8ch] bg-gray-900 text-center">
					<div class="">{{ balances[index] }}</div>
				</div>
				<div class="flex justify-between text-xs">
					<div class="">OrdersSpot:</div>
					<div class="">ProfitSpot:</div>
					<div class="">OrdersMargin:</div>
					<div class="">ProfitMargin:</div>
				</div>
				<div class="flex justify-between">
					<input id="ordersSpot" type="number" v-model="block.ordersSpot" step="0.5" placeholder="Orders"
						appearance-none :disabled="!block.isActive" required class="w-[8ch] bg-gray-900 text-center">
					<input id="profitSpot" type="number" v-model="block.profitSpot" step="0.05" placeholder="Profit"
						appearance-none :disabled="!block.isActive" required class="w-[8ch] bg-gray-900 text-center">
					<input id="ordersMargin" type="number" v-model="block.ordersMargin" step="0.5" placeholder="Orders"
						appearance-none :disabled="!block.isActive" required class="w-[8ch] bg-gray-900 text-center">
					<input id="profitMargin" type="number" v-model="block.profitMargin" step="0.05" placeholder="Profit"
						appearance-none :disabled="!block.isActive" required class="w-[8ch] bg-gray-900 text-center">
				</div>
				<button v-if="block.isActive" @click="handleAddBlock(index)" class="mt-2 px-4 py-1 bg-green-600 text-white">
					Add New Block
				</button>
				<hr class="border-green-600">
			</div>
		</div>
		<div class="fixed bottom-0 left-0 w-full h-12 z-10 bg-gray-900">
			<!-- Passing lastBalance to the child component -->
			<FooterBybit :lastBalance="lastBalance" />
		</div>
	</div>
</template>
<style scoped></style>