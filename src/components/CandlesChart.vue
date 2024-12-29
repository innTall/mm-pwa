<script setup>
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { createChart } from "lightweight-charts";
import { fetchKlineData } from "@/utils/fetchKlineData.js";
import { useKlinesBybitStore } from "@/stores/klinesBybit.js";

// Access the Pinia store for Klines
const { baseAsset, quoteAsset, interval, limit } = storeToRefs(useKlinesBybitStore()); // Destructure reactive variables
const chartContainer = ref(null);
let candlestickSeries = null; //+++ Declare candlestickSeries outside the onMounted scope
let chart = null; //+++ Declare chart globally to allow reinitialization

// Function to fetch and update chart data
const updateChart = async () => {
	if (!chart || !candlestickSeries) return; // Ensure chart is initialized
	const data = await fetchKlineData(
		baseAsset.value,
		quoteAsset.value,
		interval.value,
		limit.value
	);

	if (!data) {
		console.error("Failed to fetch candlestick data.");
		return;
	}

	const sortedData = data.sort((a, b) => a.time - b.time);
	candlestickSeries.setData(sortedData); // Update chart data
};

// Initialize chart
const initializeChart = () => {
	chart = createChart(chartContainer.value, {
		width: chartContainer.value.clientWidth,
		height: chartContainer.value.clientHeight,
		layout: {
			background: { color: "#111827" },
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
	candlestickSeries = chart.addCandlestickSeries({
		upColor: "#4caf50",
		downColor: "#f44336",
		borderUpColor: "#4caf50",
		borderDownColor: "#f44336",
		wickUpColor: "#4caf50",
		wickDownColor: "#f44336",
	});

	// Handle window resize
	window.addEventListener("resize", () => {
		chart.resize(chartContainer.value.clientWidth, chartContainer.value.clientHeight);
	});
};

onMounted(() => {
	initializeChart();
	updateChart(); // Initial data fetch
});

// Watch for changes in store variables
watch([baseAsset, quoteAsset, interval, limit], updateChart);
</script>

<template>
	<div class="relative w-full h-full">
		<div ref="chartContainer" id="candlestick-chart" class="absolute inset-0 bg-gray-900">
		</div>
	</div>
</template>
<style lang="css" scoped></style>