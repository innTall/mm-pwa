<script setup>
import { ref, computed } from 'vue';
const numOfOrder = ref(1);
const coefNextOrderCost = ref(1.2);
const firstOrderCost = ref(10.2);
// Computed property to calculate gridCost dynamically
const gridCost = computed(() => {
	let cost = firstOrderCost.value;
	for (let i = 2; i <= numOfOrder.value; i++) {
		cost += firstOrderCost.value * (coefNextOrderCost.value ** (i - 1)); // Increment cost for each order
	}
	return cost.toFixed(2); // Return cost as a string with 2 decimal places
});
function updateWidth(event, refName) {
	// Handle width adjustment on user input if additional logic is needed
}
</script>

<template>
	<div class="flex justify-between p-2 text-center">
		<div>
			<label for="numOfOrders">Orders:<br>
				<input id="numOfOrders" type="number" v-model="numOfOrder" step="1" min="1" required
					class="bg-gray-900 font-bold text-center" :style="{ width: `${Math.max(numOfOrder.toString().length, 1)}ch` }"
					@input="updateWidth($event, 'numOfOrder')" />
			</label>
		</div>
		<div>
			<label for="firstOrderCost">Order:<br>
				<input id="firstOrderCost" type="number" v-model="firstOrderCost" step="0.1" required
					class="bg-gray-900 font-bold text-center appearance-none"
					:style="{ width: `${Math.max(firstOrderCost.toString().length, 1)}ch` }"
					@input="updateWidth($event, 'firstOrderCost')" />
			</label>
		</div>
		<div>
			<label for="coefNextOrderCost">Coef:<br>
				<input id="coefNextOrderCost" type="number" v-model="coefNextOrderCost" step="0.1" required
					class="bg-gray-900 font-bold text-center appearance-none"
					:style="{ width: `${Math.max(coefNextOrderCost.toString().length, 1)}ch` }"
					@input="updateWidth($event, 'coefNextOrderCost')" />
			</label>
		</div>
		<div class="">
			<div class="font-bold">gridCost</div>
			<div class="text-center font-bold">{{ gridCost }}</div>
		</div>
	</div>
</template>
<style scoped></style>