import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useDepoBybitStore = defineStore(
  "depoBybit",
  () => {
    const blocks = ref([
      {
        date: null,
        deposit: null,
        wallet: null,
        ordersSpot: null,
        profitSpot: null,
        ordersMargin: null,
        profitMargin: null,
        isActive: true, // Determines if fields are editable
      },
    ]);

    const balances = computed(() =>
      blocks.value.map((block) => {
        if (
          block.deposit !== null &&
          block.wallet !== null &&
          block.ordersSpot !== null &&
          block.profitSpot !== null &&
          block.ordersMargin !== null &&
          block.profitMargin !== null
        ) {
          return (
            block.deposit +
            block.wallet +
            block.ordersSpot +
            block.profitSpot +
            block.ordersMargin +
            block.profitMargin
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
        ordersSpot: null,
        profitSpot: null,
        ordersMargin: null,
        profitMargin: null,
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

    return { blocks, balances, lastBalance, updateLastBalance, addBlock, deactivateBlock };
  },
  { persist: false }
);
