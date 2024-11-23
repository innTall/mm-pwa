<script setup>
//import { ref, watch, computed } from "vue";
import { useBybitStore } from "@/stores/bybit.js";
import { storeToRefs } from "pinia";

const { date, symbol, buy, amnt, sell, cost, profit, tp } = storeToRefs(useBybitStore());

const clearField = (field) => {
	if (field && typeof field === 'object' && 'value' in field) {
		field.value = '';
	} else {
		field = '';
	}
};
</script>

<template>
	<div class="px-2 py-1">
		<div class="flex justify-between border px-2">
			<div class="">Bybit Spot Order</div>
			<div class="text-center font-bold">
				<div class="">Total Profit</div>
			</div>
		</div>
		<div class="container flex justify-between mt-1">
			<div class="text-yellow-400 font-bold">Order</div>
			<div class="flex justify-between gap-4">
				<div class="">Result</div>
				<div class="">TP, % {{ profit }}</div>
				<div class="">TP, $ {{ tp }}</div>
			</div>
		</div>
	</div>
	<!-- Input Fields -->
	<div class="flex justify-between px-2">
		<div class="">
			<input id="date" type="date" v-model="date" placeholder="Date"
				class="w-[8ch] bg-gray-900 text-center appearance-none" @focus="clearField(date)" />
			<input id="symbol" type="text" v-model="symbol" placeholder="Symbol" class="w-[6ch] bg-gray-900 text-center"
				@focus="clearField(symbol)" />
			<input id="buy" type="number" v-model="buy" placeholder="Buy"
				class="w-[8ch] bg-gray-900 text-center text-green-400 appearance-none" @focus="clearField(buy)" />
			<input id="amnt" type="number" v-model="amnt" placeholder="Amnt"
				class="w-[6ch] bg-gray-900 text-center appearance-none" @focus="clearField(amnt)" />
			<input id="sell" type="number" v-model="sell" placeholder="Sell"
				class="w-[8ch] bg-gray-900 text-center text-red-600 appearance-none" @focus="clearField(sell)" />
		</div>
		<div class="font-bold">$, {{ cost }}</div>
	</div>
	<hr class="border-green-600 mt-1" />
</template>

<style scoped></style>