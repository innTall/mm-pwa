<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useMarginOrdersStore } from "@/stores/marginOrders.js";
import { useOrdersBlockStore } from "@/stores/ordersBlock.js";
const appVersion = __APP_VERSION__;
const { calculateSl, calculateTp } = useMarginOrdersStore();
const { blocks } = storeToRefs(useOrdersBlockStore());
// Compute the total balance by summing up `totalActiveTpAndSl` values for all blocks
const totalBalance = computed(() =>
	blocks.value.reduce((total, block) => {
		const blockTotal = block.orders.reduce((blockSum, order) => {
			if (order.selectedSwitch === "tp" && calculateTp(order)) {
				blockSum += parseFloat(calculateTp(order)) || 0;
			} else if (order.selectedSwitch === "sl" && calculateSl(order)) {
				blockSum += parseFloat(calculateSl(order)) || 0;
			}
			return blockSum;
		}, 0);
		return total + blockTotal;
	}, 0)
);
// Determine the color based on the value of `totalBalance`
const getTotalBalanceColor = computed(() =>
	totalBalance.value > 0
		? "text-green-500"
		: totalBalance.value < 0
			? "text-red-500"
			: "text-white"
);
</script>

<template>
	<div class="flex justify-between pt-2 text-sm border-t border-green-600">
		<div class="text-green-600">v.{{ appVersion }}</div>
		<div class="flex gap-2">
			<!-- Total Balance -->
			<div class="">Balance:</div>
			<span :class="getTotalBalanceColor" class="">{{ totalBalance.toFixed(2) }}</span>
		</div>
	</div>
</template>
<style scoped></style>