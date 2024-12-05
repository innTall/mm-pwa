<script setup>
import FooterBybit from '../components/FooterBybit.vue';
import { ref, watch, computed } from "vue";
import { supabase } from "@/api/supabase.js";
import { storeToRefs } from "pinia";
import { useMarginBybitResStore } from "@/stores/marginBybitRes.js";
const { orderBlocks } = storeToRefs(useMarginBybitResStore());
const { T_P, S_L, addNewBlock, removeBlock } = useMarginBybitResStore();
// Utility function to clear a field
const clearField = (field) => {
	if (field && typeof field === 'object' && 'value' in field) {
		field.value = '';
	} else {
		field = '';
	}
};
const isFirstClickOnSL = ref(true); // Flag to track the first click
// Watcher logic to handle dynamic addition of blocks based on field inputs
watch(
	orderBlocks,
	(blocks) => {
		const lastBlock = blocks[0];
		if (
			lastBlock.date &&
			lastBlock.symbol &&
			lastBlock.buy &&
			lastBlock.amnt &&
			lastBlock.tp
		) {
			addNewBlock();
		}
	},
	{ deep: true } // Ensure deep watch on the order blocks
);
// Handle the first click on the 'sl' field
const handleSLFocus = () => {
	if (isFirstClickOnSL.value) {
		addNewBlock(); // Add a new block
		isFirstClickOnSL.value = false; // Prevent subsequent additions
	}
};

// Computed property to calculate the sum of active values
const totalActiveSum = computed(() => {
	if (!Array.isArray(orderBlocks.value) || orderBlocks.value.length === 0) {
		return 0; // Return 0 if there are no blocks
	}

	return orderBlocks.value.reduce((sum, block) => {
		if (block.activeValue === "profit") {
			// Add TP if activeValue is "profit"
			const profit = parseFloat(block.buy && block.amnt && block.tp ? T_P(block.buy, block.amnt, block.tp) : 0);
			return sum + profit;
		} else if (block.activeValue === "loss") {
			// Subtract SL if activeValue is "loss"
			const loss = parseFloat(block.buy && block.amnt && block.sl ? S_L(block.buy, block.amnt, block.sl) : 0);
			return sum + loss;
		}
		return sum; // If no activeValue, add nothing
	}, 0);
});

// Toggle block disable state
const toggleBlock = (block, disable) => {
	block.disabled = disable;
};
// Handle TP or SL activation
const handleTPorSLActivation = (block) => {
	toggleBlock(block, true);
};
// Reactivate the block via double-click
const handleDoubleClick = (block) => {
	toggleBlock(block, false);
};

async function saveSettings() {
	if (!orderBlocks.value || orderBlocks.value.length <= 1) {
		alert("No valid data to save.");
		return;
	}

	// Exclude the first block and any invalid blocks
	const validBlocks = orderBlocks.value.slice(1).filter(block => {
		return (
			block.date &&
			block.symbol &&
			block.buy &&
			block.amnt &&
			block.tp &&
			block.sl
		);
	});

	if (validBlocks.length === 0) {
		alert("No valid data to save after filtering.");
		return;
	}

	try {
		const { error } = await supabase.from("order_margin").insert(validBlocks.map(block => ({
			date: block.date,
			symbol: block.symbol,
			buy: block.buy,
			amnt: block.amnt,
			tp: block.tp,
			sl: block.sl,
			activeValue: block.activeValue,
			T_P: T_P(block.buy, block.amnt, block.tp),
			S_L: S_L(block.buy, block.amnt, block.sl),
		})));

		if (error) {
			console.error("Error saving settings:", error);
			alert("Failed to save settings.");
		} else {
			alert("Settings saved successfully!");
		}
	} catch (err) {
		console.error("Unexpected error:", err);
		alert("An unexpected error occurred.");
	}
}
</script>

