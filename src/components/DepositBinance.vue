<script setup>
import { ref } from 'vue';
const date = ref(null);
const deposit = ref(null);
const wallet = ref(null);
const orders = ref(null);
const profit = ref(null);
const balance = (wallet.value + orders.value + profit.value).toFixed(2)
</script>

<template>
	<div class="">
		<div class="p-2 text-sm">
			<div class="flex justify-between border px-2 py-1">
				<div class="">BINANCE Balance</div>
				<!-- Total Profit and Loss Display -->
				<div class="text-center font-bold">
					<p :class="{
						'text-green-500 font-bold': balance > deposit,
						'text-red-500 font-bold': balance <= deposit,
					}">
						Total: {{ balance }}
					</p>
				</div>
			</div>
			<input id="date" type="number" v-model="date" step="1" placeholder="Date"
				class="w-[8ch] bg-gray-900 font-bold text-center">
			<input id="deposit" type="number" v-model="deposit" step="5" placeholder="Deposit" appearance-none required
				class="w-[8ch] bg-gray-900 font-bold text-center">
			<input id="wallet" type="number" v-model="wallet" step="0.005" placeholder="Wallet" appearance-none required
				class="w-[8ch] bg-gray-900 font-bold text-center">
			<input id="orders" type="number" v-model="orders" step="0.5" placeholder="Orders" appearance-none required
				class="w-[8ch] bg-gray-900 font-bold text-center">
			<input id="profit" type="number" v-model="profit" step="0.05" placeholder="Profit" appearance-none required
				class="w-[8ch] bg-gray-900 font-bold text-center">
		</div>
	</div>
</template>
<style scoped></style>
