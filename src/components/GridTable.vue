<script setup>
import { ref } from 'vue';
import { useTableStore } from '@/stores/gridtable.js';

const {
	numOfOrderKeys: nums,
	buyLimitLevels: levels,
	buyOrdersArray: buy,
	sumBuyOrders: total,
	amountBuyOrders: amounts,
	sumAmountOrders: summa,
	buyZeroLevels: zero,
	sellLevelsArray: sell,
	totalProfit: profit,
	saveTable,
	deleteTable,
	savedTables,
} = useTableStore();

const headers = [
	{ title: 'N', class: '' },
	{ title: 'Level', class: 'text-green-400' },
	{ title: 'Amt', class: '' },
	{ title: 'Sum', class: 'font-bold' },
	{ title: 'Zero', class: 'text-blue-400' },
	{ title: 'Sell', class: 'text-red-400' },
	{ title: 'Buy', class: '' },
	{ title: 'total', class: 'font-bold' },
	{ title: 'TP', class: 'bg-green-800' },
];

const data = [nums, levels, amounts, summa, zero, sell, buy, total, profit];
const date = ref(null);
const symbol = ref('');
const saveCurrentTable = () => {
	if (!date.value || !symbol.value) {
		alert('Please provide both date and symbol before saving.');
		return;
	}
	saveTable(date.value, symbol.value);
	date.value = null;
	symbol.value = '';
};

const deleteSavedTable = index => {
	deleteTable(index);
};
</script>

<template>
	<div>
		<!-- Input Section -->
		<div class="flex justify-between">
			<input id="'date" type="date" v-model="date" placeholder="Date" class="w-1/4 bg-gray-900 font-bold text-center" />
			<input id="'symbol" type="text" v-model="symbol" placeholder="Symbol"
				class="w-1/4 bg-gray-900 font-bold text-center" />
			<button @click="saveCurrentTable" class="bg-gray-900 p-1 border rounded-md">Save</button>
		</div>
		<!-- Current Table Section -->
		<div class="flex justify-between text-xs text-center gap-2">
			<div v-for="(header, i) in headers" :key="i" :class="'container ' + header.class">
				<p class="font-bold underline">{{ header.title }}</p>
				<div v-for="(item, index) in data[i]" :key="index" class="">
					{{ item }}
				</div>
			</div>
		</div>
		<!-- Saved Tables Section -->
		<div>
			<h2 class="text-lg font-bold mb-4">Saved Tables</h2>
			<div v-for="(table, index) in savedTables" :key="index" class="border p-4 mb-4">
				<div class="flex justify-between items-center">
					<div>
						<p class="font-bold">Date: {{ table.date }}</p>
						<p class="font-bold">Symbol: {{ table.symbol }}</p>
					</div>
					<button @click="deleteSavedTable(index)" class="text-red-400">Delete</button>
				</div>
				<div class="flex justify-between text-xs text-center gap-2 mt-2">
					<div v-for="(header, i) in headers" :key="i" :class="'container ' + header.class">
						<p class="font-bold underline">{{ header.title }}</p>
						<div v-for="(item, idx) in table.data[header.title.toLowerCase()]" :key="idx">
							{{ item }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped></style>