import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";

export const useMarginBybitStore = defineStore(
  "marginBybit",
  () => {
    const depo = ref(0);
    const leverage = ref(0);
    const risk_sl = ref(0);
    const risk_margin = ref(0);
    const coef_price = ref(0);

    // Watchers to trigger the database update on change
    watchEffect(depo, leverage, risk_sl, risk_margin, coef_price);

    return {
      depo,
      leverage,
      risk_sl,
      risk_margin,
      coef_price,
    };
  },
  {
    persist: true,
  }
);
