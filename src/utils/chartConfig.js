import { createChart } from "lightweight-charts";

// Create a base chart configuration
const baseChartConfig = (width, height, timeScaleVisible = true) => ({
  width,
  height,
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
    visible: true, //timeScaleVisible,
    rightOffset: 7, // Disable any offset on the time scale
  },
  priceScale: {
    borderColor: "#cccccc",
  },
  crosshair: {
    mode: 0,
  },
});

// Function to create a price chart
export const createPriceChart = (container, width, height) => {
  const config = baseChartConfig(width, height, true); // Time scale visible for price chart
  return createChart(container, config);
};

// Function to create an AO chart
export const createAOChart = (container, width, height) => {
  const config = baseChartConfig(width, height, false); // Hide time scale for AO chart
  config.crosshair = { mode: 2 }; // Crosshair mode off
  config.timeScale = { visible: false, rightOffset: 7 };
  return createChart(container, config);
};
