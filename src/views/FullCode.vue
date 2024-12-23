<script setup>
import { ref, reactive, computed, watch } from 'vue';

//* ----- Constants -----
const buyFee = 0.02;
const sellFee = 0.055;
let nextBlockId = 1;

//* ----- Reactive State -----
const deposit = ref(null);
const leverage = ref(null);
const coefRisk = ref(null);
const takeProfit = ref(null);
const stopLoss = ref(null);
const buyPrice = ref(null);

const activeBlocks = ref([createNewBlock()]); // List of active blocks
const activeSymbols = ref([]); // Tracks active symbols

//* ----- Computed Properties -----
const margin = computed(() =>
	((deposit.value * coefRisk.value) / 100).toFixed(2)
);
const tpCost = computed(() =>
	((deposit.value * takeProfit.value) / 100).toFixed(2)
);
const slCost = computed(() =>
	((deposit.value * stopLoss.value) / 100).toFixed(2)
);
const buyOrderMath = computed(() =>
	(leverage.value * margin.value).toFixed(2)
);

//* ----- Calculate Total TP/SL Across all Active Blocks -----
const totalActiveTpAndSl = computed(() => {
	return activeBlocks.value
		.reduce((total, block) => {
			return (
				total +
				block.orders.reduce((orderTotal, order) => {
					if (order.selectedSwitch === "tp" && order.tp) {
						orderTotal += parseFloat(order.tp) || 0;
					} else if (order.selectedSwitch === "sl" && order.sl) {
						orderTotal += parseFloat(order.sl) || 0;
					}
					return orderTotal;
				}, 0)
			);
		}, 0)
		.toFixed(2);
});

//* ----- Alphabetically Sorted List of Active Symbols -----
const sortedSymbols = computed(() => {
	return [...activeSymbols.value].sort((a, b) => a.localeCompare(b));
});

//* ----- Helper Functions -----
function generateUniqueId() {
	return nextBlockId++;
}

//* ----- Updates the List of Active Symbols -----
function updateActiveSymbols() {
	activeSymbols.value = activeBlocks.value
		.filter((block) => block.symbol) // Only include blocks with a defined symbol
		.map((block) => block.symbol);
}

//* ----- Core Methods -----
function createNewBlock() {
	// Creates a new reactive block with default values
	const block = reactive({
		id: generateUniqueId(),
		symbol: "",
		date: "",
		orders: [],
		isSaved: false,
		totalActiveTpAndSl: computed(() => {
			// Calculate total TP/SL for the block
			return block.orders
				.reduce((total, order) => {
					if (order.selectedSwitch === "tp" && order.tp) {
						total += parseFloat(order.tp) || 0;
					} else if (order.selectedSwitch === "sl" && order.sl) {
						total += parseFloat(order.sl) || 0;
					}
					return total;
				}, 0)
				.toFixed(2);
		}),
	});
	// Add an initial order to the block
	const initialOrder = {
		id: 1,
		buyPrice: buyPrice.value,
		amount: null,
		slPrice: null,
		tpPrice: null,
		selectedSwitch: null,
	};
	block.orders.push(initialOrder);
	// Watch for symbol changes in the block
	watch(
		() => block.symbol,
		() => {
			updateActiveSymbols();
		}
	);
	return block;
}

//* ----- Adds a New Block and Updates the Symbols -----
function addBlock() {
	const newBlock = createNewBlock();
	activeBlocks.value.unshift(newBlock);
	updateActiveSymbols();
}

//* ----- Removes a Block by ID -----
function removeBlock(blockId) {
	activeBlocks.value = activeBlocks.value.filter(
		(block) => block.id !== blockId
	);
	updateActiveSymbols();
}

