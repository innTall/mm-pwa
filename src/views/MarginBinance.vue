<script setup>
import { ref } from 'vue';
import FooterBinance from '../components/FooterBinance.vue';
import SettingsBinance from '../components/SettingsBinance.vue';
import { useMarginBinanceStore } from '@/stores/marginBinance.js';
import { storeToRefs } from 'pinia';
const { deposit, leverage, margin, tpCost, slCost, buyOrderMath,
	takeProfit, stopLoss, activeBlocks, sortedSymbols } = storeToRefs(useMarginBinanceStore());
const { addBlock, removeBlock, addOrder, removeOrder, calculateBuyOrder, infoAmount, infoSlPrice,
	infoTpPrice, calculateSl, calculateTp, } = useMarginBinanceStore();

// Helper function to determine the color class for SL/TP
const getColorClass = (block, type) => {
	return block.selectedSwitch === type ? (type === "sl" ? "text-red-500" : "text-green-500") : "text-white";
};

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
		<div class="fixed w-full h-16 top-[10] z-10 px-2 bg-gray-900">
			<!-- Static Configuration Section -->
			<div class="flex justify-between gap-1 text-center">
				<div class="px-2 py-1 border rounded-lg items-center hover:bg-gray-700">
					<SettingsBinance />
				</div>
				<div class="">
					<div class="text-xs">Depo</div>
					<div class="text-sm">{{ deposit }}$</div>
				</div>
				<div class="">
					<div class="text-xs">Lever</div>
					<div class="text-sm">{{ leverage }}</div>
				</div>
				<div class="">
					<div class="text-xs">Margin</div>
					<div class="text-sm">{{ margin }}$</div>
				</div>
				<div class="">
					<div class="text-xs">TP-{{ takeProfit }}%</div>
					<div class="text-sm">{{ tpCost }}$</div>
				</div>
				<div class="">
					<div class="text-xs">SL-{{ stopLoss }}%</div>
					<div class="text-sm">{{ slCost }}$</div>
				</div>
				<button @click="addBlock" class="px-2 py-1 text-sm border rounded-lg hover:bg-gray-700">Add</button>
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
		<!-- Dynamic Orders Blocks (Scrollable Section) -->
		<div class="fixed w-full pt-16 pb-12">
			<div v-for=" block in activeBlocks" :key="block.id" class="px-2 mt-2 text-sm">
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
				<!-- Field for Chart -->
				<div class="h-64 w-full border bg-gray-700 mt-2 text-center">--- CHART ---</div>
			</div>
		</div>
	</div>
	<footer class="fixed w-full h-12 left-0 bottom-0 z-10 bg-gray-900">
		<FooterBinance />
	</footer>
</template>
<style scoped></style>
