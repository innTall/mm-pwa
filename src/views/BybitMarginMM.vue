<script setup>
import { ref, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useSettingsStore } from '../stores/settings.js';
const { depo, leverage, risk_sl, risk_margin, coefPrice } = storeToRefs(useSettingsStore());
// Constants for fee
const feeBuy = 0.0002;
const feeSell = 0.00055;

const setPrice = ref(0);
// Watch for changes to setPrice and handle empty input
watch(setPrice, (newValue) => {
	if (newValue === null || newValue === '') {
		setPrice.value = 0; // Reset to 0 if the input is cleared
	}
});

// Adjust the `digits` computed property to return the required decimal places
const digits = computed(() => {
	const priceValue = setPrice.value;
	if (priceValue >= 10000) return 1;
	if (priceValue >= 1000) return 2;
	if (priceValue >= 100) return 2;
	if (priceValue >= 10) return 3;
	if (priceValue >= 1) return 3;
	if (priceValue >= 0.1) return 4;
	return 5;
});

// Computed property for formatted lote with decimal places
const digits_lote = computed(() => {
	const digitsPrice = digits.value;
	if (digitsPrice == 1) return 3;
	if (digitsPrice == 2) return 2;
	if (digitsPrice == 3) return 1;
	if (digitsPrice >= 4) return 0;
});

// Base options
const risk = risk_sl.value / 100;
const margin = computed(() => (depo.value * risk * risk_margin.value).toFixed(2));
const lote = computed(() => ((leverage.value * margin.value) / setPrice.value).toFixed(digits_lote.value));

// Trade options calculations
const tp1 = computed(() => (depo.value * risk).toFixed(2));
const tp2 = computed(() => (depo.value * risk * 2).toFixed(2));
const tp3 = computed(() => (depo.value * risk * 3).toFixed(2));
const tp4 = computed(() => (depo.value * risk * 4).toFixed(2));
const tp5 = computed(() => (depo.value * risk * 5).toFixed(2));
const sl1 = computed(() => (depo.value * risk / 5).toFixed(2));
const sl2 = computed(() => (sl1.value * 2).toFixed(2));
const sl3 = computed(() => (sl1.value * 3).toFixed(2));
const sl4 = computed(() => (sl1.value * 4).toFixed(2));
const sl5 = computed(() => (sl1.value * 5).toFixed(2));

// Calculated values
const priceDiff1 = computed(
	() =>
		(setPrice.value -
			((sl1.value - lote.value * setPrice.value) * -1) / lote.value
		).toFixed(digits.value));
const priceDiff2 = computed(
	() =>
		(setPrice.value -
			((sl2.value - lote.value * setPrice.value) * -1) / lote.value
		).toFixed(digits.value));
const priceDiff3 = computed(
	() =>
		(setPrice.value -
			((sl3.value - lote.value * setPrice.value) * -1) / lote.value
		).toFixed(digits.value));
const priceDiff4 = computed(
	() =>
		(setPrice.value -
			((sl4.value - lote.value * setPrice.value) * -1) / lote.value
		).toFixed(digits.value));
const priceDiff5 = computed(
	() =>
		(setPrice.value -
			((sl5.value - lote.value * setPrice.value) * -1) / lote.value
		).toFixed(digits.value));

const buyPrice = computed(
	() => (setPrice.value + priceDiff1.value / 2 * coefPrice.value
	).toFixed(digits.value));

const zeroPrice = computed(
	() => (+buyPrice.value + buyPrice.value * (feeBuy + feeSell)).toFixed(digits.value));
//const abc = +(lote.value * buyPrice.value).toFixed(digits.value);
//const aaa = (+tp1.value + abc);
const tpPrice1 = computed(() =>
	((+tp1.value + lote.value * buyPrice.value) / lote.value).toFixed(digits.value));
const tpPrice2 = computed(() =>
	((+tp2.value + lote.value * buyPrice.value) / lote.value).toFixed(digits.value));
const tpPrice3 = computed(() =>
	((+tp3.value + lote.value * buyPrice.value) / lote.value).toFixed(digits.value));
const tpPrice4 = computed(() =>
	((+tp4.value + lote.value * buyPrice.value) / lote.value).toFixed(digits.value));
const tpPrice5 = computed(() =>
	((+tp5.value + lote.value * buyPrice.value) / lote.value).toFixed(digits.value));

const slPrice1 = computed(
	() => (((sl1.value - lote.value * buyPrice.value) * -1) / lote.value
	).toFixed(digits.value));
const slPrice2 = computed(
	() => (((sl2.value - lote.value * buyPrice.value) * -1) / lote.value
	).toFixed(digits.value));
const slPrice3 = computed(
	() => (((sl3.value - lote.value * buyPrice.value) * -1) / lote.value
	).toFixed(digits.value));
