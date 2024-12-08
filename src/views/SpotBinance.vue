<script setup>
import { ref, computed, watch, reactive } from "vue";
import FooterBinance from '../components/FooterBinance.vue';

// Constants and reactive variables
const fee = 0.001;
const deposit = ref(468);
const riskTrade = ref(0.02);
const coefNextBuyOrder = ref(1.2);

const defaultBlock = () => ({
	nr: 1,
	symbol: '',
	start: null,
	fin: null,
	buyPrice: 1,
	sellPrice: null,
	orders: reactive([
		{
			buyPrice: 1,
			sellPrice: null,
			amount: null,
			buyOrder: null,
			sellOrder: null,
			profit: null,
		},
	]),
});

const orderBlocks = ref([defaultBlock()]);

// Helper Functions
const addOrderBlock = () => {
	orderBlocks.value.push({ ...defaultBlock(), nr: orderBlocks.value.length + 1 });
};

const watchOrderValues = (order) => {
	watch(
		() => [order.buyPrice], // Watch both buyPrice and sellPrice
		() => {
			updateOrderValues(order); // Recalculate whenever either changes
		},
		{ deep: true, immediate: true } // Run immediately on initialization
	);
};

const addOrderToBlock = (block) => {
	const previousOrder = block.orders[block.orders.length - 1]; // Get the last order in the block
	const newBuyOrder = previousOrder
		? (parseFloat(previousOrder.buyOrder) * coefNextBuyOrder.value).toFixed(2)
		: (deposit.value * riskTrade.value).toFixed(2); // Use initial 'First Order' value for the first order
	const newOrder = {
		buyPrice: 1,
		sellPrice: null,
		amount: null,
		buyOrder: newBuyOrder,
		sellOrder: null,
		profit: null,
	};
	watchOrderValues(newOrder);
	//block.orders.push(newOrder);
	block.orders = [...block.orders, newOrder];
};

const clearBuyPrice = (order) => {
	if (order.buyPrice === 1) order.buyPrice = null;
};

const restoreDefaultBuyPrice = (order) => {
	if (!order.buyPrice) order.buyPrice = 1;
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

const updateOrderValues = (order) => {
	if (!order.buyPrice) {
		order.amount = null;
		order.buyOrder = null;
		order.sellOrder = null;
		order.profit = null;
		return;
	}
	const digits = calculateDigits(order.buyPrice);
	const digitsLote = calculateDigitsLote(digits);
	const buyOrder = (deposit.value * riskTrade.value * (1 + fee)).toFixed(2);
	const amount = (buyOrder / order.buyPrice).toFixed(digitsLote);
	const profit = ((order.sellPrice - order.buyPrice) * amount).toFixed(2);
	const sellOrder = (amount * order.sellPrice * (1 - fee)).toFixed(2);
	// Update order values
	order.amount = amount;
	order.buyOrder = buyOrder;
	order.sellOrder = sellOrder;
	order.profit = profit;
};
// Set up watchers for existing orders
orderBlocks.value.forEach((block) =>
	block.orders.forEach((order) => watchOrderValues(order))
);

const removeOrderBlock = (index) => {
	orderBlocks.value.splice(index, 1);
	// Update numbering after removing
	orderBlocks.value.forEach((block, idx) => (block.nr = idx + 1));
};

const removeOrder = (blockIndex, orderIndex) => {
	const block = orderBlocks.value[blockIndex]; // Get the specific block
	if (block && block.orders.length > orderIndex) {
		block.orders.splice(orderIndex, 1); // Remove the order at the specified index
	}
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
					<input id="coefCost" type="number" v-model="coefNextBuyOrder" step="1" min="1" required
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
			<button @click="addOrderBlock" class="h-8 px-2 text-sm border border-green-600 font-bold text-green-600">ADD</button>
		</div>
		<hr class="border-green-600">
		<!-- Dynamic Orders Blocks -->
		<div v-for="(block, index) in orderBlocks" :key="block.nr" class="p-2 text-sm">
			<!-- Block Header -->
			<div class="flex justify-between items-center">
				<span>{{ block.nr }}</span>
				<input id="symbol" type="text" v-model="block.symbol" placeholder="Symbol"
					class="w-[8ch] bg-gray-900 border text-center border-green-600 text-green-400 uppercase" />
				<input id="start" type="date" v-model="block.start" class="w-[10ch] bg-gray-900 border text-center" />
				<input id="fin" type="date" v-model="block.fin" class="w-[10ch] bg-gray-900 border text-center" />
				<button id="removeBlock" @click="removeOrderBlock(index)"
					class="px-2 font-bold text-red-600 border border-red-600">X Block</button>
				<button id="addOrder" @click="addOrderToBlock(block)"
					class="px-2 border border-green-600 font-extrabold text-green-600">
					+
				</button>
			</div>
			<!--  Orders List -->
			<div class="">
				<div v-for="(order, orderIndex) in block.orders" :key="orderIndex" class="flex justify-between mb-1">
					<span>{{ orderIndex + 1 }}</span>
					<input id="buyPrice" type="number" v-model="order.buyPrice" placeholder="BuyPrice" min="0.01"
						class="w-[6ch] bg-gray-900 text-center text-yellow-400" @focus="clearBuyPrice(order)"
						@blur="restoreDefaultBuyPrice(order)" @input="updateOrderValues(order)" />
					<span>{{ order.amount }}</span>
					<span>{{ order.buyOrder }}</span>
					<input id="sellPrice" type="number" v-model="order.sellPrice" placeholder="SellPrice"
						class="w-[6ch] bg-gray-900 text-center text-yellow-400" @change="updateOrderValues(order)" />
					<span>{{ order.sellOrder }}</span>
					<span>{{ order.profit }}</span>
					<button @click="removeOrder(index, orderIndex)"
						class="px-2 font-bold text-red-600 border border-red-600">X</button>
				</div>
				<hr class="border-green-600">
			</div>
		</div>
	</div>
	<footer class="fixed w-full h-12 left-0 bottom-0 z-10 bg-gray-900">
		<FooterBinance />
	</footer>
</template>
<style scoped></style>