//* ----- Adds a new order to the specified block -----
function addOrder(block) {
	const newOrder = {
		id: block.orders.length + 1,
		buyPrice: buyPrice.value,
		amount: null,
		buyOrder: null,
		amountMath: null,
		slPrice: null,
		sl: null,
		slPriceMath: null,
		tpPrice: null,
		tp: null,
		tpPriceMath: null,
		selectedSwitch: "sl",
	};
	block.orders.unshift(newOrder);
	// Move block to the top of the list
	const index = activeBlocks.value.findIndex((b) => b.id === block.id);
	if (index !== -1) {
		const [movedBlock] = activeBlocks.value.splice(index, 1);
		activeBlocks.value.unshift(movedBlock);
	}
}

//* ----- Removes an Order by ID from the Specified Block -----
function removeOrder(block, orderId) {
	const index = block.orders.findIndex((order) => order.id === orderId);
	if (index !== -1) {
		block.orders.splice(index, 1);
	}
}

//* ----- Calculation Methods -----
function calculateBuyOrder(block) {
	if (!block.buyPrice || !block.amount) return 0;
	return (block.buyPrice * block.amount).toFixed(2);
}

function calculateSl(block) {
	const slPrice = parseFloat(block.slPrice);
	if (!slPrice || !block.buyPrice || !block.amount) return 0;
	const buyOrder = calculateBuyOrder(block);
	const feeBuy = (buyOrder * buyFee) / 100;
	const feeSL = (slPrice * block.amount * sellFee) / 100;
	return (
		(slPrice - block.buyPrice) * block.amount -
		feeBuy -
		feeSL
	).toFixed(2);
}

function calculateTp(block) {
	const tpPrice = parseFloat(block.tpPrice);
	if (!tpPrice || !block.buyPrice || !block.amount) return 0;
	const buyOrder = calculateBuyOrder(block);
	const feeBuy = (buyOrder * buyFee) / 100;
	const feeTP = (tpPrice * block.amount * sellFee) / 100;
	return (
		(tpPrice - block.buyPrice) * block.amount -
		feeBuy -
		feeTP
	).toFixed(2);
}

//* ----- Number Precision for Price Calculations -----
function calculateDigits(price) {
	if (price >= 10000) return 0;
	if (price >= 1000) return 1;
	if (price >= 100) return 2;
	if (price >= 10) return 2;
	if (price >= 1) return 3;
	if (price >= 0.1) return 4;
	return 5;
}

function calculateDigitsLote(digits) {
	if (digits === 0) return 4;
	if (digits === 1) return 3;
	if (digits === 2) return 2;
	if (digits === 3) return 1;
	if (digits >= 4) return 0;
}

//* ----- Helper Functions -----
const infoAmount = (block) => {
	if (!block.buyPrice || block.buyPrice <= 0) return 0;
	const digits = calculateDigits(block.buyPrice);
	const digitsLote = calculateDigitsLote(digits);
	const margin = (deposit.value * coefRisk.value) / 100;
	return +((leverage.value * margin) / block.buyPrice).toFixed(digitsLote);
};

const infoSlPrice = (block) => {
	if (!block.buyPrice || !block.amount || block.amount <= 0) return null;
	const digits = calculateDigits(block.buyPrice);
	const slCost = (deposit.value * stopLoss.value) / 100;
	return +(
		((slCost - block.buyPrice * block.amount) * -1) /
		block.amount
	).toFixed(digits);
};

const infoTpPrice = (block) => {
	if (!block.buyPrice || !block.amount || block.amount <= 0) return null;
	const digits = calculateDigits(block.buyPrice);
	const tpCost = (deposit.value * takeProfit.value) / 100;
	return +((tpCost + block.buyPrice * block.amount) / block.amount).toFixed(
		digits
	);
};

