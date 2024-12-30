import { defineStore } from "pinia";
import { ref } from "vue";
import { calculateAO } from "@/utils/ao.js";

export const useIAOStore = defineStore("iAO", () => {
  const aoData = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const calculateIndicator = (candlestickData) => {
    if (!candlestickData || candlestickData.length === 0) {
      error.value = "No candlestick data available for AO calculation.";
      aoData.value = [];
      return;
    }

    try {
      isLoading.value = true;
      error.value = null;
      aoData.value = calculateAO(candlestickData);
    } catch (err) {
      error.value = `Failed to calculate AO: ${err.message}`;
      aoData.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    aoData,
    isLoading,
    error,
    calculateIndicator,
  };
});
