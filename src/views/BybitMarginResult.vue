<script setup>
import { watch } from "vue";
import { storeToRefs } from "pinia";
import { useOrderStore } from "@/stores/orders.js";
const { date, symbol, buy, amnt, tp, sl, activeValue } = storeToRefs(useOrderStore());
const { TP, SL } = useOrderStore();
</script>

<template>
	<div class="px-2 py-1">
		<div class="flex justify-between border px-2">
			<p class="">Bybit Margin Order</p>
		</div>
		<div class="flex">
			<!-- Header -->
			<div class="container flex justify-between">
				<div class="text-yellow-400 font-bold">Order data</div>
				<div class="flex gap-3">
					<div>Result</div>
					<div class="flex gap-3">
						<label for="profit" :class="{
								'text-green-500 font-bold': activeValue === 'profit',
								'text-gray-500': activeValue !== 'profit',
							}">
							<input id="profit" type="radio" value="profit" v-model="activeValue" />
							TP
						</label>
						<span :class="{
								'text-green-500': activeValue === 'profit',
								'text-gray-500': activeValue !== 'profit',
							}">
							{{ TP(buy, amnt, tp) }}
						</span>

						<!-- Loss Radio Button and Label -->
						<label for="loss" :class="{
								'text-red-500 font-bold': activeValue === 'loss',
								'text-gray-500': activeValue !== 'loss',
							}">
							<input id="loss" type="radio" value="loss" v-model="activeValue" />
							SL
						</label>
						<span :class="{
								'text-red-500': activeValue === 'loss',
								'text-gray-500': activeValue !== 'loss',
							}">
							{{ SL(buy, amnt, sl) }}
						</span>
					</div>
				</div>
			</div>
		</div>
		<!-- Input Fields -->
		<div class="">
			<input id="date" type="date" v-model="date" placeholder="Date"
				class="w-[8ch] bg-gray-900 text-center appearance-none" />
			<input id="symbol" type="text" v-model="symbol" placeholder="Symbol"
				class="w-[6ch] bg-gray-900 text-center" />
			<input id="buy" type="number" v-model="buy" placeholder="Buy"
				class="w-[8ch] bg-gray-900 text-center text-blue-400 appearance-none" />
			<input id="amnt" type="number" v-model="amnt" placeholder="Amnt"
				class="w-[6ch] bg-gray-900 text-center appearance-none" />
			<input id="tp" type="number" v-model="tp" placeholder="TP"
				class="w-[8ch] bg-gray-900 text-center text-green-400 appearance-none" />
			<input id="sl" type="number" v-model="sl" placeholder="SL"
				class="w-[8ch] bg-gray-900 text-center text-red-400 appearance-none" />
		</div>
		<hr class="border-green-600 mt-2" />
	</div>
</template>

<style scoped></style>