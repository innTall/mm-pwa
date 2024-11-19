import { defineStore } from "pinia";
import { computed, reactive, watch } from "vue";

export const useOrderStore = defineStore(
  "orderStore",
	() => {
		const storedData = JSON.parse(localStorage.getItem("order-data")) || [];
    const blocks = reactive(
      storedData.length
        ? storedData
        : [
            {
              date: null,
              symbol: "",
              buy: 0,
              amnt: 0,
              tp: 0,
              sl: 0,
              activeValue: "profit", // Default to 'profit'
            },
          ]
		);
		watch(
      () => blocks,
      (newBlocks) => {
        localStorage.setItem("order-data", JSON.stringify(newBlocks));
      },
      { deep: true }
    );

    const buyFee = 0.0002;
    const sellFee = 0.00055;

    const calculateFeeSl = (buy, amnt, sl) => {
      return Number(buy * amnt * buyFee + sl * amnt * sellFee).toFixed(2);
    };
    const calculateFeeTp = (buy, amnt, tp) => {
      return Number(buy * amnt * buyFee + tp * amnt * sellFee).toFixed(2);
    };

    const calculateProfit = (buy, amnt, tp) => {
      const feeTp = calculateFeeTp(buy, amnt, tp); // Use TP for fee here
      return Number((tp - buy) * amnt - feeTp).toFixed(2);
    };

    const calculateLoss = (buy, amnt, sl) => {
      const feeSl = calculateFeeSl(buy, amnt, sl); // Use SL for fee here
      return Number((sl - buy) * amnt - feeSl).toFixed(2);
    };

    const totalSum = computed(() => {
      return blocks.reduce((sum, block) => {
        const isProfit = block.activeValue === "profit";
        const value = isProfit
          ? calculateProfit(block.buy, block.amnt, block.tp)
          : calculateLoss(block.buy, block.amnt, block.sl);
        return sum + Number(value);
      }, 0);
    });

    const addBlock = () => {
      blocks.push({
        date: null,
        symbol: "",
        buy: 0,
        amnt: 0,
        tp: 0,
        sl: 0,
        activeValue: "profit",
      });
    };

    const isBlockComplete = (block) => {
      return (
        block.date &&
        block.symbol &&
        block.buy > 0 &&
        block.amnt > 0 &&
        block.tp > 0 &&
        block.sl > 0
      );
    };

    return {
      blocks,
      addBlock,
      isBlockComplete,
      calculateFeeTp,
      calculateFeeSl,
      calculateProfit,
      calculateLoss,
      totalSum,
    };
  },
  {
    persist: {
      key: "order-data",
      storage: window.localStorage,
    },
  }
);
