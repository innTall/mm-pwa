<script setup>
import { ref, computed } from 'vue';
import FooterBitget from '../components/FooterBitget.vue';
import { useMarginBitgetStore } from '@/stores/marginBitget.js';
import { storeToRefs } from 'pinia';
const { deposit, leverage, coefRisk, margin, tpCost, slCost, buyOrderMath, coefCost,
	takeProfit, stopLoss, activeBlocks, totalActiveTpAndSl, sortedSymbols } = storeToRefs(useMarginBitgetStore());
const { addBlock, removeBlock, addOrder, removeOrder, calculateBuyOrder, infoAmount, infoSlPrice,
	infoTpPrice, calculateSl, calculateTp, } = useMarginBitgetStore();

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
	<div class="flex flex-col h-screen">
		<!-- Combined Static Block Section (Static + Symbols) -->
		<div class="fixed w-full top-[12] z-10 px-2 bg-gray-900">
			<!-- Static Configuration Section -->
			<div class="flex justify-between text-sm">
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
					<div class="flex justify-between">
						<div class="">CoefCost, %:</div>
						<input id="coefCost" type="number" v-model="coefCost" step="1" min="1" required
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
				<div class="flex gap-2 text-sm mb-1">
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
		<!-- Dynamic Orders Blocks (Scrollable Section) -->
		<div class="overflow-y-auto flex-grow pt-24 pb-12">
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
		</div>
	</div>
	<footer class="fixed w-full h-12 left-0 bottom-0 z-10 bg-gray-900">
		<FooterBitget />
	</footer>
</template>
<style scoped></style>