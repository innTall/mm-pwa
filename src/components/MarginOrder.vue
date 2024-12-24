<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
//import { useMarginSettingsStore } from "@/stores/marginSettings.js";
import { useMarginOptionsStore } from "@/stores/marginOptions.js";
import { useMarginOrdersStore } from '@/stores/marginOrders.js';
//const { leverage } = storeToRefs(useMarginSettingsStore());
const { buyOrderMath } = storeToRefs(useMarginOptionsStore());
const { orders, buyPrice, amount, slPrice, tpPrice, selectedSwitch, calcBuyOrder,
	calcSl, calcTp, infoAmount, infoSlPrice, infoTpPrice,
} = storeToRefs(useMarginOrdersStore());
const { removeOrder } = useMarginOrdersStore();
/*
const buyFee = 0.02;
const sellFee = 0.055;
// Reactive array to store orders, initialized with a default order
const orders = ref([
	{
		buyPrice: null,
		amount: null,
		calcBuyOrder: 0,
		calcSl: 0,
		calcTp: 0,
		infoAmount: 0,
		infoSlPrice: 0,
		infoTpPrice: 0,
	},
]);

// Reactive inputs
const buyPrice = ref(null);
const amount = ref(null);
const slPrice = ref(null);
const tpPrice = ref(null);
const selectedSwitch = ref(null);

// Computed properties for calculations
const calcBuyOrder = computed(() => {
	return buyPrice.value && amount.value
		? (buyPrice.value * amount.value).toFixed(2)
		: 0;
});
const feeBuy = computed(() => {
	return calcBuyOrder.value * buyFee / 100;
});
const feeSL = computed(() => {
	return slPrice.value && amount.value
		? (slPrice.value * amount.value * sellFee / 100)
		: 0;
});
const feeTP = computed(() => {
	return tpPrice.value && amount.value
		? (tpPrice.value * amount.value * sellFee / 100)
		: 0;
});
const calcSl = computed(() => {
	return buyPrice.value && slPrice.value && amount.value
		? ((slPrice.value - buyPrice.value) * amount.value - feeBuy.value - feeSL.value).toFixed(2)
		: 0;
});
const calcTp = computed(() => {
	return buyPrice.value && tpPrice.value && amount.value
		? ((tpPrice.value - buyPrice.value) * amount.value - feeBuy.value - feeTP.value).toFixed(2)
		: 0;
});

// Helper functions for digit calculation
function calculateDigits(price) {
	if (price >= 10000) return 0;
	if (price >= 1000) return 1;
	if (price >= 100) return 2;
	if (price >= 10) return 2;
	if (price >= 1) return 3;
	if (price >= 0.1) return 4;
	return 5;
}
function calculateDigitsLote(digits) {
	if (digits === 0) return 4;
	if (digits === 1) return 3;
	if (digits === 2) return 2;
	if (digits === 3) return 1;
	if (digits >= 4) return 0;
}
// Derived digits for price and lot
const digits = computed(() => calculateDigits(buyPrice.value || 0));
const digitsLote = computed(() => calculateDigitsLote(digits.value));

// Info calculations
const infoAmount = computed(() => {
	return buyPrice.value && leverage.value && margin.value
		? +(leverage.value * margin.value / buyPrice.value).toFixed(digitsLote.value)
		: 0;
});

const infoSlPrice = computed(() => {
	return amount.value && slCost.value && buyPrice.value
		? +(((slCost.value - buyPrice.value * amount.value) * -1) / amount.value).toFixed(digits.value)
		: 0;
});

const infoTpPrice = computed(() => {
	return amount.value && tpCost.value && buyPrice.value
		? +((tpCost.value + buyPrice.value * amount.value) / amount.value).toFixed(digits.value)
		: 0;
});

// Functions to manage orders
function addOrder() {
	// Add an order to the orders array
	orders.value.push({
		buyPrice: buyPrice.value,
		amount: amount.value,
		calcBuyOrder: calcBuyOrder.value,
		calcSl: calcSl.value,
		calcTp: calcTp.value,
		infoAmount: infoAmount.value,
		infoSlPrice: infoSlPrice.value,
		infoTpPrice: infoTpPrice.value,
	});

	// Reset inputs
	buyPrice.value = null;
	amount.value = null;
	slPrice.value = null;
	tpPrice.value = null;
	selectedSwitch.value = null;
}

function removeOrder(index) {
	// Prevent removing the last remaining order
	if (orders.value.length > 1) {
		orders.value.splice(index, 1);
	}
}
	*/
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