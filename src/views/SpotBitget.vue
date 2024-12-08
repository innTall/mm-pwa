<script setup>
import FooterBitget from '../components/FooterBitget.vue';
import { useSpotBitgetStore } from '@/stores/spotBitget.js';
import { storeToRefs } from 'pinia';

const { deposit, coefOfRisk, coefNextOrderCost, firstOrderCost, activeBlocks } = storeToRefs(useSpotBitgetStore());
const { addBlock, addOrder, removeBlock, removeOrder, clearBuyPrice,
	clearSellPrice, restoreDefaultBuyPrice, restoreDefaultSellPrice, recalculateOrder, } = useSpotBitgetStore();
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
			<button id="addBlock" class="px-2 border border-green-600 font-bold text-green-600" @click="addBlock">ADD</button>
		</div>
		<hr class="border-green-600 mt-2">

		<!-- Dynamic Orders Blocks -->
		<div v-for="block in activeBlocks" :key="block.id" class="p-2 mt-2 text-sm">
			<div class="mb-2">
				<!-- Basic Block Data -->
				<div class="flex justify-between">
					<input :id="`symbol-${block.id}`" type="text" v-model="block.symbol" placeholder="Symbol"
						class="w-[8ch] bg-gray-900 border text-center border-green-600 text-green-400 uppercase" />
					<input :id="`open-${block.id}`" type="date" v-model="block.open"
						class="w-[10ch] bg-gray-900 border text-center" />
					<input :id="`close-${block.id}`" type="date" v-model="block.close"
						class="w-[10ch] bg-gray-900 border text-center" />
					<button :id="`removeBlock-${block.id}`" @click="removeBlock(block.id)"
						class="px-2 font-bold text-red-600 border border-red-600">X Block</button>
					<button :id="`addOrder-${block.id}`" @click="addOrder(block)"
						class="px-2 border border-green-600 font-extrabold text-green-600">+</button>
				</div>
			</div>

			<!-- Orders List -->
			<div v-for="order in block.orders" :key="order.id" class="mb-1">
				<div class="flex justify-between">
					<span>{{ order.id }}</span>
					<input :id="`buyPrice-${block.id}-${order.id}`" type="number" v-model.number="order.buyPrice"
						placeholder="Buy Price" class="w-[6ch] bg-gray-900 text-center text-yellow-400"
						@input="recalculateOrder(order)" @focus="clearBuyPrice(order)" @blur="restoreDefaultBuyPrice(order)" />
					<span>{{ order.tokenAmount }}</span>
					<span>{{ order.buyOrder }}</span>
					<input :id="`sellPrice-${block.id}-${order.id}`" type="number" v-model.number="order.sellPrice"
						placeholder="Sell Price" class="w-[6ch] bg-gray-900 text-center text-yellow-400"
						@input="recalculateOrder(order)" @focus="clearSellPrice(order)" @blur="restoreDefaultSellPrice(order)" />
					<span>{{ order.sellOrder }}</span>
					<span>{{ order.profit }}</span>
					<button :id="`removeOrder-${block.id} -${order.id}`" @click="removeOrder(block.id, order.id)"
						class="px-2 border border-red-600 font-bold text-red-600">X</button>
				</div>
			</div>

			<!-- Summary -->
			<div class="flex justify-between mt-2 text-center">
				<div class="">
					<span>Sum, $:</span><br>
					<span>{{ block.summary.totalBuyOrders }}</span>
				</div>
				<div class="">
					<span>Buy:</span><br>
					<span>{{ block.summary.avgBuyPrice.toFixed(4) }}</span>
				</div>
				<div class="">
					<span>Amount:</span><br>
					<span>{{ block.summary.totalTokenAmount }}</span>
				</div>
				<div class="">
					<span>Sell:</span><br>
					<span>{{ block.summary.avgSellPrice.toFixed(4) }}</span>
				</div>
				<div class="">
					<span>TP:</span><br>
					<span>{{ block.summary.totalProfit }}</span>
				</div>
			</div>
			<hr class="border-green-600 mt-2">
		</div>
	</div>
	<footer class="fixed w-full h-12 left-0 bottom-0 z-10 bg-gray-900">
		<FooterBitget />
	</footer>
</template>
<style scoped></style>