<script setup>
import { ref, computed } from "vue";
import FooterBinance from '../components/FooterBinance.vue';

// Constants and reactive variables
const fee = 0.001;
const deposit = ref(468);
const riskTrade = ref(0.02);
const coefNextOrderCost = ref(1.2);
const symbol = ref('');
const start = ref(null);
const fin = ref(null);
const firstSellPrice = ref(null);
const nr = ref(1);

const firstBuyPrice = ref(1); // Set a reasonable default value
const clearFirstBuyPrice = () => {
	if (firstBuyPrice.value === 1) { // Check if it's still the default value
		firstBuyPrice.value = null; // Clear the field
	}
};
const restoreDefaultFirstBuyPrice = () => {
	if (!firstBuyPrice.value) { // If the field is empty
		firstBuyPrice.value = 1; // Restore the default value
	}
};
const digits = computed(() => {
	const priceValue = firstBuyPrice.value;
	if (priceValue >= 10000) return 1;
	if (priceValue >= 1000) return 2;
	if (priceValue >= 100) return 2;
	if (priceValue >= 10) return 3;
	if (priceValue >= 1) return 3;
	if (priceValue >= 0.1) return 4;
	return 5;
});
const digits_lote = computed(() => {
	const digitsPrice = digits.value;
	if (digitsPrice === 1) return 3;
	if (digitsPrice === 2) return 2;
	if (digitsPrice === 3) return 1;
	if (digitsPrice >= 4) return 0;
});

const firstBuyOrderCost = computed(() => (deposit.value * riskTrade.value).toFixed(2));
const amount = computed(() => (firstBuyOrderCost.value / firstBuyPrice.value).toFixed(digits_lote.value));
const profit = computed(() => ((firstSellPrice.value - firstBuyPrice.value) * amount.value).toFixed(2));
const firstSellOrderCost = computed(() => (amount.value * firstSellPrice.value).toFixed(2));
</script>

<template>
	<div>
		<!-- Static Permanent Block -->
		<div class="flex justify-between text-center px-1 text-sm">
			<div>
				<label for="deposit">Deposit:
					<input id="deposit" type="number" v-model="deposit" step="1" min="1" required
						class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
				</label>
			</div>
			<div>
				<label for="coefCost">CoefCost:
					<input id="coefCost" type="number" v-model="coefNextOrderCost" step="1" min="1" required
						class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
				</label>
			</div>
			<div>
				<label for="coefRisk">RiskTrade:
					<input id="coefRisk" type="number" v-model="riskTrade" step="1" min="1" required
						class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
				</label>
			</div>
			<div>First Order: {{ firstBuyOrderCost }}</div>
		</div>
		<hr class="border-green-600 mt-1">
		<!-- Dynamic Orders Blocks -->
		<div class="p-2 py-2 space-y-2 text-sm">
			<!-- Basic Block Data -->
			<div class="flex justify-between items-center">
				<span>{{ nr }}</span>
				<input id="symbol" type="text" v-model="symbol" placeholder="Symbol"
					class="w-[8ch] bg-gray-900 border text-center border-green-600 text-green-400 uppercase" />
				<input id="start" type="date" v-model="start" class="w-[10ch] bg-gray-900 border text-center" />
				<input id="fin" type="date" v-model="fin" class="w-[10ch] bg-gray-900 border text-center" />
			</div>
			<div class="flex justify-between">
				<span>{{ nr }}</span>
				<input id="buyPrice" type="number" v-model="firstBuyPrice" placeholder="BuyPrice" min="0.01"
					class="w-[6ch] bg-gray-900 text-center text-yellow-400" @focus="clearFirstBuyPrice"
					@blur="restoreDefaultFirstBuyPrice" />
				<span>{{ amount }}</span>
				<span>{{ firstBuyOrderCost }}</span>
				<input id="sellPrice" type="number" v-model="firstSellPrice" placeholder="SellPrice"
					class="w-[6ch] bg-gray-900 text-center text-yellow-400" />
				<span>{{ firstSellOrderCost }}</span>
				<span>{{ profit }}</span>
			</div>
		</div>
	</div>
	<footer class="fixed w-full h-12 left-0 bottom-0 z-10 bg-gray-900">
		<FooterBinance />
	</footer>
</template>
<style scoped></style>