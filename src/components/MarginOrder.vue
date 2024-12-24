<script setup>
import { storeToRefs } from 'pinia';
import { useMarginOptionsStore } from "@/stores/marginOptions.js";
import { useMarginOrdersStore } from '@/stores/marginOrders.js';
const { buyOrderMath } = storeToRefs(useMarginOptionsStore());
const { orders, buyPrice, amount, slPrice, tpPrice, selectedSwitch, calcBuyOrder,
	calcSl, calcTp, infoAmount, infoSlPrice, infoTpPrice,
} = storeToRefs(useMarginOrdersStore());
const { removeOrder } = useMarginOrdersStore();
</script>

<template>
	<div class="text-sm">
		<div v-for="(order, index) in orders" :key="index" class="mt-2 border-b border-gray-600">
			<!-- Order Input -->
			<div class="flex justify-between mt-1 items-center">
				<span>{{ index + 1 }}</span>
				<input id="buyPrice" type="number" v-model="buyPrice" placeholder="BuyPrice"
					class="w-[6ch] bg-gray-900 text-center" />
				<input id="amount" type="number" v-model="amount" placeholder="Amount"
					class="w-[6ch] bg-gray-900 text-center" />
				<span class="">{{ calcBuyOrder }}</span>
				<div class="text-gray-500 text-xs">
					<span>({{ infoAmount }} - </span>
					<span>{{ buyOrderMath }})</span>
				</div>
				<button id="removeOrder" @click="removeOrder(index)"
					class="flex px-2 font-bold text-red-600 border border-red-600 items-center">x</button>
			</div>
			<div class="flex justify-between mt-1 mb-1 items-center">
				<!-- SL Switch -->
				<div class="flex items-center">
					<input id="sl" type="radio" name="switchGroup" v-model="selectedSwitch" value="sl" class="accent-red-600" />
					<span>SL</span>
				</div>
				<input id="slPrice" type="number" v-model="slPrice" placeholder="SLprice"
					class="w-[6ch] bg-gray-900 text-center" />
				<span>{{ calcSl }}</span>
				<div class="text-gray-500">
					<span class="text-xs">({{ infoSlPrice }})</span>
				</div>
				<!-- TP Switch -->
				<div class="flex items-center">
					<input id="tp" type="radio" name="switchGroup" v-model="selectedSwitch" value="tp" class="accent-green-600" />
					<span>TP</span>
				</div>
				<input id="tpPrice" type="number" v-model="tpPrice" placeholder="TPprice"
					class="w-[6ch] bg-gray-900 text-center" />
				<span>{{ calcTp }}</span>
				<div class="text-gray-500">
					<span class="text-xs">({{ infoTpPrice }})</span>
				</div>
			</div>
			<hr class="border-gray-600">
		</div>
	</div>
</template>