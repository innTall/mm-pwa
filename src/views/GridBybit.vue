<script setup>
import { useGridBybitStore } from '@/stores/gridBybit.js';
import { storeToRefs } from 'pinia';

const { deposit, coefOfRisk, coefNextOrderCost, firstOrderCost, activeBlocks } = storeToRefs(useGridBybitStore());
const { addBlock, addOrder, removeBlock } = useGridBybitStore();
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
					<button :id="`removeBlock-${block.id}`" @click="removeBlock(block.id)"
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