<script setup>
import { ref, watch, computed } from "vue";

const buyFee = 0.02;
const sellFee = 0.055;
const deposit = ref(236);
const leverage = ref(10);
const riskMargin = ref(5);
const coefNextOrderCost = ref(20);
const takeProfit = ref(5);
const stopLoss = ref(2);
const amount = ref(null);
const symbol = ref('');
const buyPrice = ref(null);
const tpPrice = ref(null);
const slPrice = ref(null);
const open = ref(null);
const close = ref(null);
const nr = ref(1);
const selectedSwitch = ref(null); // "tp" or "sl"

// Reactive margin
const margin = computed(() => (deposit.value * riskMargin.value / 100).toFixed(2));
const tpCost = computed(() => (deposit.value * takeProfit.value / 100).toFixed(2));
const slCost = computed(() => (deposit.value * stopLoss.value / 100).toFixed(2));
const buyOrderMath = computed(() => (leverage.value * margin.value).toFixed(2));
const buyOrder = computed(() => (buyPrice.value * amount.value).toFixed(2));

// Adjust `digits` based on `buyPrice`
const digits = computed(() => {
	const priceValue = buyPrice.value;
	if (priceValue >= 10000) return 1;
	if (priceValue >= 1000) return 2;
	if (priceValue >= 100) return 2;
	if (priceValue >= 10) return 3;
	if (priceValue >= 1) return 3;
	if (priceValue >= 0.1) return 4;
	return 5;
});

// `digits_lote` for lote precision
const digits_lote = computed(() => {
	const digitsPrice = digits.value;
	if (digitsPrice === 1) return 3;
	if (digitsPrice === 2) return 2;
	if (digitsPrice === 3) return 1;
	if (digitsPrice >= 4) return 0;
});

// Lote calculation
const amountMath = computed(() => {
	if (!buyPrice.value || buyPrice.value <= 0) return 0;
	return +((leverage.value * margin.value) / buyPrice.value).toFixed(digits_lote.value);
});

const slPriceMath = computed(() => {
	const buy = parseFloat(buyPrice.value);
	const amt = parseFloat(amount.value);
	const slCostVal = parseFloat(slCost.value);
	// Check if all necessary inputs are valid numbers
	if (!buy || !amt || amt <= 0) {
		return null; // Return `null` or any default value if inputs are invalid
	}
	// Perform the calculation safely
	return ((slCostVal - buy * amt) * -1 / amt).toFixed(digits.value);
});

const tpPriceMath = computed(() => {
	const buy = parseFloat(buyPrice.value);
	const amt = parseFloat(amount.value);
	const tpCostVal = parseFloat(tpCost.value);
	// Check if all necessary inputs are valid numbers
	if (!buy || !amt || amt <= 0) {
		return null; // Return `null` or any default value if inputs are invalid
	}
	// Perform the calculation safely
	return ((tpCostVal + buy * amt) / amt).toFixed(digits.value);
});

const feeBuy = computed(() => (buyOrder * buyFee / 100));
const feeTP = computed(() => (tpPrice.value * amount.value * sellFee / 100));
const feeSL = computed(() => (slPrice.value * amount.value * sellFee / 100));

const sl = computed(() => {
	const buy = parseFloat(buyPrice.value);
	const slP = parseFloat(slPrice.value);
	const amt = parseFloat(amount.value);
	const feeB = parseFloat(feeBuy.value || 0);
	const feeS = parseFloat(feeSL.value || 0);
	if (isNaN(buy) || isNaN(slP) || isNaN(amt)) {
		return null; // Return null or any default value if inputs are invalid
	}
	return ((buy - slP) * amt + feeB + feeS).toFixed(2);
});

const tp = computed(() => {
	const buy = parseFloat(buyPrice.value);
	const tpP = parseFloat(tpPrice.value);
	const amt = parseFloat(amount.value);
	const feeB = parseFloat(feeBuy.value || 0);
	const feeT = parseFloat(feeTP.value || 0);
	if (isNaN(buy) || isNaN(tpP) || isNaN(amt)) {
		return null; // Return null or any default value if inputs are invalid
	}
	return ((tpP - buy) * amt - feeB - feeT).toFixed(2);
});
</script>

