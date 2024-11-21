import { defineStore } from "pinia";
import { ref, computed, watchEffect } from "vue";

export const useGridStore = defineStore(
  "gridStore",
  () => {
    const numOfOrder = ref(0);
    const coefNextOrderCost = ref(0);
    const firstOrderCost = ref(0);
    const priceRound = ref();
    const amountRound = ref();

    watchEffect(numOfOrder, coefNextOrderCost, firstOrderCost);
    
    const gridCost = computed(() => {
      let cost = firstOrderCost.value;
      for (let i = 2; i <= numOfOrder.value; i++) {
        cost += firstOrderCost.value * coefNextOrderCost.value ** (i - 1);
      }
      return cost.toFixed(2);
    });
    return {
      numOfOrder,
      coefNextOrderCost,
      firstOrderCost,
      priceRound,
      amountRound,
      gridCost,
    };
  },
  {
    persist: true,
  }
);
