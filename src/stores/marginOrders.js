import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useMarginSettingsStore } from "@/stores/marginSettings.js";
import { useMarginOptionsStore } from "@/stores/marginOptions.js";

export const useMarginOrdersStore = defineStore("marginOrders", () => {
  const { leverage } = storeToRefs(useMarginSettingsStore());
  const { margin, tpCost, slCost } = storeToRefs(useMarginOptionsStore());

  const buyFee = 0.02;
  const sellFee = 0.055;

  //* ----- Calculation Methods -----
  function calculateBuyOrder(order) {
    if (!order.buyPrice || !order.amount) return 0;
    return (order.buyPrice * order.amount).toFixed(2);
  }

  function calculateSl(order, marginSettings, marginOptions) {
    const slPrice = parseFloat(order.slPrice);
    if (!slPrice || !order.buyPrice || !order.amount) return 0;
    const buyOrder = calculateBuyOrder(order);
    const feeBuy = (buyOrder * buyFee) / 100;
    const feeSL = (slPrice * order.amount * sellFee) / 100;
    return ((slPrice - order.buyPrice) * order.amount - feeBuy - feeSL).toFixed(
      2
    );
  }

  function calculateTp(order, marginSettings, marginOptions) {
    const tpPrice = parseFloat(order.tpPrice);
    if (!tpPrice || !order.buyPrice || !order.amount) return 0;
    const buyOrder = calculateBuyOrder(order);
    const feeBuy = (buyOrder * buyFee) / 100;
    const feeTP = (tpPrice * order.amount * sellFee) / 100;
    return ((tpPrice - order.buyPrice) * order.amount - feeBuy - feeTP).toFixed(
      2
    );
  }

  //* ----- Number Precision for Price Calculations -----
  function calculateDigits(price) {
    if (price >= 10000) return 0;
    if (price >= 1000) return 1;
    if (price >= 100) return 2;
    if (price >= 10) return 2;
    if (price >= 1) return 3;
    if (price >= 0.1) return 4;
    return 5;
  }

  function calculateDigitsLote(digits) {
    if (digits === 0) return 4;
    if (digits === 1) return 3;
    if (digits === 2) return 2;
    if (digits === 3) return 1;
    if (digits >= 4) return 0;
  }
  const digits = computed(() => calculateDigits(buyPrice.value || 0));
  const digitsLote = computed(() => calculateDigitsLote(digits.value));

  //* ----- Helper Functions -----
  const infoAmount = (block) => {
    if (!block.buyPrice || block.buyPrice <= 0) return 0;
    return +((leverage.value * margin.value) / block.buyPrice).toFixed(
      digitsLote.value
    );
  };

  const infoSlPrice = (block) => {
    if (!block.buyPrice || !block.amount || block.amount <= 0) return null;
    return +(
      ((slCost.value - block.buyPrice * block.amount) * -1) /
      block.amount
    ).toFixed(digits.value);
  };

  const infoTpPrice = (block) => {
    if (!block.buyPrice || !block.amount || block.amount <= 0) return null;
    return +(
      (tpCost.value + block.buyPrice * block.amount) /
      block.amount
    ).toFixed(digits.value);
  };

  // Helper function to determine the color class for SL/TP
  const getColorClass = (block, type) => {
    return block.selectedSwitch === type
      ? type === "sl"
        ? "text-red-500"
        : "text-green-500"
      : "text-white";
  };
  return {
    calculateBuyOrder,
    calculateSl,
    calculateTp,
    infoAmount,
    infoSlPrice,
    infoTpPrice,
    getColorClass,
  };
});
