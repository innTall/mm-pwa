<script setup>
import { ref } from 'vue';
const date = ref(null);
const deposit = ref(null);
const withdrawal = ref(null);
const wallet = ref(null);
const ordersSpot = ref(null);
const profitSpot = ref(null);
const ordersMargin = ref(null);
const profitMargin = ref(null);
const balance = (wallet.value + ordersSpot.value + profitSpot.value + ordersMargin.value + profitMargin.value).toFixed(2)
const totalBalance = ref();
</script>

<template>
	<div class="">
		<div class="p-2 text-sm">
			<div class="flex justify-between border px-2 py-1">
				<div class="">BYBIT Balance</div>
				<!-- Total Profit and Loss Display -->
				<div class="text-center font-bold">
					<p :class="{
						'text-green-500 font-bold': totalBalance > deposit,
						'text-red-500 font-bold': totalBalance <= deposit,
					}">
						Total Balance: {{ totalBalance }}
					</p>
				</div>
			</div>

			<div class="">
				<div class="flex justify-between">
					<div class="">
						<input id="date" type="number" v-model="date" step="1" placeholder="Date"
							class="w-[8ch] bg-gray-900 font-bold text-center">
						<input id="deposit" type="number" v-model="deposit" step="5" placeholder="Deposit" appearance-none required
							class="w-[8ch] bg-gray-900 font-bold text-center">
						<input id="withdrawal" type="number" v-model="withdrawal" step="5" placeholder="Withdrawal" appearance-none
							required class="w-[8ch] bg-gray-900 font-bold text-center">
						<input id="wallet" type="number" v-model="wallet" step="0.005" placeholder="Wallet" appearance-none required
							class="w-[8ch] bg-gray-900 font-bold text-center">
					</div>
					<div class="">Balance: {{ balance }}</div>
				</div>
				<div class="flex justify-between">
					<div class="">Spot:
						<input id="ordersSpot" type="number" v-model="ordersSpot" step="0.5" placeholder="Orders" appearance-none
							required class="w-[8ch] bg-gray-900 font-bold text-center">
						<input id="profitSpot" type="number" v-model="profitSpot" step="0.05" placeholder="Profit" appearance-none
							required class="w-[8ch] bg-gray-900 font-bold text-center">
					</div>
					<div class="">Margin:
						<input id="ordersMargin" type="number" v-model="ordersMargin" step="0.5" placeholder="Orders"
							appearance-none required class="w-[8ch] bg-gray-900 font-bold text-center">
						<input id="profitMargin" type="number" v-model="profitMargin" step="0.05" placeholder="Profit"
							appearance-none required class="w-[8ch] bg-gray-900 font-bold text-center">
					</div>
				</div>
			</div>
		</div>
		<hr class="border-green-600">
	</div>
</template>
<style scoped></style>