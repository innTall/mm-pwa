import { defineStore } from "pinia";
import { ref, reactive, watch } from "vue";

export const useSpotBinanceStore = defineStore("spotBinance", () => {
  const fee = 0.001;
  const deposit = ref(468);
  const riskTrade = ref(0.02);
  const coefNextBuyOrder = ref(1.2);

  const defaultBlock = () => {
    const firstOrder = {
      buyPrice: 1,
      sellPrice: null,
      amount: null,
      buyOrder: null,
      sellOrder: null,
      profit: null,
    };
    // Watch the first order's values immediately
    watchOrderValues(firstOrder);
    return {
      nr: 1,
      symbol: "",
      start: null,
      fin: null,
      orders: ref([firstOrder]),
    };
  };
  const orderBlocks = ref([defaultBlock()]);

  const addOrderBlock = () => {
    orderBlocks.value.push({
      ...defaultBlock(),
      nr: orderBlocks.value.length + 1,
    });
  };

  const removeOrderBlock = (index) => {
    orderBlocks.value.splice(index, 1);
    // Update numbering
    orderBlocks.value.forEach((block, idx) => (block.nr = idx + 1));
  };

  const addOrderToBlock = (block) => {
    const previousOrder = block.orders[block.orders.length - 1];
    const newBuyOrder = previousOrder
      ? (parseFloat(previousOrder.buyOrder) * coefNextBuyOrder.value).toFixed(2)
      : (deposit.value * riskTrade.value).toFixed(2);

    const newOrder = {
      buyPrice: 1,
      sellPrice: null,
      amount: null,
      buyOrder: newBuyOrder,
      sellOrder: null,
      profit: null,
    };
    watchOrderValues(newOrder);
    block.orders.push(newOrder);
    // block.orders = [...block.orders, newOrder];
  };

  const removeOrder = (blockIndex, orderIndex) => {
    const block = orderBlocks.value[blockIndex];
    if (block && block.orders.length > orderIndex) {
      block.orders.splice(orderIndex, 1);
    }
  };

  function updateOrderValues(order) {
    if (!order.buyPrice) {
      order.amount = null;
      order.buyOrder = null;
      order.sellOrder = null;
      order.profit = null;
      return;
    }

    const calculateDigits = (priceValue) => {
      if (priceValue >= 10000) return 1;
      if (priceValue >= 1000) return 2;
      if (priceValue >= 100) return 2;
      if (priceValue >= 10) return 3;
      if (priceValue >= 1) return 3;
      if (priceValue >= 0.1) return 4;
      return 5;
    };

    const calculateDigitsLote = (digitsPrice) => {
      if (digitsPrice === 1) return 3;
      if (digitsPrice === 2) return 2;
      if (digitsPrice === 3) return 1;
      if (digitsPrice >= 4) return 0;
    };

    const digits = calculateDigits(order.buyPrice);
    const digitsLote = calculateDigitsLote(digits);
    const buyOrder = (deposit.value * riskTrade.value * (1 + fee)).toFixed(2);
    const amount = (buyOrder / order.buyPrice).toFixed(digitsLote);
    const profit = ((order.sellPrice - order.buyPrice) * amount).toFixed(2);
    const sellOrder = (amount * order.sellPrice * (1 - fee)).toFixed(2);

    order.amount = amount;
    order.buyOrder = buyOrder;
    order.sellOrder = sellOrder;
    order.profit = profit;
  };

  function watchOrderValues(order) {
    watch(
      () => [order.buyPrice],
      () => {
        updateOrderValues(order);
      },
      { deep: true, immediate: true }
    );
  }

  const clearBuyPrice = (order) => {
    if (order.buyPrice === 1) order.buyPrice = null;
  };

  const restoreDefaultBuyPrice = (order) => {
    if (!order.buyPrice) order.buyPrice = 1;
  };

  return {
    orderBlocks,
    deposit,
    riskTrade,
    coefNextBuyOrder,
    addOrderBlock,
    removeOrderBlock,
    addOrderToBlock,
    removeOrder,
    updateOrderValues,
    clearBuyPrice,
    restoreDefaultBuyPrice,
  };
},
  { persist: false },
);
