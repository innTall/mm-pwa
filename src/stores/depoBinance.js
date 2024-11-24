import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useDepoBinanceStore = defineStore(
  "depoBinance",
  () => {
    const blocks = ref([
      {
        date: null,
        deposit: null,
        wallet: null,
        orders: null,
        profit: null,
        isActive: true, // Determines if fields are editable
      },
    ]);

    const balances = computed(() =>
      blocks.value.map((block) => {
        if (
          block.deposit !== null &&
          block.wallet !== null &&
          block.orders !== null &&
          block.profit !== null
        ) {
          return (
            block.deposit +
            block.wallet +
            block.orders +
            block.profit
          ).toFixed(2);
        }
        return "0.00";
      })
    );

    const addBlock = () => {
      blocks.value.unshift({
        date: null,
        deposit: null,
        wallet: null,
        orders: null,
        profit: null,
        isActive: true,
      });
    };

    const deactivateBlock = (index) => {
      blocks.value[index].isActive = false;
    };

    const lastBalance = ref(null); // Stores the last calculated balance
    const updateLastBalance = () => {
      if (balances.value.length > 0) {
        lastBalance.value = balances.value[balances.value.length - 1];
      }
    };
    return {
      blocks,
      lastBalance,
      updateLastBalance,
      balances,
      addBlock,
      deactivateBlock,
    };
  },
  { persist: true }
);
