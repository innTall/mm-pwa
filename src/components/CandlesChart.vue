<script setup>
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { createChart } from "lightweight-charts";
import { fetchKlineData } from "@/utils/fetchKlineData.js";
import { useKlinesBybitStore } from "@/stores/klinesBybit.js";
import { calculateAO } from "@/utils/ao.js";

// Access the Pinia store for Klines
const { baseAsset, quoteAsset, interval, limit } = storeToRefs(useKlinesBybitStore()); // Destructure reactive variables

const combinedChartContainer = ref(null);
let priceChart = null;
let aoChart = null;
let priceCandlestickSeries = null;
let aoHistogramSeries = null;

// Function to resize charts dynamically
const handleResize = () => {
	const container = combinedChartContainer.value;
	if (!container) return;

	const containerHeight = container.offsetHeight;
	const priceChartHeight = (4 / 5) * containerHeight;
	const aoChartHeight = (1 / 5) * containerHeight;

	if (priceChart) {
		priceChart.resize(container.offsetWidth, priceChartHeight);
	}
	if (aoChart) {
		aoChart.resize(container.offsetWidth, aoChartHeight);
	}
};

// Function to fetch and update chart data
const updateCharts = async () => {
	if (!priceChart || !priceCandlestickSeries || !aoChart || !aoHistogramSeries) return;

	const data = await fetchKlineData(baseAsset.value, quoteAsset.value, interval.value, limit.value);
	if (!data) {
		console.error("Failed to fetch candlestick data.");
		return;
	}

	const sortedData = data.sort((a, b) => a.time - b.time);
	priceCandlestickSeries.setData(sortedData);

	const aoData = calculateAO(sortedData);
	aoHistogramSeries.setData(aoData);
};

// Initialize both charts
const initializeCharts = () => {
	const container = combinedChartContainer.value;
	if (!container) return;

	const containerHeight = container.offsetHeight;
	const priceChartHeight = (4 / 5) * containerHeight;
	const aoChartHeight = (1 / 5) * containerHeight;

	// Price Chart
	priceChart = createChart(container, {
		width: container.offsetWidth,
		height: priceChartHeight,
		layout: {
			background: { color: "#111827" },
			textColor: "#ffffff",
		},
		grid: {
			vertLines: { color: "#1F2937" },
			horzLines: { color: "#1F2937" },
		},
		timeScale: {
			borderColor: "#cccccc",
			rightOffset: 10, // Disable any offset on the time scale
		},
		priceScale: {
			borderColor: "#cccccc",
		},
		crosshair: {
			mode: 0,
		}
	});

	priceCandlestickSeries = priceChart.addCandlestickSeries({
		upColor: "#16A34A",
		downColor: "#DC2626",
		borderUpColor: "#16A34A",
		borderDownColor: "#DC2626",
		wickUpColor: "#16A34A",
		wickDownColor: "#DC2626",
	});

	// AO Chart
	aoChart = createChart(container, {
		width: container.offsetWidth,
		height: aoChartHeight,
		layout: {
			background: { color: "#111827" },
			textColor: "#ffffff",
		},
		grid: {
			vertLines: { color: "#1F2937" },
			horzLines: { color: "#1F2937" },
		},
		timeScale: {
			borderColor: "#cccccc",
			visible: false, // Hide the time scale for the AO chart (shared with price chart)
			rightOffset: 10, // Disable any offset on the time scale
		},
		priceScale: {
			borderColor: "#cccccc",
		},
		crosshair: {
			mode: 2,
		}
	});

	aoHistogramSeries = aoChart.addHistogramSeries({
		color: "#00FF00",
		base: 0,
		priceLineVisible: false, // Hides the dynamic price line
		lastValueVisible: false, // Hides the last value label
	});

	// Sync time scale between the charts
	const priceTimeScale = priceChart.timeScale();
	const aoTimeScale = aoChart.timeScale();
	priceTimeScale.subscribeVisibleLogicalRangeChange((range) => {
		aoTimeScale.setVisibleLogicalRange(range);
	});

	aoTimeScale.subscribeVisibleLogicalRangeChange((range) => {
		priceTimeScale.setVisibleLogicalRange(range);
	});

	// Handle window resize
	window.addEventListener("resize", handleResize);
};

onMounted(() => {
	initializeCharts();
	updateCharts(); // Initial data fetch
});

// Watch for changes in store variables
watch([baseAsset, quoteAsset, interval, limit], updateCharts);
</script>

<template>
	<div class="relative w-full h-full">
		<div ref="combinedChartContainer" id="combined-chart-container" class="absolute inset-0 bg-gray-900">
		</div>
	</div>
</template>
<style lang="css" scoped></style>