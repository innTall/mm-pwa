export const calculateAO = (candlestickData) => {
  if (!candlestickData || candlestickData.length === 0) {
    console.error("No candlestick data available for AO calculation.");
    return [];
  }

  const medianPrices = candlestickData.map(
    (candle) => (candle.high + candle.low) / 2
  );
  const sma = (data, period) => {
    const result = [];
    for (let i = 0; i < data.length; i++) {
      if (i >= period - 1) {
        const slice = data.slice(i - period + 1, i + 1);
        const sum = slice.reduce((acc, val) => acc + val, 0);
        result.push(sum / period);
      } else {
        result.push(null); // Fill with null for incomplete periods
      }
    }
    return result;
  };
  const sma5 = sma(medianPrices, 5);
  const sma34 = sma(medianPrices, 34);
  const ao = sma5.map((value, index) => {
    if (value === null || sma34[index] === null) return null;
    return value - sma34[index];
  });
  
	// Build AO data with time, value, and color
  const aoData = candlestickData
    .map((candle, index) => {
      const value = ao[index];
      if (value === null)
        return { time: candle.time, value: 0, color: "#00000000" }; // Transparent for empty periods
      const previousValue = ao[index - 1];
      let color = "#16A34A"; // Default to green
      if (previousValue !== undefined && value < previousValue) {
        color = "#DC2626"; // Red if the value is less than the previous value
      }
      return {
        time: candle.time, //time: candlestickData[index].time,
        value: value,
        color: color, // Include color for the histogram
      };
    })
    //.filter((point) => point !== null); // Remove null entries
  return aoData;
};
