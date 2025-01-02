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
    visible: timeScaleVisible, //timeScaleVisible,
    rightOffset: 5, // Disable any offset on the time scale
    timeVisible: true, // Ensure time is displayed
  },
  priceScale: {
    borderColor: "#cccccc",
  },
  crosshair: {
    mode: 1,
    vertLine: {
      color: "#ffffff",
      width: 1,
      style: 1,
      visible: true,
      labelVisible: true,
    },
    horzLine: {
      //markerVisible: false,
      visible: false, // Disable horizontal crosshair line
      labelVisible: false,
    },    
  },
  crosshairMarkerVisible: false, // Remove price label from the crosshair
  
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
  config.timeScale = { visible: false, rightOffset: 5 };
  return createChart(container, config);
};
