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

// Variable to control candles on screen
const candlesScreen = ref(80); // Default number of candles displayed
let priceScaleWidth = 0; // Dynamically calculate the price scale width

// Function to determine precision dynamically
const getPrecision = (data) => {
	if (!data || data.length === 0) return 2; // Default to 2 decimal places
	const closePrices = data.map((item) => item.close);
	const maxPrecision = Math.max(
		...closePrices.map((price) => {
			const decimals = price.toString().split(".")[1];
			return decimals ? decimals.length : 0;
		})
	);
	return maxPrecision || 2; // Default to 2 if precision cannot be determined
};

// Function to calculate the required priceScale width based on the largest price
const calculatePriceScaleWidth = (data) => {
	if (!data || data.length === 0) return 60; // Default width
	const maxPrice = Math.max(...data.map((item) => item.close));
	const digits = maxPrice.toFixed(getPrecision(data)).length;
	return 10 + digits * 8; // Approximate width in pixels for each character
};

// Function to fetch and update chart data
const updateCharts = async () => {
	if (!priceChart || !priceCandlestickSeries || !aoChart || !aoHistogramSeries) return;

	//const sortedData = data.sort((a, b) => a.time - b.time);
	await fetchCandlestickData(baseAsset.value, quoteAsset.value, interval.value, limit.value);

	// Determine precision from fetched data
	const precision = getPrecision(candlestickData.value);
	priceScaleWidth = calculatePriceScaleWidth(candlestickData.value);

	// Update price scale dynamically based on precision
	priceChart.applyOptions({
		priceScale: {
			position: "right",
			borderVisible: true,
			alignLabels: true,
			mode: 0, // Normal mode
			scaleMargins: {
				top: 0.1,
				bottom: 0.1,
			},
		},
		localization: {
			priceFormatter: (price) => price.toFixed(precision),
		},
	});

	// Update AO chart to match the candlestick price scale width
	aoChart.applyOptions({
		priceScale: {
			visible: false, // Hide AO price scale values
		},
		layout: {
			rightPriceScaleWidth: priceScaleWidth, // Match width with candlestick chart
		},
	});

	// Set full dataset on the series
	priceCandlestickSeries.setData(candlestickData.value);

	// Adjust visible range to show only the last `candlesScreen` candles
	const totalCandles = candlestickData.value.length;
	if (totalCandles > candlesScreen.value) {
		const logicalRange = {
			from: totalCandles - candlesScreen.value,
			to: totalCandles,
		};
		priceChart.timeScale().setVisibleLogicalRange(logicalRange);
	}
	
	// Update AO chart data
	calculateIndicator(candlestickData.value);
	aoHistogramSeries.setData(aoData.value);
};

// Function to format timestamp for crosshair tooltip
const formatTimestamp = (timestamp, interval) => {
	const date = new Date(timestamp * 1000); // Convert to milliseconds
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear().toString().slice(-2);

	if (interval === "1h" || interval === "4h") {
		return `${hours}:00 ${day}.${month}.${year}`;
	} else if (interval === "5m" || interval === "15m") {
		return `${hours}:${minutes} ${day}.${month}.${year}`;
	}
	return `${hours}:${minutes} ${day}.${month}.${year}`;
};

// Function to resize charts dynamically
const handleResize = () => {
	const container = combinedChartContainer.value;
	if (!container) return;
	const containerHeight = container.offsetHeight;
	const priceChartHeight = (4 / 5) * containerHeight;
	const aoChartHeight = (1 / 5) * containerHeight;
	if (priceChart) priceChart.resize(container.offsetWidth, priceChartHeight);
	if (aoChart) aoChart.resize(container.offsetWidth, aoChartHeight);
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

	// Crosshair customization
	priceChart.subscribeCrosshairMove((param) => {
		if (param.time && param.seriesData.get(priceCandlestickSeries)) {
			const formattedTime = formatTimestamp(param.time, interval.value);
			//console.log("Crosshair timestamp:", formattedTime);
		}
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

	// Update charts after initialization
	//await updateCharts();

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