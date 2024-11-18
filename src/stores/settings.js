import { defineStore } from "pinia";
import { ref, watch, watchEffect } from "vue";

export const useSettingsStore = defineStore(
  "settings",
  () => {
    const depo = ref(0);
    const leverage = ref(0);
    const risk_sl = ref(0);
    const risk_margin = ref(0);
    const coefPrice = ref(0);

    // Watchers to trigger the database update on change
    watchEffect(depo, leverage, risk_sl, risk_margin, coefPrice);
    //updateDatabase

    return {
      depo,
      leverage,
      risk_sl,
      risk_margin,
      coefPrice,
    };
  },
  {
    persist: true,
  }
);