// Helper function to determine the color class for SL/TP
const getColorClass = (block, type) => {
	return block.selectedSwitch === type ? (type === "sl" ? "text-red-500" : "text-green-500") : "text-white";
};
// Helper function to determine color class
const totalActiveTpAndSlColor = computed(() => {
	return totalActiveTpAndSl.value > 0 ? "text-green-500" : totalActiveTpAndSl.value < 0 ? "text-red-500" : "text-white";
});
const getBlockTotalColor = (block) => {
	const value = block.totalActiveTpAndSl; // Assuming this is computed for each block
	return value > 0 ? "text-green-500" : value < 0 ? "text-red-500" : "text-white";
};
// Create alert of remove block or order
const showConfirmDialog = ref(false);
const confirmMessage = ref("");
let confirmCallback = null;
const openRemoveBlockDialog = (blockId) => {
	confirmMessage.value = "Delete this block?";
	confirmCallback = () => removeBlock(blockId);
	showConfirmDialog.value = true;
};
const openRemoveOrderDialog = (block, orderId) => {
	confirmMessage.value = "Delete this order?";
	confirmCallback = () => removeOrder(block, orderId);
	showConfirmDialog.value = true;
};
const confirmAction = () => {
	if (confirmCallback) confirmCallback();
	showConfirmDialog.value = false;
};
const cancelAction = () => {
	showConfirmDialog.value = false;
};
</script>

