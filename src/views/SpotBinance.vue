<script setup>
import { useSpotBinanceStore } from '../stores/spotBinance.js';
import FooterBinance from '../components/FooterBinance.vue';
import { storeToRefs } from 'pinia';

const { orderBlocks, deposit,	riskTrade, coefNextBuyOrder, } = storeToRefs(useSpotBinanceStore());
const { addOrderBlock, removeOrderBlock, addOrderToBlock, removeOrder,
	updateOrderValues, clearBuyPrice,	restoreDefaultBuyPrice, } = useSpotBinanceStore();

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
			<button @click="addOrderBlock"
				class="h-8 px-2 text-sm border border-green-600 font-bold text-green-600">
				ADD
			</button>
		</div>
		<hr class="border-green-600">
		<!-- Dynamic Orders Blocks -->
		<div v-for="(block, index) in orderBlocks" :key="block.nr" class="p-2 text-sm">
			<div class="flex justify-between items-center">
				<span>{{ block.nr }}</span>
				<input id="symbol" type="text" v-model="block.symbol" placeholder="Symbol"
					class="w-[8ch] bg-gray-900 border text-center border-green-600 text-green-400 uppercase" />
				<input id="start" type="date" v-model="block.start" class="w-[10ch] bg-gray-900 border text-center" />
				<input id="fin" type="date" v-model="block.fin" class="w-[10ch] bg-gray-900 border text-center" />
				<button id="removeBlock" @click="removeOrderBlock(index)"
					class="px-2 font-bold text-red-600 border border-red-600">
					X Block
				</button>
				<button id="addOrder" @click="addOrderToBlock(block)"
					class="px-2 border border-green-600 font-extrabold text-green-600">
					+
				</button>
			</div>
			<div>
				<div v-for="(order, orderIndex) in block.orders" :key="orderIndex" class="flex justify-between mb-1">
					<span>{{ orderIndex + 1 }}</span>
					<input id="buyPrice" type="number" v-model="order.buyPrice" placeholder="BuyPrice" min="0.01"
						class="w-[6ch] bg-gray-900 text-center text-yellow-400" @focus="clearBuyPrice(order)"
						@blur="restoreDefaultBuyPrice(order)" @change="updateOrderValues(order)" />
					<span>{{ order.amount }}</span>
					<span>{{ order.buyOrder }}</span>
					<input id="sellPrice" type="number" v-model="order.sellPrice" placeholder="SellPrice"
						class="w-[6ch] bg-gray-900 text-center text-yellow-400" @change="updateOrderValues(order)" />
					<span>{{ order.sellOrder }}</span>
					<span>{{ order.profit }}</span>
					<button @click="removeOrder(index, orderIndex)"
						class="px-2 font-bold text-red-600 border border-red-600">
						X
					</button>
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