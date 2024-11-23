<script setup>
//import { ref, watch, computed } from "vue";
import { useBinanceStore } from "@/stores/binance.js";
import { storeToRefs } from "pinia";

const { date, symbol, buy, amnt, sell, cost, roi, tp, activeMetric } = storeToRefs(useBybitStore());

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
				<!-- ROI Section -->
				<div class="flex gap-3">
					<label for="roi" class="flex items-center">
						<input id="roi" type="radio" name="metric" value="roi" v-model="activeMetric" class="mr-1" />
						ROI, % =
					</label>
					<span class="">{{ roi }}</span>
					<!-- TP Section -->
					<label for="tp" class="flex items-center">
						<input id="tp" type="radio" name="metric" value="tp" v-model="activeMetric" class="mr-1" />
						TP, $ =
					</label>
					<span class="">{{ tp }}</span>
				</div>
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