const slPrice4 = computed(
	() => (((sl4.value - lote.value * buyPrice.value) * -1) / lote.value
	).toFixed(digits.value));
const slPrice5 = computed(
	() => (((sl5.value - lote.value * buyPrice.value) * -1) / lote.value
	).toFixed(digits.value));
function updateWidth(event, refName) {
	// Handle width adjustment on user input if additional logic is needed
}
</script>

<template>
	<div class="container">
		<div class="flex p-2 gap-5">
			<div class="border rounded-xl px-3 py-1 text-right">
				<div class="">
					<label for="deposit">Deposit:
						<input id="deposit" type="number" v-model="depo" step="10" required
							class="w-1/4 bg-gray-900 font-bold text-center">
						$
					</label><br>
					<label for="leverage">Leverage:
						<input id="leverage" type="number" v-model="leverage" step="5" required
							class="w-1/4 bg-gray-900 font-bold text-center">
						^
					</label><br>
					<label for="risk">Risk SL:
						<input id="risk" type="number" v-model="risk_sl" step="0.005" required
							class="w-1/4 bg-gray-900 font-bold text-center">
						%
					</label><br>
					<label for="risk_margin">Risk margin:
						<input id="risk_margin" type="number" v-model="risk_margin" step="0.5" required
							class="w-1/4 bg-gray-900 font-bold text-center">
						%
					</label><br>
					<label for="coefPrice">CoefPrice:
						<input id="coefPrice" type="number" v-model="coefPrice" step="0.05" required
							class="w-1/4 bg-gray-900 font-bold text-center">
						^
					</label><br>
				</div>
			</div>
			<div>
				<div class="px-7 border rounded-xl text-center">
					<label for="setPrice" class="text-yellow-400 font-bold appearance-none">setPrice:<br>
						<input id="setPrice" type="number" v-model="setPrice" step="0.005" required
							class="w-[8ch] bg-gray-900 font-bold text-yellow-400 text-center">
					</label>
				</div>
				<div class="border rounded-xl p-2 text-center">margin: {{ margin }}</div>
				<div class="border rounded-xl p-2 text-center">lote: {{ lote }}</div>
			</div>
		</div>
	</div>
	<div class="">
		<p class="text-center underline text-blue-600">*** Risk ***</p>
		<div class="flex justify-around text-blue-600">
			<div class="">1 %</div>
			<div class="">2 %</div>
			<div class="">3 %</div>
			<div class="">4 %</div>
			<div class="">5 %</div>
		</div>
		<div class="">
			<div class="flex justify-around text-red-600">
				<div class="">0.2 %</div>
				<div class="">0.4 %</div>
				<div class="">0.6 %</div>
				<div class="">0.8 %</div>
				<div class="">1 %</div>
			</div>
		</div>
	</div>

	<div class="text-green-600">
		<p class="text-center underline">*** TP ***</p>
		<div class="flex justify-around">
			<div class="">{{ tp1 }} $</div>
			<div class="">{{ tp2 }} $</div>
			<div class="">{{ tp3 }} $</div>
			<div class="">{{ tp4 }} $</div>
			<div class="">{{ tp5 }} $</div>
		</div>
		<div class="flex justify-around ">
			<div class="">{{ tpPrice1 }}</div>
			<div class="">{{ tpPrice2 }}</div>
			<div class="">{{ tpPrice3 }}</div>
			<div class="">{{ tpPrice4 }}</div>
			<div class="">{{ tpPrice5 }}</div>
		</div>
	</div>
	<div class="flex justify-around">
		<p class="bg-green-600 text-center">Buy ___ {{ buyPrice }} ___</p>
		<p class="bg-blue-600 text-center">Zero ___ {{ zeroPrice }} ___</p>
	</div>
	<div class="text-gray-600">
		<div class="flex justify-around">
			<div class="">{{ priceDiff1 }}</div>
			<div class="">{{ priceDiff2 }}</div>
			<div class="">{{ priceDiff3 }}</div>
			<div class="">{{ priceDiff4 }}</div>
			<div class="">{{ priceDiff5 }}</div>
		</div>
	</div>
	<div class="text-red-600">
		<p class="text-center underline">*** SL ***</p>
		<div class="flex justify-around">
			<div class="">{{ slPrice1 }}</div>
			<div class="">{{ slPrice2 }}</div>
			<div class="">{{ slPrice3 }}</div>
			<div class="">{{ slPrice4 }}</div>
			<div class="">{{ slPrice5 }}</div>
		</div>
		<div class="flex justify-around">
			<div class="">{{ sl1 }} $</div>
			<div class="">{{ sl2 }} $</div>
			<div class="">{{ sl3 }} $</div>
			<div class="">{{ sl4 }} $</div>
			<div class="">{{ sl5 }} $</div>
		</div>
	</div>
</template>
<style scoped></style>