import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useBybitStore = defineStore("bybitStore", () => {
  
  const date = ref(null);
  const symbol = ref("");
  const buy = ref(null);
  const amnt = ref(null);
  const sell = ref(null);
  const activeMetric = ref("roi");
  
  const buyFee = 0.0001;
  const sellFee = 0.0001;
  
  const cost = computed(() => {
    return Number(
      buy.value * amnt.value + buy.value * amnt.value * buyFee
    ).toFixed(2);
  });
  const roi = computed(() => {
    return Number((sell.value / buy.value - 1) * 100).toFixed(2);
  });
  const tp = computed(() => {
    return Number(
      (sell.value - buy.value) * amnt.value - sell.value * amnt.value * sellFee
    ).toFixed(2);
  });
  return { date, symbol, buy, amnt, sell, cost, roi, tp, activeMetric };
});
