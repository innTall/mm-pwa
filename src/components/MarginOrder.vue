<script setup>
import { storeToRefs } from 'pinia';
import { useMarginOptionsStore } from "@/stores/marginOptions.js";
import { useMarginOrdersStore } from '@/stores/marginOrders.js';
import { useOrdersBlockStore } from '@/stores/ordersBlock.js';
import { useModalRemoveStore } from "@/stores/modalRemove.js";
const { openDialog } = useModalRemoveStore();
const { buyOrderMath } = storeToRefs(useMarginOptionsStore());
const { removeOrder } = useOrdersBlockStore();
const { calculateBuyOrder, calculateSl, calculateTp, infoAmount, infoSlPrice, infoTpPrice, getColorClass } = useMarginOrdersStore();
const props = defineProps({
	block: {
		type: Object,
		required: true,
	},
});
const openRemoveOrderDialog = (block, orderId) => {
	openDialog("Delete this order?", () => {
		removeOrder(block, orderId);
	});
};
</script>

<template>
	<div v-if="block && block.orders" class="h-16 overflow-y-auto text-sm">
		<div v-for="(order, index) in block.orders" :key="order.id" class="">
			<!-- Order Input -->
			<div class="flex justify-between items-center py-2">
				<span>{{ index + 1 }}</span>
				<input :id="'buyPrice-' + order.id" type="number" v-model="order.buyPrice" placeholder="BuyPrice"
					class="w-[6ch] bg-gray-900 text-center" />
				<input :id="'amount-' + order.id" type="number" v-model="order.amount" placeholder="Amount"
					class="w-[6ch] bg-gray-900 text-center" />
				<span class="">{{ calculateBuyOrder(order) }}</span>
				<div class="text-gray-500 text-xs">
					<span>({{ infoAmount(order) }} - </span>
					<span>{{ buyOrderMath }})</span>
				</div>
				<button :id="'removeOrder-' + order.id" @click="openRemoveOrderDialog(block, order.id)"
					class="flex px-2 font-bold text-red-600 border border-red-600 items-center">x</button>
			</div>
			<div class="flex justify-between items-center pb-2 border-b">
				<!-- SL Switch -->
				<div class="flex items-center">
					<input :id="'sl-' + order.id" type="radio" name="switchGroup" v-model="order.selectedSwitch" value="sl"
						class="accent-red-600" />
					<span :class="getColorClass(order, 'sl')">SL</span>
				</div>
				<input :id="'slPrice-' + order.id" type="number" v-model="order.slPrice" placeholder="SLprice"
					class="w-[6ch] bg-gray-900 text-center" :class="getColorClass(order, 'sl')" />
				<span :class="getColorClass(order, 'sl')">{{ calculateSl(order) }}</span>
				<div class="text-gray-500">
					<span class="text-xs">({{ infoSlPrice(order) }})</span>
				</div>
				<!-- TP Switch -->
				<div class="flex items-center">
					<input :id="'tp-' + order.id" type="radio" name="switchGroup" v-model="order.selectedSwitch" value="tp"
						class="accent-green-600" />
					<span :class="getColorClass(order, 'tp')">TP</span>
				</div>
				<input :id="'tpPrice-' + order.id" type="number" v-model="order.tpPrice" placeholder="TPprice"
					class="w-[6ch] bg-gray-900 text-center" :class="getColorClass(order, 'tp')" />
				<span :class="getColorClass(order, 'tp')">{{ calculateTp(order) }}</span>
				<div class="text-gray-500">
					<span class="text-xs">({{ infoTpPrice(order) }})</span>
				</div>
			</div>
		</div>
	</div>
</template>