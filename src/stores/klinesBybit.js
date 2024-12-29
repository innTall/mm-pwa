import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";

export const useKlinesBybitStore = defineStore(
  "klinesBybit",
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
