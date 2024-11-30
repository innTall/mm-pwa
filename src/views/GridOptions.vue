<script setup>
import { ref, computed } from 'vue';

// *** Trade options ***
const fee = 0.001;
const deposit = ref(1700);
const coefOfRisk = ref(0.02);
const coefNextOrderCost = ref(1.2);
const firstOrderCost = computed(() => +(deposit.value * coefOfRisk.value).toFixed(2));

// Header of orders block
const symbol = ref('');
const open = ref('');
const close = ref('');

// First order
const numberOrder1 = ref(1);
const buyPrice1 = ref(1.2345);
const tokenAmount1 = (firstOrderCost / buyPrice1.value).toFixed(2);
const buyOrder1 = Number(buyPrice1.value * tokenAmount1 + buyPrice1.value * tokenAmount1 * fee).toFixed(2);
const sellPrice1 = ref(1.456);
const sellOrder1 = Number(sellPrice1.value * tokenAmount1 - sellPrice1.value * tokenAmount1 * fee).toFixed(2);
const profit1 = (sellOrder1 - buyOrder1).toFixed(2);

// each next order
const numberOrder2 = ref(2);
const buyPrice2 = ref(1.1345);
const tokenAmount2 = (buyOrder1 * coefNextOrderCost.value / buyPrice2.value).toFixed(2);
const buyOrder2 = Number(buyPrice2.value * tokenAmount2 + buyPrice2.value * tokenAmount2 * fee).toFixed(2);
const sellPrice2 = ref(1.356);
const sellOrder2 = Number(sellPrice2.value * tokenAmount2 - sellPrice2.value * tokenAmount2 * fee).toFixed(2);
const profit2 = +(sellOrder2 - buyOrder2).toFixed(2);

// if buyOrders >= 2
const buyOrder_Sum = (+buyOrder1 + +buyOrder2);
const tokenAmount_Sum = (+tokenAmount1 + +tokenAmount2);
const buyPrice_Sum = (buyOrder_Sum / tokenAmount_Sum).toFixed(4);
const sellOrder_Sum = (+sellOrder1 + +sellOrder2);
const sellPrice_Sum = (+sellOrder_Sum / +tokenAmount_Sum).toFixed(4);
const profit_Sum = (+sellOrder_Sum - +buyOrder_Sum).toFixed(2);
</script>

<template>
	<div class="">
		<!-- static permanent block -->
		<div class="flex justify-between text-center p-1 text-sm">
			<div>
				<label for="deposit">Deposit:
					<input id="deposit" type="number" v-model="deposit" step="1" min="1" required
						class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
				</label>
			</div>
			<div>
				<label for="coefCost">Coef of Cost:
					<input id="coefCost" type="number" v-model="coefNextOrderCost" step="1" min="1" required
						class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
				</label>
			</div>
			<div>
				<label for="coefRisk">Coef of Risk:
					<input id="coefRisk" type="number" v-model="coefOfRisk" step="1" min="1" required
						class="w-[6ch] bg-gray-900 text-yellow-400 font-bold text-center" />
				</label>
			</div>
			<div class="">First Order: {{ firstOrderCost }}</div>
		</div>
		<hr class="border-green-600 mt-2">
		<!-- orders block -->
		<div class="border border-gray-400 p-1">
			<div class="">
				<!-- Symbol and Open Date & Sell Date -->
				<div class="flex justify-between text-center p-1 text-sm">
					<div>
						<input id="symbol" type="text" v-model="symbol" required placeholder="Symbol"
							class="w-[8ch] bg-gray-900 text-yellow-400 text-center" />
					</div>
					<div>
						<input id="open" type="date" v-model="open" required placeholder="Open Date"
							class="w-[8ch] bg-gray-900 text-gray-400 text-center" />
					</div>
					<div>
						<input id="close" type="date" v-model="close" required placeholder="Close Date"
							class="w-[8ch] bg-gray-900 text-gray-400 text-center" />
					</div>
					<button class="bg-gray-700">Save</button>
				</div>
			</div>
			<div class="">
				<div class="flex justify-between text-sm">
					<!-- First order data-->
					<div class="">{{ numberOrder1 }}</div>
					<div>
						<input id="buyPrice1" type="number" v-model="buyPrice1" required placeholder="Sell Price"
							class="w-[8ch] bg-gray-900 text-gray-400 text-center" />
					</div>
					<div class="">{{ tokenAmount1 }}</div>
					<div class="">{{ buyOrder1 }}</div>
					<div>
						<input id="sellPrice1" type="number" v-model="sellPrice1" required placeholder="Sell Price"
							class="w-[8ch] bg-gray-900 text-gray-400 text-center" />
					</div>
					<div class="">{{ sellOrder1 }}</div>
					<div class="">{{ profit1 }}</div>
					<button class="bg-blue-400">Add</button>
				</div>
				<!-- Each next order -->
				<div class="flex justify-between text-sm">
					<div class="">{{ numberOrder2 }}</div>
					<div>
						<input id="buyPrice2" type="number" v-model="buyPrice2" required placeholder="Sell Price"
							class="w-[8ch] bg-gray-900 text-gray-400 text-center" />
					</div>
					<div class="">{{ tokenAmount2 }}</div>
					<div class="">{{ buyOrder2 }}</div>
					<div>
						<input id="sellPrice2" type="number" v-model="sellPrice2" required placeholder="Sell Price"
							class="w-[8ch] bg-gray-900 text-gray-400 text-center" />
					</div>
					<div class="">{{ sellOrder2 }}</div>
					<div class="">{{ profit2 }}</div>
					<button class="bg-blue-400">Add</button>
				</div>
				<!-- AVG value of all active orders in block -->
				<div class="flex justify-between text-sm">
					<div class="">Sum</div>
					<div class="">{{ buyPrice_Sum }}</div>
					<div class="">{{ tokenAmount_Sum }}</div>
					<div class="">{{ buyOrder_Sum }}</div>
					<div class="">{{ sellPrice_Sum }}</div>
					<div class="">{{ sellOrder_Sum }}</div>
					<div class="">{{ profit_Sum }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped></style>