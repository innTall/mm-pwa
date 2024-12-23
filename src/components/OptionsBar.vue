<script setup>
import SettingsButton from "./SettingsButton.vue";
import { storeToRefs } from "pinia";
import { useMarginSettingsStore } from "@/stores/marginSettings.js";
import { useMarginOptionsStore } from "@/stores/marginOptions.js";
const { deposit, leverage, takeProfit, stopLoss } = storeToRefs(useMarginSettingsStore());
const { margin, tpCost, slCost } = storeToRefs(useMarginOptionsStore());
const { addBlock } = useMarginOptionsStore();
</script>

<template>
	<div class="flex justify-between px-2 gap-1 text-center">
		<div class="px-2 py-1 border rounded-md items-center hover:bg-gray-700">
			<SettingsButton />
		</div>
		<div>
			<div class="text-xs">Depo</div>
			<div class="text-sm">{{ deposit }}$</div>
		</div>
		<div>
			<div class="text-xs">Lever</div>
			<div class="text-sm">{{ leverage }}</div>
		</div>
		<div>
			<div class="text-xs">Margin</div>
			<div class="text-sm">{{ margin }}$</div>
		</div>
		<div>
			<div class="text-xs">TP-{{ takeProfit }}%</div>
			<div class="text-sm">{{ tpCost }}$</div>
		</div>
		<div>
			<div class="text-xs">SL-{{ stopLoss }}%</div>
			<div class="text-sm">{{ slCost }}$</div>
		</div>
		<button @click="addBlock" class="px-2 py-1 text-sm border rounded-lg hover:bg-gray-700">Add</button>
	</div>
	<hr class="border-green-600 mt-1">
</template>
<style scoped></style>