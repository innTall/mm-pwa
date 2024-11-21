<script setup>
import { useGridStore } from '@/stores/gridcost.js';
import { storeToRefs } from "pinia";
import { watchEffect } from 'vue';
const store = useGridStore();
const { gridCost } = useGridStore();
function updateWidth(event, refName) {
	// Handle width adjustment on user input if additional logic is needed
}
//watchEffect(() => {
//	console.log('Grid cost recalculated:', store.gridCost);
//});
</script>

<template>
	<div class="font-bold rounded-md px-2 text-blue-600">Grid Settings</div>
	<div class="flex justify-between px-2 py-1 text-center">
		<div>
			<label for="numOfOrders">Orders:
				<input id="numOfOrders" type="number" v-model="store.numOfOrder" step="1" min="1" required
					class="bg-gray-900 text-yellow-400 font-bold text-center"
					:style="{ width: `${Math.max(store.numOfOrder.toString().length, 1)}ch` }"
					@input="updateWidth($event, 'numOfOrder')" />
			</label>
		</div>
		<div>
			<label for="firstOrderCost">Order:
				<input id="firstOrderCost" type="number" v-model="store.firstOrderCost" step="0.1" required
					class="bg-gray-900 text-yellow-400 font-bold text-center appearance-none"
					:style="{ width: `${Math.max(store.firstOrderCost.toString().length, 1)}ch` }"
					@input="updateWidth($event, 'firstOrderCost')" />
			</label>
		</div>
		<div>
			<label for="coefNextOrderCost">Coef:
				<input id="coefNextOrderCost" type="number" v-model="store.coefNextOrderCost" step="0.1" required
					class="bg-gray-900 text-yellow-400 font-bold text-center appearance-none"
					:style="{ width: `${Math.max(store.coefNextOrderCost.toString().length, 1)}ch` }"
					@input="updateWidth($event, 'coefNextOrderCost')" />
			</label>
		</div>
		<div class="flex gap-3">
			<div class="font-bold">gridCost</div>
			<div class="text-center font-bold">{{ gridCost }}</div>
		</div>
	</div>
	<hr class="border-green-600">
</template>
<style scoped></style>