<template>
	<div class="container min-h-screen mb-10 px-2 py-1 text-sm">
		<div class="flex justify-between border px-2 py-1">
			<div class="">BYBIT Margin Order</div>
			<button @click="saveSettings" class="bg-blue-400">Send</button>
			<!-- Total Profit and Loss Display -->
			<div class="text-center font-bold">
				<p :class="{
					'text-green-500 font-bold': totalActiveSum > 0,
					'text-red-500 font-bold': totalActiveSum < 0,
					'text-gray-500': totalActiveSum === 0
				}">
					Total: {{ totalActiveSum.toFixed(2) }}
				</p>
			</div>
		</div>
		<!-- Loop through blocks -->
		<div v-for="(block, index) in orderBlocks" :key="index" class="">
			<div class="relative flex gap-3" @dblclick="handleDoubleClick(block)">
				<!-- Remove Delete Button if block is disabled -->
				<button v-if="index && block.activeValue === 'set' && !block.disabled" @click="removeBlock(index)"
					class="w-5 bg-red-600 text-white hover:bg-red-500 hover:text-white">
					X
				</button>
				<!-- Header -->
				<div class="container flex justify-between">
					<div class="text-yellow-400 font-bold">Order {{ index + 1 }}</div>
					<div class="flex gap-3">
						<div class="flex gap-3">
							<label :for="'set' + index" :class="{
								'text-white font-bold': block.activeValue === 'set',
								'text-gray-500': block.activeValue !== 'set',
							}">
								<input :id="'set' + index" type="radio" value="set" v-model="block.activeValue"
									:disabled="block.disabled" />
								Set
							</label>
							<label :for="'profit' + index" :class="{
								'text-green-500 font-bold': block.activeValue === 'profit',
								'text-gray-500': block.activeValue !== 'profit',
							}">
								<input :id="'profit' + index" type="radio" value="profit" v-model="block.activeValue"
									:disabled="block.disabled" @change="handleTPorSLActivation(block)" />
								TP
							</label>
							<span :class="{
								'text-green-500': block.activeValue === 'profit',
								'text-gray-500': block.activeValue !== 'profit',
							}">
								{{ T_P(block.buy, block.amnt, block.tp) }}
							</span>

							<!-- Loss Radio Button and Label -->
							<label :for="'loss' + index" :class="{
								'text-red-500 font-bold': block.activeValue === 'loss',
								'text-gray-500': block.activeValue !== 'loss',
							}">
								<input :id="'loss' + index" type="radio" value="loss" v-model="block.activeValue"
									:disabled="block.disabled" @change="handleTPorSLActivation(block)" />
								SL
							</label>
							<span :class="{
								'text-red-500': block.activeValue === 'loss',
								'text-gray-500': block.activeValue !== 'loss',
							}">
								{{ S_L(block.buy, block.amnt, block.sl) }}
							</span>
						</div>
					</div>
				</div>
			</div>
			<!-- Input Fields -->
			<div class="flex justify-between">
				<input :id="'date' + index" type="date" v-model="block.date" placeholder="Date"
					class="w-[8ch] bg-gray-900 text-center appearance-none" @focus="clearField(date)"
					:disabled="block.disabled" />
				<input :id="'symbol' + index" type="text" v-model="block.symbol" placeholder="Symbol"
					class="w-[6ch] bg-gray-900 text-center uppercase" @focus="clearField(symbol)" :disabled="block.disabled" />
				<input :id="'buy' + index" type="number" v-model="block.buy" placeholder="Buy"
					class="w-[8ch] bg-gray-900 text-center text-blue-400 appearance-none" @focus="clearField(buy)"
					:disabled="block.disabled" />
				<input :id="'amnt' + index" type="number" v-model="block.amnt" placeholder="Amnt"
					class="w-[6ch] bg-gray-900 text-center appearance-none" @focus="clearField(amnt)"
					:disabled="block.disabled" />
				<input :id="'tp' + index" type="number" v-model="block.tp" placeholder="TP"
					class="w-[8ch] bg-gray-900 text-center appearance-none" :class="{
						'text-green-400': block.activeValue === 'profit',
						'text-gray-500': block.activeValue !== 'profit'
					}" @focus="clearField('tp')" :disabled="block.disabled" />
				<!-- Attach focus listener to the 'sl' input -->
				<input :id="'sl' + index" type="number" v-model="block.sl" placeholder="SL"
					class="w-[8ch] bg-gray-900 text-center appearance-none" :class="{
						'text-red-400': block.activeValue === 'loss',
						'text-gray-500': block.activeValue !== 'loss'
					}" @focus="clearField('sl'); handleSLFocus()" :disabled="block.disabled" />
			</div>
			<hr class="border-green-600 mt-2" />
		</div>
	</div>
	<footer class="fixed w-full h-12 left-0 bottom-0 z-10 bg-gray-900">
		<FooterBybit />
	</footer>
</template>

<style scoped></style>