<template>
	<div class="">
		<!-- Combined Static Block Section (Static + Symbols) -->
		<div class="w-full px-2 bg-gray-900">
			<!-- Static Configuration Section -->
			<div class="flex justify-between p-1 text-sm">
				<div class="">
					<div class="flex justify-between">
						<div class="">Deposit, $:</div>
						<input id="deposit" type="number" v-model="deposit" step="1" min="1" required
							class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-right" />
					</div>
					<div class="flex justify-between">
						<div class="">Leverage:</div>
						<input id="leverage" type="number" v-model="leverage" step="1" min="1" required
							class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-right" />
					</div>
				</div>
				<div class="">
					<div class="flex justify-between">
						<div class="">Margin:</div>
						<input id="coefRisk" type="number" v-model="coefRisk" step="0.01" min="0" required
							class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
					</div>
					<div class="flex justify-between">
						<div class="">TP:</div>
						<input id="takeProfit" type="number" v-model="takeProfit" step="0.01" min="0" required
							class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
					</div>
					<div class="flex justify-between">
						<div class="">SL:</div>
						<input id="stopLoss" type="number" v-model="stopLoss" step="0.01" min="0" required
							class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
					</div>
				</div>
				<div class="">
					<div class="text-right">{{ margin }} $</div>
					<div class="text-right">{{ tpCost }} $</div>
					<div class="text-right">{{ slCost }} $</div>
				</div>
				<div class="text-center">
					<button @click="addBlock" class="px-2 border border-green-600 font-bold text-green-600">ADD</button>
					<!-- Total sum of all active 'sl' and 'tp' values -->
					<div class="">TP</div>
					<div :class="totalActiveTpAndSlColor">{{ totalActiveTpAndSl }}</div>
				</div>
			</div>
			<hr class="border-green-600 mt-1">
			<!-- Block Symbols Section -->
			<div class="">
				<div class="h-6 flex gap-2 text-sm items-center">
					<div class="">Symbols:</div>
					<ul class="flex">
						<li v-for="symbol in sortedSymbols" :key="symbol" class="uppercase">
							{{ symbol }} .
						</li>
					</ul>
				</div>
				<hr class="border-green-600">
			</div>
		</div>
		<!-- Dynamic Orders Blocks -->
		<div class="w-full">
			<div v-for="block in activeBlocks" :key="block.id" class="px-2 mt-2 text-sm">
				<div class="">
					<!-- Basic Block Data -->
					<div class="flex justify-between">
						<input :id="'symbol-' + block.id" type="text" v-model="block.symbol" placeholder="Symbol"
							class="w-[10ch] px-2 text-center font-bold bg-gray-900 border uppercase" />
						<input :id="'date-' + block.id" type="date" v-model="block.date"
							class="w-[10ch] bg-gray-900 border text-center" />
						<div class="">
							<span :class="getBlockTotalColor(block)">{{ block.totalActiveTpAndSl }}</span>
						</div>
						<button :id="'remove-block-' + block.id" @click="openRemoveBlockDialog(block.id)"
							class="px-2 font-bold text-red-600 border border-red-600">X Block</button>
						<button :id="'add-order-' + block.id" @click="addOrder(block)"
							class="px-2 border border-green-600 font-extrabold text-green-600">
							+
						</button>
						<!-- Modal -->
						<div v-if="showConfirmDialog"
							class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
							<div class="bg-gray-700 rounded-lg shadow-lg w-1/2 max-w-md p-2 text-center">
								<p class="text-sm text-white">{{ confirmMessage }}</p>
								<div class="mt-2 flex justify-center space-x-4">
									<button @click="confirmAction"
										class="bg-green-600 hover:bg-green-400 text-white px-4 py-2 rounded transition">
										Yes
									</button>
									<button @click="cancelAction"
										class="bg-red-600 hover:bg-red-400 text-white px-4 py-2 rounded transition">
										No
									</button>
								</div>
							</div>
						</div>
					</div>
					<hr class="border-gray-600 mt-2 mb-1">
					<!-- Orders List -->
					<div class="max-h-14 overflow-y-auto px-2">
						<div v-for="order in block.orders" :key="order.id" class="">
							<div class="flex justify-between mt-1 items-center">
								<span>{{ order.id }}</span>
								<input :id="'buyPrice-' + block.id + '-' + order.id" type="number" v-model="order.buyPrice"
									placeholder="Buy Price" class="w-[6ch] bg-gray-900 text-center" />
								<input :id="'amount-' + block.id + '-' + order.id" type="number" v-model="order.amount"
									placeholder="Amount" class="w-[6ch] bg-gray-900 text-center" />
								<span class="">{{ calculateBuyOrder(order) }}</span>
								<div class="text-gray-500 text-xs">
									<span>({{ infoAmount(order) }} - </span>
									<span>{{ buyOrderMath }})</span>
								</div>
								<button :id="'removeOrder-' + block.id + '-' + order.id" @click="openRemoveOrderDialog(block, order.id)"
									class="px-2 font-bold text-red-600 border border-red-600">X</button>
							</div>
							<div class="flex justify-between mt-1 mb-1 items-center">
								<!-- SL Switch -->
								<div class="flex items-center">
									<input :id="'sl-' + block.id + '-' + order.id" type="radio" :name="'switchGroup' + order.id"
										v-model="order.selectedSwitch" value="sl" class="accent-red-600" />
									<span :class="getColorClass(order, 'sl')">SL</span>
								</div>
								<input :id="'slPrice-' + block.id + '-' + order.id" type="number" v-model="order.slPrice"
									@input="order.sl = calculateSl(order)" placeholder="SLprice" class="w-[6ch] bg-gray-900 text-center"
									:class="getColorClass(order, 'sl')" />
								<span :class="getColorClass(order, 'sl')">{{ calculateSl(order) }}</span>
								<div class="text-gray-500">
									<span class="text-xs">({{ infoSlPrice(order) }})</span>
								</div>
								<!-- TP Switch -->
								<div class="flex items-center">
									<input :id="'tp-' + block.id + '-' + order.id" type="radio" :name="'switchGroup' + order.id"
										v-model="order.selectedSwitch" value="tp" class="accent-green-600" />
									<span :class="getColorClass(order, 'tp')">TP</span>
								</div>
								<input :id="'tpPrice-' + block.id + '-' + order.id" type="number" v-model="order.tpPrice"
									@input="order.tp = calculateTp(order)" placeholder="TPprice" class="w-[6ch] bg-gray-900 text-center"
									:class="getColorClass(order, 'tp')" />
								<span :class="getColorClass(order, 'tp')">{{ calculateTp(order) }}</span>
								<div class="text-gray-500">
									<span class="text-xs">({{ infoTpPrice(order) }})</span>
								</div>
							</div>
							<hr class="border-gray-600">
						</div>
						<hr class="border-green-600">
					</div>
				</div>
				<!-- Block for Chart -->
				<div class="border bg-gray-700 mt-2 text-center">--- CHART ---</div>
			</div>
		</div>
	</div>
</template>
<style scoped></style>