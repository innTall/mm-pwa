<script setup>
import { ref, computed, reactive } from 'vue';

// *** Trade options ***
const fee = 0.001;
const deposit = ref(1700);
const coefOfRisk = ref(0.02);
const coefNextOrderCost = ref(1.2);
let nextBlockId = 1; // Global ID counter
const firstOrderCost = computed(() => +(deposit.value * coefOfRisk.value).toFixed(2));

// Array of blocks, separated into active and saved
const activeBlocks = ref([createNewBlock(1)]);

function generateUniqueId() {
	return nextBlockId++;
}

// Function to create a new block
function createNewBlock() {
	const id = generateUniqueId();
	const block = reactive({
		id,
		symbol: '',
		open: '',
		close: '',
		orders: [],
		isSaved: false,
		summary: computed(() => {
			const totalTokenAmount = block.orders.reduce((sum, order) => sum + order.tokenAmount, 0);
			const totalBuyOrder = block.orders.reduce((sum, order) => sum + order.buyOrder, 0);
			const totalSellOrder = block.orders.reduce((sum, order) => sum + order.sellOrder, 0);
			const totalProfit = block.orders.length > 0 ? block.orders[block.orders.length - 1].profit : 0; // Last profit
			return {
				avgBuyPrice: totalTokenAmount ? totalBuyOrder / totalTokenAmount : 0,
				avgSellPrice: totalTokenAmount ? totalSellOrder / totalTokenAmount : 0,
				totalProfit,
				totalBuyOrders: totalBuyOrder,
				totalTokenAmount, // Added total token amount here
			};
		}),
	});
	// Add the initial order
	const initialOrder = {
		id: 1,
		buyPrice: 1.2345,
		sellPrice: 1.456,
		tokenAmount: 0,
		buyOrder: firstOrderCost.value,
		sellOrder: 0,
		profit: 0,
	};
	recalculateOrder(initialOrder, null);
	block.orders.push(initialOrder);
	return block;
}
// Recalculate order details
function recalculateOrder(order, previousOrder) {
	if (previousOrder) {
		// Buy order calculation based on the previous order and coefficient
		order.buyOrder = +(previousOrder.buyOrder * coefNextOrderCost.value).toFixed(2);
	} else {
		// First order uses the computed firstOrderCost
		order.buyOrder = +(firstOrderCost.value).toFixed(2);
	}
	// Calculate tokenAmount based on buyOrder and buyPrice
	order.tokenAmount = +(order.buyOrder / order.buyPrice).toFixed(2);
	// Calculate sellOrder and profit
	order.sellOrder = +(order.sellPrice * order.tokenAmount * (1 - fee)).toFixed(2);
	order.profit = +(order.sellOrder - order.buyOrder).toFixed(2);
}

function addBlock() {
	// Create a fresh new block
	const newBlock = createNewBlock();
	// Add it to the active blocks list
	activeBlocks.value.unshift(newBlock);
}

// Add a new order within a block
function addOrder(block) {
	const lastOrder = block.orders[block.orders.length - 1];
	const nextBuyPrice = +(lastOrder.buyPrice - 0.1).toFixed(4); // Example logic for next buy price
	const newOrder = {
		id: block.orders.length + 1,
		buyPrice: nextBuyPrice,
		sellPrice: +(nextBuyPrice + 0.2).toFixed(4), // Example logic for next sell price
		tokenAmount: 0,
		buyOrder: 0,
		sellOrder: 0,
		profit: 0,
	};
	// Recalculate the new order based on the previous order
	recalculateOrder(newOrder, lastOrder);
	block.orders.push(newOrder);
}

// Remove a block
function removeBlock(blockId) {
	activeBlocks.value = activeBlocks.value.filter((block) => block.id !== blockId);
}
</script>

<template>
	<div>
		<!-- Static Permanent Block -->
		<div class="flex justify-between text-center p-1 text-sm">
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
				<label for="coefRisk">CoefRisk:
					<input id="coefRisk" type="number" v-model="coefOfRisk" step="1" min="1" required
						class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
				</label>
			</div>
			<div>First Order: {{ firstOrderCost }}</div>
			<button id="addBlock" class="border px-1 bg-gray-700" @click="addBlock">ADD</button>
		</div>
		<hr class="border-green-600 mt-2">

		<!-- Dynamic Orders Blocks -->
		<div v-for="block in activeBlocks" :key="block.id" class="p-2 mt-2">
			<div class="mb-2">
				<!-- Basic Block Data -->
				<div class="flex justify-between">
					<input :id="`symbol-${block.id}`" type="text" v-model="block.symbol" placeholder="Symbol"
						class="w-[8ch] bg-gray-900 border text-center border-green-600 text-green-400" />
					<input :id="`open-${block.id}`" type="date" v-model="block.open"
						class="w-[10ch] bg-gray-900 border text-center" />
					<input :id="`close-${block.id}`" type="date" v-model="block.close"
						class="w-[10ch] bg-gray-900 border text-center" />
					<button :id="`removeBlock-${block.id}`" @click="removeBlock(block.id, true)"
						class="border bg-gray-700">Remove</button>
				</div>
			</div>

			<!-- Orders List -->
			<div v-for="order in block.orders" :key="order.id" class="mb-1">
				<div class="flex justify-between">
					<span>{{ order.id }}</span>
					<input :id="`buyPrice-${block.id}-${order.id}`" type="number" v-model="order.buyPrice" placeholder="Buy Price"
						class="w-[6ch] bg-gray-900 text-center text-yellow-400" @input="recalculateOrder(order)" />
					<span>{{ order.tokenAmount }}</span>
					<span>{{ order.buyOrder }}</span>
					<input :id="`sellPrice-${block.id}-${order.id}`" type="number" v-model="order.sellPrice"
						placeholder="Sell Price" class="w-[6ch] bg-gray-900 text-center text-yellow-400"
						@input="recalculateOrder(order)" />
					<span>{{ order.sellOrder }}</span>
					<span>{{ order.profit }}</span>
					<button :id="`addOrder-${block.id}`" @click="addOrder(block)" class="border px-1 bg-gray-700">Add
						Order</button>
				</div>
			</div>

			<!-- Summary -->
			<div class="flex justify-between mt-2 text-center">
				<div class="">
					<span>Sum, $:</span><br>
					<span>{{ block.summary.totalBuyOrders.toFixed(2) }}</span>
				</div>
				<div class="">
					<span>Buy:</span><br>
					<span>{{ block.summary.avgBuyPrice.toFixed(4) }}</span>
				</div>
				<div class="">
					<span>Amount:</span><br>
					<span>{{ block.summary.totalTokenAmount.toFixed(2) }}</span>
				</div>
				<div class="">
					<span>Sell:</span><br>
					<span>{{ block.summary.avgSellPrice.toFixed(4) }}</span>
				</div>
				<div class="">
					<span>TP:</span><br>
					<span>{{ block.summary.totalProfit.toFixed(2) }}</span>
				</div>
			</div>
			<hr class="border-green-600 mt-2">
		</div>
	</div>
</template>
<style scoped></style>