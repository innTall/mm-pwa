<script setup>
import { computed } from 'vue';
import { useMarginBinanceStore } from '@/stores/marginBinance.js';
import { storeToRefs } from 'pinia';
const { deposit, leverage, riskMargin, coefNextOrderCost, takeProfit, stopLoss, orders,
	amount, symbol, buyPrice, tpPrice, slPrice, open, close, nr, selectedSwitch,
	margin, tpCost, slCost, buyOrderMath, orderBlocks, } = storeToRefs(useMarginBinanceStore());
const { addBlock, removeBlock, calculateBuyOrder,
	calculateAmountMath, calculateSlPriceMath, calculateTpPriceMath,
	calculateSl, calculateTp, addOrder, removeOrder, calculateBuyOrderMath } = useMarginBinanceStore();
const toggleSwitch = (block) => {
	block.selectedSwitch = !block.selectedSwitch;
};
// Helper function to determine the color class for SL/TP
const getColorClass = (block, type) => {
	return block.selectedSwitch === type ? (type === "sl" ? "text-red-500" : "text-green-500") : "text-white";
};
console.log(orders);
</script>

<template>
	<div class="">
		<!-- Static Configuration Section -->
		<div class="flex justify-between text-left p-1 text-sm">
			<div class="container w-1/3">
				<div class="">
					<label for="deposit">Deposit, $:
						<input id="deposit" type="number" v-model="deposit" step="1" min="1" required
							class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-right" />
					</label>
				</div>
				<div class="">
					<label for="leverage">Leverage:
						<input id="leverage" type="number" v-model="leverage" step="1" min="1" required
							class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
					</label>
				</div>
				<div class="">
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
					{{ margin }} $
				</div>
				<div>
					<label for="takeProfit">TakeProfit:
						<input id="takeProfit" type="number" v-model="takeProfit" step="0.01" min="0" required
							class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
					</label>
					{{ tpCost }} $
				</div>
				<div>
					<label for="stopLoss">StopLoss:
						<input id="stopLoss" type="number" v-model="stopLoss" step="0.01" min="0" required
							class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
					</label>
					{{ slCost }} $
				</div>
			</div>
			<div class="flex items-center bg-gray-700 border px-1">
				<button @click="addBlock" class="">Add<br />Block</button>
			</div>
		</div>
		<hr class="border-green-600 mt-1">

		<!-- Dynamic Orders Blocks -->
		<div v-for="block in orderBlocks" :key="block.id" class="p-2 mt-1 text-sm">
			<div class="">
				<!-- Basic Block Data -->
				<div class="flex justify-between">
					<input id="symbol" type="text" v-model="block.symbol" placeholder="Symbol" class="w-[10ch] px-2 text-yellow-400 text-center font-bold bg-gray-900 border border-gray-700 outline-none 
             focus:bg-gray-800 focus:ring focus:ring-yellow-400 focus:border-yellow-400
             invalid:bg-red-900 valid:bg-gray-800 uppercase" />
					<input id="open" type="date" v-model="block.open" class="w-[10ch] bg-gray-900 border text-center" />
					<input id="close" type="date" v-model="block.close" class="w-[10ch] bg-gray-900 border text-center" />
					<button id="removeBlock" @click="removeBlock(block.id)" class="border bg-gray-700 px-2">X Block</button>
				</div>
				<!-- Orders List -->
				<div class="">
					<div class="flex justify-between mt-1">
						<span>{{ block.id }}</span>
						<input id="buyPrice" type="number" v-model="block.buyPrice" placeholder="Buy Price"
							class="w-[6ch] bg-gray-900 text-center" />
						<input id="amount" type="number" v-model="block.amount" placeholder="Amount"
							class="w-[6ch] bg-gray-900 text-center" />
						<span class="">{{ calculateBuyOrder(block) }}</span>
						<div class="text-gray-500 text-xs">
							<span>({{ calculateAmountMath(block) }} - </span>
							<span>{{ buyOrderMath }})</span>
						</div>
						<button id="removeOrder" @click="removeOrder(block.id)" class="border px-2 bg-gray-700">X Order</button>
					</div>
					<div class="flex justify-between mt-1 items-center">
						<!-- SL Switch -->
						<div class="flex items-center">
							<input id="sl" type="radio" :name="'switchGroup' + block.id" v-model="block.selectedSwitch" value="sl"
								class="accent-red-600" />
							<span :class="getColorClass(block, 'sl')">SL</span>
						</div>
						<input id="slPrice" type="number" v-model="block.slPrice" placeholder="SL Price"
							class="w-[6ch] bg-gray-900 text-center" :class="getColorClass(block, 'sl')" />
						<span :class="getColorClass(block, 'sl')">{{ calculateSl(block) }}</span>
						<div class="text-gray-500">
							<span class="text-xs">({{ calculateSlPriceMath(block) }})</span>
						</div>
						<!-- TP Switch -->
						<div class="flex items-center">
							<input id="tp" type="radio" :name="'switchGroup' + block.id" v-model="block.selectedSwitch" value="tp"
								class="accent-green-600" />
							<span :class="getColorClass(block, 'tp')">TP</span>
						</div>
						<input id="tpPrice" type="number" v-model="block.tpPrice" placeholder="TP Price"
							class="w-[6ch] bg-gray-900 text-center" :class="getColorClass(block, 'tp')" />
						<span :class="getColorClass(block, 'tp')">{{ calculateTp(block) }}</span>
						<div class="text-gray-500">
							<span class="text-xs">({{ calculateTpPriceMath(block) }})</span>
						</div>
						<div class="flex justify-end mb-2">
							<button @click="addOrder" class="px-2 bg-gray-700 text-white border rounded">
								Add
							</button>
						</div>
					</div>
				</div>
			</div>
			<hr class="border-green-600">
		</div>
	</div>
</template>
<style scoped></style>