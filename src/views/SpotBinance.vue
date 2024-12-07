<script setup>
import { ref, computed } from "vue";
import FooterBinance from '../components/FooterBinance.vue';

// Constants and reactive variables
const fee = 0.001;
const deposit = ref(468);
const riskTrade = ref(0.02);
const coefNextOrderCost = ref(1.2);

const defaultBlock = () => ({
	nr: 1,
	symbol: '',
	start: null,
	fin: null,
	firstBuyPrice: 1,
	firstSellPrice: null
});

const orderBlocks = ref([defaultBlock()]);

// Helper Functions
const addOrderBlock = () => {
	orderBlocks.value.push({ ...defaultBlock(), nr: orderBlocks.value.length + 1 });
};

const removeOrderBlock = (index) => {
	orderBlocks.value.splice(index, 1);
	// Update numbering after removing
	orderBlocks.value.forEach((block, idx) => (block.nr = idx + 1));
};

const clearFirstBuyPrice = (block) => {
	if (block.firstBuyPrice === 1) block.firstBuyPrice = null;
};

const restoreDefaultFirstBuyPrice = (block) => {
	if (!block.firstBuyPrice) block.firstBuyPrice = 1;
};

// Computed for individual blocks
const calculateDigits = (priceValue) => {
	if (priceValue >= 10000) return 1;
	if (priceValue >= 1000) return 2;
	if (priceValue >= 100) return 2;
	if (priceValue >= 10) return 3;
	if (priceValue >= 1) return 3;
	if (priceValue >= 0.1) return 4;
	return 5;
};

const calculateDigitsLote = (digitsPrice) => {
	if (digitsPrice === 1) return 3;
	if (digitsPrice === 2) return 2;
	if (digitsPrice === 3) return 1;
	if (digitsPrice >= 4) return 0;
};

const calculateValues = (block) => {
	const digits = calculateDigits(block.firstBuyPrice);
	const digitsLote = calculateDigitsLote(digits);
	const firstBuyOrderCost = (deposit.value * riskTrade.value).toFixed(2);
	const amount = (firstBuyOrderCost / block.firstBuyPrice).toFixed(digitsLote);
	const profit = ((block.firstSellPrice - block.firstBuyPrice) * amount).toFixed(2);
	const firstSellOrderCost = (amount * block.firstSellPrice).toFixed(2);

	return { firstBuyOrderCost, amount, profit, firstSellOrderCost };
};
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
			<div>First Order: {{ (deposit * riskTrade).toFixed(2) }}</div>
			<button @click="addOrderBlock" class="bg-green-600 text-white p-2 rounded">Add</button>
		</div>
		<hr class="border-green-600 mt-1">
		<!-- Dynamic Orders Blocks -->
		<div v-for="(block, index) in orderBlocks" :key="block.nr" class="p-2 py-2 space-y-2 text-sm">
			<!-- Basic Block Data -->
			<div class="flex justify-between items-center">
				<span>{{ block.nr }}</span>
				<input id="symbol" type="text" v-model="block.symbol" placeholder="Symbol"
					class="w-[8ch] bg-gray-900 border text-center border-green-600 text-green-400 uppercase" />
				<input id="start" type="date" v-model="block.start" class="w-[10ch] bg-gray-900 border text-center" />
				<input id="fin" type="date" v-model="block.fin" class="w-[10ch] bg-gray-900 border text-center" />
				<button @click="removeOrderBlock(index)" class="text-red-500">Remove</button>
			</div>
			<!--  Orders List -->
			<div class="flex justify-between">
				<span>{{ block.nr }}</span>
				<input id="buyPrice" type="number" v-model="block.firstBuyPrice" placeholder="BuyPrice" min="0.01"
					class="w-[6ch] bg-gray-900 text-center text-yellow-400" @focus="clearFirstBuyPrice(block)"
					@blur="restoreDefaultFirstBuyPrice(block)" />
				<span>{{ calculateValues(block).amount }}</span>
				<span>{{ calculateValues(block).firstBuyOrderCost }}</span>
				<input id="sellPrice" type="number" v-model="block.firstSellPrice" placeholder="SellPrice"
					class="w-[6ch] bg-gray-900 text-center text-yellow-400" />
				<span>{{ calculateValues(block).firstSellOrderCost }}</span>
				<span>{{ calculateValues(block).profit }}</span>
			</div>
		</div>
	</div>
	<footer class="fixed w-full h-12 left-0 bottom-0 z-10 bg-gray-900">
		<FooterBinance />
	</footer>
</template>
<style scoped></style>