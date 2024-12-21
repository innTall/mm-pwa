<script setup>
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useMarginBybitStore } from '@/stores/marginBybit.js';
const {
	deposit, leverage, coefRisk, takeProfit, stopLoss, offlineMode
} = storeToRefs(useMarginBybitStore());
const OpenSettings = ref(false);
</script>
<template>
	<div class="container">
		<button @click="OpenSettings = true" class="text-sm">Set</button>
		<Teleport to="body">
			<div v-show="OpenSettings"
				class="container fixed top-20 left-10 bg-gray-800 text-white z-10 border rounded-3xl p-2 w-1/2">
				<form @submit="submitForm">
					<div class="text-right text-xs">
						<label for="depo">Deposit:
							<input id="depo" type="number" v-model="deposit" step="1" required
								class="w-1/4 bg-gray-900 font-bold text-right">$
						</label><br>
						<label for="lev">Leverage:
							<input id="lev" type="number" v-model="leverage" step="1" required
								class="w-1/4 bg-gray-900 font-bold text-right">
						</label><br>
						<label for="mar">Margin:
							<input id="mar" type="number" v-model="coefRisk" step="1" required
								class="w-1/4 bg-gray-900 font-bold text-right">%
						</label><br>
						<label for="tp">TakeProfit:
							<input id="tp" type="number" v-model="takeProfit" step="0.1" required
								class="w-1/4 bg-gray-900 font-bold text-right">%
						</label><br>
						<label for="sl">StopLoss:
							<input id="sl" type="number" v-model="stopLoss" step="0.1" required
								class="w-1/4 bg-gray-900 font-bold text-right">%
						</label><br>
						<label for="off">Offline Mode:
							<input id="off" type="number" v-model="offlineMode" step="1" required
								class="w-1/4 bg-gray-900 font-bold text-right">
						</label>
					</div>
					<div>
						<button @click="OpenSettings = false" class="bg-gray-900 p-1 border rounded-md">Close</button>
					</div>
				</form>
			</div>
		</Teleport>
	</div>
</template>
<style scoped></style>