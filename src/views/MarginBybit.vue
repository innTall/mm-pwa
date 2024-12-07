<script setup>
import { computed } from 'vue';
import FooterBybit from '../components/FooterBybit.vue';
import { useMarginBybitStore } from '@/stores/marginBybit.js';
import { storeToRefs } from 'pinia';
const { deposit, leverage, riskMargin, margin, tpCost, slCost, buyOrderMath, coefNextOrderCost,
	takeProfit, stopLoss, activeBlocks, totalActiveTpAndSl, sortedSymbols } = storeToRefs(useMarginBybitStore());
const { addBlock, removeBlock, addOrder, removeOrder, calculateBuyOrder, calculateAmountMath, calculateSlPriceMath,
	calculateTpPriceMath, calculateSl, calculateTp, } = useMarginBybitStore();

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
</script>

<template>
	<div class="">
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
				<div class="flex justify-between">
					<div class="">CoefCost, %:</div>
					<input id="coefCost" type="number" v-model="coefNextOrderCost" step="1" min="1" required
						class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-right" />
				</div>
			</div>
			<div class="">
				<div class="flex justify-between">
					<div class="">Margin:</div>
					<input id="coefRisk" type="number" v-model="riskMargin" step="0.01" min="0" required
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
		<div class="px-1">
			<div class="flex gap-2 text-sm">
				<div class="">Symbols:</div>
				<ul class="flex">
					<li v-for="symbol in sortedSymbols" :key="symbol" class="uppercase">
						{{ symbol }} .
					</li>
				</ul>
			</div>
			<hr class="border-green-600">
		</div>

		<!-- Dynamic Orders Blocks -->
		<div v-for="block in activeBlocks" :key="block.id" class="p-2 mt-1 text-sm">
			<div class="">
				<!-- Basic Block Data -->
				<div class="flex justify-between">
					<input id="symbol" type="text" v-model="block.symbol" placeholder="Symbol"
						class="w-[10ch] px-2 text-center font-bold bg-gray-900 border uppercase" />
					<input id="date" type="date" v-model="block.date" class="w-[10ch] bg-gray-900 border text-center" />
					<div class="">
						<span :class="getBlockTotalColor(block)">{{ block.totalActiveTpAndSl }}</span>
					</div>
					<button id="removeBlock" @click="removeBlock(block.id)"
						class="px-2 font-bold text-red-600 border border-red-600">X Block</button>
					<button id="addOrder" @click="addOrder(block)"
						class="px-2 border border-green-600 font-extrabold text-green-600">
						+
					</button>
				</div>
				<!-- Orders List -->
				<div v-for="order in block.orders" :key="order.id" class="">
					<div class="flex justify-between mt-1 items-center">
						<span>{{ order.id }}</span>
						<input id="buyPrice" type="number" v-model="order.buyPrice" placeholder="Buy Price"
							class="w-[6ch] bg-gray-900 text-center" />
						<input id="amount" type="number" v-model="order.amount" placeholder="Amount"
							class="w-[6ch] bg-gray-900 text-center" />
						<span class="">{{ calculateBuyOrder(order) }}</span>
						<div class="text-gray-500 text-xs">
							<span>({{ calculateAmountMath(order) }} - </span>
							<span>{{ buyOrderMath }})</span>
						</div>
						<button id="removeOrder" @click="removeOrder(block, order.id)"
							class="px-2 font-bold text-red-600 border border-red-600">X</button>
					</div>
					<div class="flex justify-between mt-1 mb-1 items-center">
						<!-- SL Switch -->
						<div class="flex items-center">
							<input id="sl" type="radio" :name="'switchGroup' + order.id" v-model="order.selectedSwitch" value="sl"
								class="accent-red-600" />
							<span :class="getColorClass(order, 'sl')">SL</span>
						</div>
						<input id="slPrice" type="number" v-model="order.slPrice" @input="order.sl = calculateSl(order)"
							placeholder="SLprice" class="w-[6ch] bg-gray-900 text-center" :class="getColorClass(order, 'sl')" />
						<span :class="getColorClass(order, 'sl')">{{ calculateSl(order) }}</span>
						<div class="text-gray-500">
							<span class="text-xs">({{ calculateSlPriceMath(order) }})</span>
						</div>
						<!-- TP Switch -->
						<div class="flex items-center">
							<input id="tp" type="radio" :name="'switchGroup' + order.id" v-model="order.selectedSwitch" value="tp"
								class="accent-green-600" />
							<span :class="getColorClass(order, 'tp')">TP</span>
						</div>
						<input id="tpPrice" type="number" v-model="order.tpPrice" @input="order.tp = calculateTp(order)"
							placeholder="TPprice" class="w-[6ch] bg-gray-900 text-center" :class="getColorClass(order, 'tp')" />
						<span :class="getColorClass(order, 'tp')">{{ calculateTp(order) }}</span>
						<div class="text-gray-500">
							<span class="text-xs">({{ calculateTpPriceMath(order) }})</span>
						</div>
					</div>
				</div>
			</div>
			<hr class="border-green-600">
		</div>
	</div>
	<footer class="fixed w-full h-12 left-0 bottom-0 z-10 bg-gray-900">
		<FooterBybit />
	</footer>
</template>
<style scoped></style>