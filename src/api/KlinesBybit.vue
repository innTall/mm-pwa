<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useMarginSymbolsStore } from "@/stores/marginSymbols.js";
const { klineData } = storeToRefs(useMarginSymbolsStore()); // Use reactive store variable

// Reactive variables
const interval = ref("15");
const quoteAsset = ref("USDT");
const limit = ref("200");

// Function to download the fetched data as a JSON file
const downloadJSON = () => {
	if (!klineData.value) {
		alert("No data available to download!");
		return;
	}
	const jsonString = JSON.stringify(klineData.value, null, 2); // Pretty print JSON
	const blob = new Blob([jsonString], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	// Create a temporary link element to trigger the download
	const link = document.createElement("a");
	link.href = url;
	link.download = "kline_data.json";
	link.click();
	// Revoke the object URL after download
	URL.revokeObjectURL(url);
};
</script>

<template>
	<div class="text-sm mt-2">
		<div class="flex justify-between">
			<input id="interval" type="number" v-model="interval" placeholder="tf"
				class="w-[6ch] bg-gray-900 border text-center" />
			<input id="quoteAsset" type="text" v-model="quoteAsset" placeholder="usdt"
				class="w-[8ch] bg-gray-900 border text-center uppercase" />
			<input id="limit" type="number" v-model="limit" placeholder="200-1000"
				class="w-[8ch] bg-gray-900 border text-center" />
			<button @click="downloadJSON" :disabled="!klineData" class="bg-gray-700 px-2">JSON</button>
		</div>
		<hr class="border-green-600 mt-2">
		<pre v-if="klineData">{{ klineData }}</pre>
	</div>
</template>

<style scoped></style>