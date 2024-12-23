import { defineStore } from "pinia";
import { ref } from "vue";

export const useMarginSettingsStore = defineStore("marginSettings", () => {
  const openSettings = ref(false);
  const deposit = ref(270);
  const leverage = ref(10);
  const coefRisk = ref(1);
  const takeProfit = ref(0.5);
  const stopLoss = ref(0.1);
  const offlineMode = ref(0);

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
    if (newSettings.offlineMode !== undefined)
      offlineMode.value = newSettings.offlineMode;
  };

  const resetSettings = () => {
    deposit.value = 0;
    leverage.value = 0;
    coefRisk.value = 0;
    takeProfit.value = 0;
    stopLoss.value = 0;
    offlineMode.value = 0;
  };

  return {
    openSettings,
    deposit,
    leverage,
    coefRisk,
    takeProfit,
    stopLoss,
    offlineMode,
    toggleSettings,
    setSettings,
    resetSettings,
  };
}, { persist: true }
);
