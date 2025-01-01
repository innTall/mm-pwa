import { defineStore } from "pinia";
import { ref } from "vue";

export const useMarginSettingsStore = defineStore("marginSettings", () => {
  const openSettings = ref(false);
  const deposit = ref(null);
  const leverage = ref(null);
  const coefRisk = ref(null);
  const takeProfit = ref(null);
  const stopLoss = ref(null);

  // Actions
  const toggleSettings = () => {
    openSettings.value = !openSettings.value;
  };

  const setSettings = (newSettings) => {
    if (newSettings.deposit !== undefined) deposit.value = newSettings.deposit;
    if (newSettings.leverage !== undefined)
      leverage.value = newSettings.leverage;
    if (newSettings.coefRisk !== undefined)
      coefRisk.value = newSettings.coefRisk;
    if (newSettings.takeProfit !== undefined)
      takeProfit.value = newSettings.takeProfit;
    if (newSettings.stopLoss !== undefined)
      stopLoss.value = newSettings.stopLoss;
  };

  const resetSettings = () => {
    deposit.value = 0;
    leverage.value = 0;
    coefRisk.value = 0;
    takeProfit.value = 0;
    stopLoss.value = 0;
  };

  return {
    openSettings,
    deposit,
    leverage,
    coefRisk,
    takeProfit,
    stopLoss,
    toggleSettings,
    setSettings,
    resetSettings,
  };
}, { persist: true }
);
