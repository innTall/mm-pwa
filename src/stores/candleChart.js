import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchKlineData } from "@/utils/fetchKlineData.js";

export const useCandleChartStore = defineStore("candleChart", () => {
  const candlestickData = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchCandlestickData = async (
    baseAsset,
    quoteAsset,
    interval,
    limit
  ) => {
    try {
      isLoading.value = true;
      error.value = null;

      const data = await fetchKlineData(baseAsset, quoteAsset, interval, limit);
      candlestickData.value = data.sort((a, b) => a.time - b.time);
    } catch (err) {
      error.value = `Failed to fetch candlestick data: ${err.message}`;
      candlestickData.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    candlestickData,
    isLoading,
    error,
    fetchCandlestickData,
  };
});
