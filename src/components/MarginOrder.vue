<script setup>
import { storeToRefs } from 'pinia';
import { useMarginOptionsStore } from "@/stores/marginOptions.js";
import { useMarginOrdersStore } from '@/stores/marginOrders.js';
import { useOrdersBlockStore } from '@/stores/ordersBlock.js';
const { buyOrderMath } = storeToRefs(useMarginOptionsStore());
const { removeOrder } = useOrdersBlockStore();
const { selectedSwitch } = storeToRefs(useMarginOrdersStore());
const { calculateBuyOrder, calculateSl, calculateTp,	infoAmount, infoSlPrice, infoTpPrice, } = useMarginOrdersStore();
const props = defineProps({
	block: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div v-if="block && block.orders" class="text-sm">
		<div v-for="(order, index) in block.orders" :key="order.id" class="mt-2 border-b border-gray-600">
			<!-- Order Input -->
			<div class="flex justify-between mt-1 items-center">
				<span>{{ index + 1 }}</span>
				<input id="buyPrice" type="number" v-model="order.buyPrice" placeholder="BuyPrice"
					class="w-[6ch] bg-gray-900 text-center" />
				<input id="amount" type="number" v-model="order.amount" placeholder="Amount"
					class="w-[6ch] bg-gray-900 text-center" />
				<span class="">{{ calculateBuyOrder(order) }}</span>
				<div class="text-gray-500 text-xs">
					<span>({{ infoAmount(order) }} - </span>
					<span>{{ buyOrderMath }})</span>
				</div>
				<button id="removeOrder" @click="removeOrder(block, order.id)"
					class="flex px-2 font-bold text-red-600 border border-red-600 items-center">x</button>
			</div>
			<div class="flex justify-between mt-1 mb-1 items-center">
				<!-- SL Switch -->
				<div class="flex items-center">
					<input id="sl" type="radio" name="switchGroup" v-model="order.selectedSwitch" value="sl" class="accent-red-600" />
					<span>SL</span>
				</div>
				<input id="slPrice" type="number" v-model="order.slPrice" placeholder="SLprice"
					class="w-[6ch] bg-gray-900 text-center" />
				<span>{{ calculateSl(order) }}</span>
				<div class="text-gray-500">
					<span class="text-xs">({{ infoSlPrice(order) }})</span>
				</div>
				<!-- TP Switch -->
				<div class="flex items-center">
					<input id="tp" type="radio" name="switchGroup" v-model="order.selectedSwitch" value="tp" class="accent-green-600" />
					<span>TP</span>
				</div>
				<input id="tpPrice" type="number" v-model="order.tpPrice" placeholder="TPprice"
					class="w-[6ch] bg-gray-900 text-center" />
				<span>{{ calculateTp(order) }}</span>
				<div class="text-gray-500">
					<span class="text-xs">({{ infoTpPrice(order) }})</span>
				</div>
			</div>
			<hr class="border-gray-600">
		</div>
	</div>
</template>