<script setup>
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { createPriceChart, createAOChart } from "@/utils/chartConfig.js";
import { useChartSettingsStore } from "@/stores/chartSettings.js";
import { useCandleChartStore } from "@/stores/candleChart.js";
import { useIAOStore } from "@/stores/iAO.js";

// Store references
const { baseAsset, quoteAsset, interval, limit } = storeToRefs(useChartSettingsStore());
const { candlestickData } = storeToRefs(useCandleChartStore());
const { fetchCandlestickData } = useCandleChartStore();
const { aoData } = storeToRefs(useIAOStore());
const { calculateIndicator } = useIAOStore();

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

	//const sortedData = data.sort((a, b) => a.time - b.time);
	await fetchCandlestickData(baseAsset.value, quoteAsset.value, interval.value, limit.value);
	priceCandlestickSeries.setData(candlestickData.value);

	calculateIndicator(candlestickData.value);
	aoHistogramSeries.setData(aoData.value);
};

// Initialize both charts
const initializeCharts = () => {
	const container = combinedChartContainer.value;
	if (!container) return;

	const containerHeight = container.offsetHeight;
	const priceChartHeight = (4 / 5) * containerHeight;
	const aoChartHeight = (1 / 5) * containerHeight;

	// Price Chart
	priceChart = createPriceChart(container, container.offsetWidth, priceChartHeight);
	priceCandlestickSeries = priceChart.addCandlestickSeries({
		upColor: "#16A34A",
		downColor: "#DC2626",
		borderUpColor: "#16A34A",
		borderDownColor: "#DC2626",
		wickUpColor: "#16A34A",
		wickDownColor: "#DC2626",
	});

	// AO Chart
	aoChart = createAOChart(container, container.offsetWidth,	aoChartHeight)
	aoHistogramSeries = aoChart.addHistogramSeries({
		color: "#00FF00",
		base: 0,
		priceLineVisible: false,
		lastValueVisible: false,
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
	<div class="relative w-full h-full border-t border-green-600">
		<div ref="combinedChartContainer" id="combined-chart-container" class="absolute inset-0">
		</div>
	</div>
</template>
<style scoped></style>