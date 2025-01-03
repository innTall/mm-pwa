import { defineStore } from "pinia";
import { ref } from "vue";

export const useChartSettingsStore = defineStore(
  "chartSettings",
  () => {
    
    const baseAsset = ref("BTC");
    const quoteAsset = ref("USDT");
    const interval = ref("15");
    const limit = ref("200");
    
		return {
      baseAsset,
      quoteAsset,
      interval,
      limit,
    };
  },
  { persist: false }
);
