import { defineStore } from "pinia";
import { ref } from "vue";

export const useMarginStore = defineStore("marginStore", () => {
  // Store an array of order blocks
  const orderBlocks = ref([
    {
      date: null,
      symbol: "",
      buy: null,
      amnt: null,
      tp: null,
      sl: null,
      activeValue: "set",
    },
  ]);
  const buyFee = 0.0002;
  const sellFee = 0.00055;

  const calculateFeeSl = (buy, amnt, sl) => {
    return Number(buy * amnt * buyFee + sl * amnt * sellFee).toFixed(2);
  };
  const calculateFeeTp = (buy, amnt, tp) => {
    return Number(buy * amnt * buyFee + tp * amnt * sellFee).toFixed(2);
  };

  const T_P = (buy, amnt, tp) => {
    const feeTp = calculateFeeTp(buy, amnt, tp); // Use TP for fee here
    return Number((tp - buy) * amnt - feeTp).toFixed(2);
  };

  const S_L = (buy, amnt, sl) => {
    const feeSl = calculateFeeSl(buy, amnt, sl); // Use SL for fee here
    return Number((sl - buy) * amnt - feeSl).toFixed(2);
  };

  const addNewBlock = () => {
    orderBlocks.value.unshift({
      date: null,
      symbol: "",
      buy: null,
      amnt: null,
      tp: null,
      sl: null,
      activeValue: "set",
    });
  };
  const removeBlock = (index) => {
    orderBlocks.value.splice(index, 1);
  };
  return { orderBlocks, T_P, S_L, addNewBlock, removeBlock };
},
  { persist: true }
);
