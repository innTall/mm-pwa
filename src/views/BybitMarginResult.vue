<script setup>
import FooterBybit from '../components/FooterBybit.vue';
import { ref, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useMarginStore } from "@/stores/margin.js";
const { orderBlocks } = storeToRefs(useMarginStore());
const { T_P, S_L, addNewBlock, removeBlock } = useMarginStore();
// Utility function to clear a field
const clearField = (field) => {
	if (field && typeof field === 'object' && 'value' in field) {
		field.value = '';
	} else {
		field = '';
	}
};

// Watch for changes in the order blocks to detect when a new block is needed
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
</script>

<template>
	<div class="container min-h-screen mb-10px-2 py-1 text-sm">
		<div class="flex justify-between border px-2 py-1">
			<div class="">BYBIT Margin Order</div>
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
			<div class="relative flex gap-3">
				<button v-if="index && block.activeValue === 'set'" @click="removeBlock(index)"
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
								<input :id="'set' + index" type="radio" value="set" v-model="block.activeValue" />
								Set
							</label>
							<label :for="'profit' + index" :class="{
								'text-green-500 font-bold': block.activeValue === 'profit',
								'text-gray-500': block.activeValue !== 'profit',
							}">
								<input :id="'profit' + index" type="radio" value="profit" v-model="block.activeValue" />
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
								<input :id="'loss' + index" type="radio" value="loss" v-model="block.activeValue" />
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
					:disabled="block.activeValue !== 'set'" />
				<input :id="'symbol' + index" type="text" v-model="block.symbol" placeholder="Symbol"
					class="w-[6ch] bg-gray-900 text-center uppercase" @focus="clearField(symbol)"
					:disabled="block.activeValue !== 'set'" />
				<input :id="'buy' + index" type="number" v-model="block.buy" placeholder="Buy"
					class="w-[8ch] bg-gray-900 text-center text-blue-400 appearance-none" @focus="clearField(buy)"
					:disabled="block.activeValue !== 'set'" />
				<input :id="'amnt' + index" type="number" v-model="block.amnt" placeholder="Amnt"
					class="w-[6ch] bg-gray-900 text-center appearance-none" @focus="clearField(amnt)"
					:disabled="block.activeValue !== 'set'" />
				<input :id="'tp' + index" type="number" v-model="block.tp" placeholder="TP"
					class="w-[8ch] bg-gray-900 text-center text-green-400 appearance-none" @focus="clearField(tp)"
					:disabled="block.activeValue !== 'set'" />
				<input :id="'sl' + index" type="number" v-model="block.sl" placeholder="SL"
					class="w-[8ch] bg-gray-900 text-center text-red-400 appearance-none" @focus="clearField(sl)"
					:disabled="block.activeValue !== 'set'" />
			</div>
			<hr class="border-green-600 mt-2" />
		</div>
	</div>
	<footer class="fixed w-full h-12 left-0 bottom-0 z-10 bg-gray-900">
		<FooterBybit />
	</footer>
</template>

<style scoped></style>