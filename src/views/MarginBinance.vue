<script setup>
import { ref, computed } from "vue";

const fee = 0.001;
const deposit = ref(1700);
const coefOfRisk = ref(0.02);
const coefNextOrderCost = ref(1.2);
const firstOrderCost = computed(
	() => +(deposit.value * coefOfRisk.value).toFixed(2)
);
</script>

<template>
	<div class="">
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
						<input id="coefCost" type="number" v-model="coefNextOrderCost" step="1" min="1" required
							class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
					</label>
				</div>
				<div>
					<label for="coefRisk">CoefRisk:
						<input id="coefRisk" type="number" v-model="coefOfRisk" step="1" min="1" required
							class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
					</label>
				</div>
				<div>First Order: {{ firstOrderCost }}</div>
				<!-- button id="addBlock" class="border px-1 bg-gray-700" @click="addBlock">ADD</button -->
			</div>
			<hr class="border-green-600 mt-2">
		</div>
	</div>
</template>
<style scoped></style>