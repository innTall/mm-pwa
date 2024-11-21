import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";
export const useMinmaxStore = defineStore(
  "MinmaxStore",
  () => {
    const firstBuyLevel = ref(0);
    const buyLevelsCoef = ref(0);
    const minPrice = ref(0);
    const maxPrice = ref(0);
    const gridSize = ref(0);
    
    const getProfit = () => {
      gridSize.value = (
        ((Number(maxPrice.value / minPrice.value - 1) / 2 +
          (1 - minPrice.value / maxPrice.value) / 2) /
            2) * 100 ).toFixed(1);
    };
    watchEffect(minPrice, maxPrice, gridSize, firstBuyLevel, buyLevelsCoef);
    return { minPrice, maxPrice, gridSize, firstBuyLevel, buyLevelsCoef, getProfit };
  },
  { persist: true }
);
