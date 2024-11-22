import { defineStore } from "pinia";
import { ref } from "vue";

export const useOrderStore = defineStore("orderStore", () => {
  const date = ref(null);
  const symbol = ref('');
  const buy = ref(0);
  const amnt = ref(0);
  const tp = ref(0);
  const sl = ref(0);
  const activeValue = ref("profit");
  const buyFee = 0.0002;
  const sellFee = 0.00055;

  const calculateFeeSl = (buy, amnt, sl) => {
    return Number(buy * amnt * buyFee + sl * amnt * sellFee).toFixed(2);
  };
  const calculateFeeTp = (buy, amnt, tp) => {
    return Number(buy * amnt * buyFee + tp * amnt * sellFee).toFixed(2);
  };

  const TP = (buy, amnt, tp) => {
    const feeTp = calculateFeeTp(buy, amnt, tp); // Use TP for fee here
    return Number((tp - buy) * amnt - feeTp).toFixed(2);
  };

  const SL = (buy, amnt, sl) => {
    const feeSl = calculateFeeSl(buy, amnt, sl); // Use SL for fee here
    return Number((sl - buy) * amnt - feeSl).toFixed(2);
  };

  return { date, symbol, buy, amnt, tp, sl, activeValue, TP, SL };
});
