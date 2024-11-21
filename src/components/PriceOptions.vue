<script setup>
import { computed } from 'vue';
import { storeToRefs } from "pinia";
import { useMinmaxStore } from '@/stores/minmax.js';
const { minPrice, maxPrice, gridSize, firstBuyLevel, buyLevelsCoef } = storeToRefs(useMinmaxStore());
const { getProfit } = useMinmaxStore();
// Computed properties to determine the highlight class
const minInputClass = computed(() =>
	minPrice.value > maxPrice.value ? 'bg-red-500' : 'bg-green-800'
);
const maxInputClass = computed(() =>
	minPrice.value > maxPrice.value ? 'bg-red-500' : 'bg-green-800'
);
function updateWidth(event, refName) {
	// Handle width adjustment on user input if additional logic is needed
}
</script>

<template>
	<div class="w-full p-2">
		<div class="flex justify-between">
			<label for="buyl">First Buy Level:
				<input id="buyl" type="number" v-model="firstBuyLevel" step="0.01" required
					class="w-1/4 bg-gray-900 text-yellow-400 font-bold"
					:style="{ width: `${Math.max(firstBuyLevel.toString().length, 1)}ch` }"
					@input="updateWidth($event, 'firstBuyLevel')" />%
			</label>
			<label for="levc">Buy Levels Coef:
				<input id="levc" type="number" v-model="buyLevelsCoef" step="0.01" required
					class="w-1/4 bg-gray-900 text-yellow-400 font-bold"
					:style="{ width: `${Math.max(buyLevelsCoef.toString().length, 1)}ch` }"
					@input="updateWidth($event, 'buyLevelCoef')" />%
			</label>
		</div>
		<div class="flex pl-2 pr-2 text-center flex-row text-sm justify-around gap-2">
			<div class="">
				<label name="min" class="">Min:
					<input id="min" type="number" name="min" v-model="minPrice" step="0.001" required
						:class="`w-20 bg-green-800 text-center border rounded-md ${ minInputClass }`">
				</label>
			</div>
			<div class="">
				<label name="max" class="">Max:
					<input id="max" type="number" name="max" v-model="maxPrice" step="0.001" required
						:class="`w-20 bg-green-800 text-center border rounded-md ${maxInputClass}`">
				</label>
			</div>
			<div class="flex gap-3">
				<div class="">TP,%:</div>
				<div :="getProfit()" type="number" class="font-bold">{{ gridSize }}</div>
			</div>
		</div>
	</div>
	<hr class="border-green-600">
</template>
<style scoped></style>