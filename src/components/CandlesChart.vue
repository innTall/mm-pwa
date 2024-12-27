<script setup>
import { ref, onMounted } from "vue";
import { createChart } from "lightweight-charts";
import { fetchKlineData } from "@/utils/fetchKlineData";
const chartContainer = ref(null);
//const candlestickData = ref([]);

onMounted(async () => {
	const baseAsset = "BTC";
	const quoteAsset = "USDT";
	const interval = "15"; // 15-minute intervals

	// Fetch candlestick data
	const data = await fetchKlineData(baseAsset, quoteAsset, interval);
	if (!data) {
		console.error("Failed to fetch candlestick data.");
		return;
	}

	// Initialize the Lightweight Charts instance
	const chart = createChart(chartContainer.value, {
		width: chartContainer.value.clientWidth,
		height: chartContainer.value.clientHeight,
		layout: {
			background: {color: "#111827" },
			textColor: "#ffffff",
		},
		grid: {
			vertLines: {
				color: "#1F2937",
			},
			horzLines: {
				color: "#1F2937",
			},
		},
		crosshair: {
			mode: 1, // Normal crosshair mode
		},
		priceScale: {
			borderColor: "#cccccc",
		},
		timeScale: {
			borderColor: "#cccccc",
		},
	});

	// Add a candlestick series
	const candlestickSeries = chart.addCandlestickSeries({
		upColor: "#4caf50",
		downColor: "#f44336",
		borderUpColor: "#4caf50",
		borderDownColor: "#f44336",
		wickUpColor: "#4caf50",
		wickDownColor: "#f44336",
	});

	// Sort the data by time in ascending order
	const sortedData = data.sort((a, b) => a.time - b.time);
	// Set the candlestick data
	candlestickSeries.setData(sortedData);

	// Handle window resize
	window.addEventListener("resize", () => {
		chart.resize(chartContainer.value.clientWidth, chartContainer.value.clientHeight);
	});
});
</script>

<template>
	<div class="">
		<div ref="chartContainer" id="candlestick-chart" class="relative w-full h-96 bg-gray-900"
			style="background-color: #111827;">
		</div>
	</div>
</template>
<style lang="css" scoped></style>