<template>
	<div class="">
		<!-- Static Configuration Section -->
		<div class="flex justify-between text-left p-1 text-sm">
			<div class="">
				<div>
					<label for="deposit">Deposit, $:
						<input id="deposit" type="number" v-model="deposit" step="1" min="1" required
							class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-right" />
					</label>
				</div>
				<div>
					<label for="leverage">Leverage:
						<input id="leverage" type="number" v-model="leverage" step="1" min="1" required
							class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
					</label>
				</div>
				<div>
					<label for="coefCost">CoefCost, %:
						<input id="coefCost" type="number" v-model="coefNextOrderCost" step="1" min="1" required
							class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
					</label>
				</div>
			</div>
			<div class="">
				<div>
					<label for="stopLoss">RiskMargin:
						<input id="coefRisk" type="number" v-model="riskMargin" step="0.01" min="0" required
							class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
					</label>
					{{ margin }}
				</div>
				<div>
					<label for="takeProfit">TP:
						<input id="takeProfit" type="number" v-model="takeProfit" step="0.01" min="0" required
							class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
					</label>
					{{ tpCost }}
				</div>
				<div>
					<label for="stopLoss">SL:
						<input id="stopLoss" type="number" v-model="stopLoss" step="0.01" min="0" required
							class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
					</label>
					{{ slCost }}
				</div>
			</div>
			<div class="flex items-center bg-gray-700 border px-1">
				<button class="">Add<br />Block</button>
			</div>
		</div>
		<hr class="border-green-600 mt-1">

		<!-- Dynamic Orders Blocks -->
		<div class="p-2 mt-1 text-sm">
			<div class="">
				<!-- Basic Block Data -->
				<div class="flex justify-between">
					<input id="symbol" type="text" v-model="symbol" placeholder="Symbol"
						class="w-[8ch] bg-gray-900 border text-center border-green-600 text-green-400" />
					<input id="open" type="date" v-model="open" class="w-[10ch] bg-gray-900 border text-center" />
					<input id="close" type="date" v-model="close" class="w-[10ch] bg-gray-900 border text-center" />
					<button id="removeBlock" @click="removeBlock(id)" class="border bg-gray-700">Remove</button>
				</div>
				<!-- Orders List -->
				<div class="">
					<div class="flex justify-between mt-1">
						<span>{{ nr }}</span>
						<input id="buyPrice" type="number" v-model="buyPrice" placeholder="Buy Price"
							class="w-[6ch] bg-gray-900 text-center underline" />
						<input id="amount" type="number" v-model="amount" placeholder="Amount"
							class="w-[6ch] bg-gray-900 text-center underline" />
						<span class="">{{ buyOrder }}</span>
						<div class="text-gray-500 text-xs">
							<span>({{ amountMath }} - </span>
							<span>{{ buyOrderMath }})</span>
						</div>
						<button id="deleteOrder" @click="deleteOrder(block)" class="border px-2 bg-gray-700">X</button>
					</div>
					<div class="flex justify-between mt-1">
						<!-- SL Switch -->
						<div class="flex items-center">
							<input id="sl" type="radio" name="switchGroup" v-model="selectedSwitch" value="sl"
								class="accent-red-600" />
							<span :style="{ color: selectedSwitch === 'sl' ? 'red' : 'white' }">SL</span>
						</div>
						<input id="slPrice" type="number" v-model="slPrice" placeholder="SL Price"
							class="w-[6ch] bg-gray-900 text-center underline"
							:style="{ color: selectedSwitch === 'sl' ? 'red' : 'white' }" />
						<span :style="{ color: selectedSwitch === 'sl' ? 'red' : 'white' }">{{ sl }}</span>
						<div class="text-gray-500">
							<span class="text-xs">({{ slPriceMath }})</span>
						</div>
						<!-- TP Switch -->
						<div class="flex items-center">
							<input id="tp" type="radio" name="switchGroup" v-model="selectedSwitch" value="tp"
								class="accent-green-600" />
							<span :style="{ color: selectedSwitch === 'tp' ? 'green' : 'white' }">TP</span>
						</div>
						<input id="tpPrice" type="number" v-model="tpPrice" placeholder="TP Price"
							class="w-[6ch] bg-gray-900 text-center underline"
							:style="{ color: selectedSwitch === 'tp' ? 'green' : 'white' }" />
						<span :style="{ color: selectedSwitch === 'tp' ? 'green' : 'white' }">{{ tp }}</span>
						<div class="text-gray-500">
							<span class="text-xs">({{ tpPriceMath }})</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<hr class="border-green-600">
	</div>
</template>
<style scoped></style>