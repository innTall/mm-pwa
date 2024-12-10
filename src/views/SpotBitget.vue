<script setup>
import FooterBitget from '../components/FooterBitget.vue';
import { useSpotBitgetStore } from '@/stores/spotBitget.js';
import { storeToRefs } from 'pinia';

const { deposit, coefRisk, coefNextBuyOrder, firstBuyOrder, activeBlocks, showConfirmDialog,
	confirmMessage, } = storeToRefs(useSpotBitgetStore());
const { addBlock, addOrder, removeBlock, removeOrder, confirmAction, cancelAction, recalculateOrder,
	clearBuyPrice, clearSellPrice, } = useSpotBitgetStore();
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
					<input id="coefCost" type="number" v-model="coefNextBuyOrder" step="1" min="1" required
						class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
				</label>
			</div>
			<div>
				<label for="coefRisk">CoefRisk:
					<input id="coefRisk" type="number" v-model="coefRisk" step="1" min="1" required
						class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
				</label>
			</div>
			<div>First Order: {{ firstBuyOrder }}</div>
			<button id="addBlock" class="h-8 px-2 border border-green-600 font-bold text-green-600" @click="addBlock">ADD</button>
		</div>
		<hr class="border-green-600">

		<!-- Dynamic Orders Blocks -->
		<div v-for="block in activeBlocks" :key="block.id" class="p-2 text-sm">
			<div class="mb-2">
				<!-- Basic Block Data -->
				<div class="flex justify-between">
					<input :id="`symbol-${block.id}`" type="text" v-model="block.symbol" placeholder="Symbol"
						class="w-[8ch] bg-gray-900 border text-center border-green-600 text-green-400 uppercase" />
					<input :id="`start-${block.id}`" type="date" v-model="block.start"
						class="w-[10ch] bg-gray-900 border text-center" />
					<input :id="`end-${block.id}`" type="date" v-model="block.end"
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
						@input="recalculateOrder(order)" @focus="clearBuyPrice(order)" />
					<span>{{ order.amount }}</span>
					<span>{{ order.buyOrder }}</span>
					<input :id="`sellPrice-${block.id}-${order.id}`" type="number" v-model.number="order.sellPrice"
						placeholder="Sell Price" class="w-[6ch] bg-gray-900 text-center text-yellow-400"
						@input="recalculateOrder(order)" @focus="clearSellPrice(order)" />
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
					<span>{{ block.summary.avgBuyPrice }}</span>
				</div>
				<div class="">
					<span>Amount:</span><br>
					<span>{{ block.summary.totalAmount }}</span>
				</div>
				<div class="">
					<span>Sell:</span><br>
					<span>{{ block.summary.avgSellPrice }}</span>
				</div>
				<div class="">
					<span>TP:</span><br>
					<span>{{ block.summary.totalProfit }}</span>
				</div>
			</div>
			<hr class="border-green-600 mt-2">
		</div>
		<!-- Modal -->
		<div v-if="showConfirmDialog" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
			<div class="bg-gray-700 rounded-lg shadow-lg w-1/2 max-w-md p-2 text-center">
				<p class="text-sm text-white">{{ confirmMessage }}</p>
				<div class="mt-2 flex justify-center space-x-4">
					<button @click="confirmAction"
						class="bg-green-600 hover:bg-green-400 text-white px-4 py-2 rounded transition">
						Yes
					</button>
					<button @click="cancelAction" class="bg-red-600 hover:bg-red-400 text-white px-4 py-2 rounded transition">
						No
					</button>
				</div>
			</div>
		</div>
	</div>
	<footer class="fixed w-full h-12 left-0 bottom-0 z-10 bg-gray-900">
		<FooterBitget />
	</footer>
</template>
<style scoped></style>