import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";

export const useMarginBinanceStore = defineStore(
  "marginBinance",
  () => {
    const buyFee = 0.02;
    const sellFee = 0.055;
    const orders = reactive([]);
    const deposit = ref(236);
    const leverage = ref(10);
    const riskMargin = ref(5);
    const coefNextOrderCost = ref(20);
    const takeProfit = ref(5);
    const stopLoss = ref(2);

    // Function to add a new order
    const addOrder = () => {
      const newOrder = {
        id: Date.now(), // Unique ID
        symbol: "",
        open: null,
        close: null,
        nr: orders.length + 1,
        buyPrice: null,
        amount: null,
        buyOrder: null,
        amountMath: null,
        slPrice: null,
        sl: null,
        slPriceMath: null,
        tpPrice: null,
        tp: null,
        tpPriceMath: null,
        selectedSwitch: null, // "sl" or "tp"
      };
      orders.push(newOrder);
    };
    //const symbol = ref("");
    //const open = ref(null);
    //const close = ref(null);
    //const nr = ref(1);
    //const buyPrice = ref(null);
    //const amount = ref(null);
    //const tpPrice = ref(null);
    //const slPrice = ref(null);
    //const selectedSwitch = ref(null); // "tp" or "sl"

    // Computed properties
    const margin = computed(() =>
      ((deposit.value * riskMargin.value) / 100).toFixed(2)
    );
    const tpCost = computed(() =>
      ((deposit.value * takeProfit.value) / 100).toFixed(2)
    );
    const slCost = computed(() =>
      ((deposit.value * stopLoss.value) / 100).toFixed(2)
    );
    const buyOrderMath = computed(() =>
      (leverage.value * margin.value).toFixed(2)
    );
    //const buyOrder = computed(() => (buyPrice.value * amount.value).toFixed(2));

    const buyOrder = computed(() =>
      orderBlocks.value
        .reduce((total, block) => {
          if (block.buyPrice && block.amount) {
            return total + block.buyPrice * block.amount;
          }
          return total;
        }, 0)
        .toFixed(2)
    );

    const digits = computed(() => {
      const priceValue = buyPrice.value;
      if (priceValue >= 10000) return 1;
      if (priceValue >= 1000) return 2;
      if (priceValue >= 100) return 2;
      if (priceValue >= 10) return 3;
      if (priceValue >= 1) return 3;
      if (priceValue >= 0.1) return 4;
      return 5;
    });

    const digits_lote = computed(() => {
      const digitsPrice = digits.value;
      if (digitsPrice === 1) return 3;
      if (digitsPrice === 2) return 2;
      if (digitsPrice === 3) return 1;
      if (digitsPrice >= 4) return 0;
    });

    const amountMath = computed(() => {
      if (!buyPrice.value || buyPrice.value <= 0) return 0;
      return +((leverage.value * margin.value) / buyPrice.value).toFixed(
        digits_lote.value
      );
    });

    const slPriceMath = computed(() => {
      return orderBlocks.value.map((block) => {
        if (!block.buyPrice || !block.amount || block.amount <= 0) return null;
        const slCost = (deposit.value * stopLoss.value) / 100;
        return (
          ((slCost - block.buyPrice * block.amount) * -1) /
          block.amount
        ).toFixed(2);
      });
    });

    const tpPriceMath = computed(() => {
      return orderBlocks.value.map((block) => {
        if (!block.buyPrice || !block.amount || block.amount <= 0) return null;
        const tpCost = (deposit.value * takeProfit.value) / 100;
        return (
          (tpCost + block.buyPrice * block.amount) /
          block.amount
        ).toFixed(2);
      });
    });

    /*
  const slPriceMath = computed(() => {
    const buy = parseFloat(buyPrice.value);
    const amt = parseFloat(block.amount);
    const slCostVal = parseFloat(slCost.value);
    if (!buy || !amt || amt <= 0) return null;
    return (((slCostVal - buy * amt) * -1) / amt).toFixed(digits.value);
  });

  const tpPriceMath = computed(() => {
    const buy = parseFloat(buyPrice.value);
    const amt = parseFloat(block.amount);
    const tpCostVal = parseFloat(tpCost.value);
    if (!buy || !amt || amt <= 0) return null;
    return ((tpCostVal + buy * amt) / amt).toFixed(digits.value);
  });
  */

    const feeBuy = computed(() => (buyOrder * buyFee) / 100);
    const feeTP = computed(
      () => (tpPrice.value * amount.value * sellFee) / 100
    );
    const feeSL = computed(
      () => (slPrice.value * amount.value * sellFee) / 100
    );

    const sl = computed(() => {
      const buy = parseFloat(buyPrice.value);
      const slP = parseFloat(slPrice.value);
      const amt = parseFloat(amount.value);
      const feeB = parseFloat(feeBuy.value || 0);
      const feeS = parseFloat(feeSL.value || 0);
      if (isNaN(buy) || isNaN(slP) || isNaN(amt)) return null;
      return ((buy - slP) * amt + feeB + feeS).toFixed(2);
    });

    const tp = computed(() => {
      const buy = parseFloat(buyPrice.value);
      const tpP = parseFloat(tpPrice.value);
      const amt = parseFloat(amount.value);
      const feeB = parseFloat(feeBuy.value || 0);
      const feeT = parseFloat(feeTP.value || 0);
      if (isNaN(buy) || isNaN(tpP) || isNaN(amt)) return null;
      return ((tpP - buy) * amt - feeB - feeT).toFixed(2);
    });

    // Add dynamic blocks state
    const orderBlocks = ref([
      {
        id: 1, // Unique identifier
        symbol: "",
        open: null,
        close: null,
        buyPrice: null,
        amount: null,
        slPrice: null,
        tpPrice: null,
        selectedSwitch: true,
      },
    ]);

    // Methods to add and remove blocks
    const addBlock = () => {
      const newBlock = {
        id: orderBlocks.value.length + 1,
        symbol: "",
        open: null,
        close: null,
        buyPrice: null,
        amount: null,
        slPrice: null,
        tpPrice: null,
        selectedSwitch: true,
      };
      orderBlocks.value.unshift(newBlock);
    };

    const removeBlock = (id) => {
      orderBlocks.value = orderBlocks.value.filter((block) => block.id !== id);
    };

    // Function to remove an order by ID
    const removeOrder = (id) => {
      const index = orders.findIndex((order) => order.id === id);
      if (index !== -1) {
        orders.splice(index, 1); // Remove the order at the specified index
      }
    };

    // Helper Functions
    const calculateBuyOrder = (block) => {
      if (!block.buyPrice || !block.amount) return 0;
      return (block.buyPrice * block.amount).toFixed(2);
    };

    const calculateAmountMath = (block) => {
      if (!block.buyPrice || block.buyPrice <= 0) return 0;
      const margin = (deposit.value * riskMargin.value) / 100;
      return +((leverage.value * margin) / block.buyPrice).toFixed(2);
    };
    /*
    const calculateBuyOrderMath = (block) => {
      if (!margin || !leverage.value) return 0;
      return (margin * leverage.value).toFixed(2);
    };
*/
    const calculateSlPriceMath = (block) => {
      if (!block.buyPrice || !block.amount || block.amount <= 0) return null;
      const slCost = (deposit.value * 2) / 100; // Replace 2 with block-specific SL percent if needed
      return (
        ((slCost - block.buyPrice * block.amount) * -1) /
        block.amount
      ).toFixed(2);
    };

    const calculateTpPriceMath = (block) => {
      if (!block.buyPrice || !block.amount || block.amount <= 0) return null;
      const tpCost = (deposit.value * 5) / 100; // Replace 5 with block-specific TP percent if needed
      return ((tpCost + block.buyPrice * block.amount) / block.amount).toFixed(
        2
      );
    };

    const calculateSl = (block) => {
      const slPrice = parseFloat(block.slPrice);
      if (!slPrice || !block.buyPrice || !block.amount) return null;
      const buyOrder = calculateBuyOrder(block);
      const feeBuy = (buyOrder * buyFee) / 100;
      const feeSL = (slPrice * block.amount * sellFee) / 100;
      return (
        (block.buyPrice - slPrice) * block.amount +
        feeBuy +
        feeSL
      ).toFixed(2);
    };

    const calculateTp = (block) => {
      const tpPrice = parseFloat(block.tpPrice);
      if (!tpPrice || !block.buyPrice || !block.amount) return null;
      const buyOrder = calculateBuyOrder(block);
      const feeBuy = (buyOrder * buyFee) / 100;
      const feeTP = (tpPrice * block.amount * sellFee) / 100;
      return (
        (tpPrice - block.buyPrice) * block.amount -
        feeBuy -
        feeTP
      ).toFixed(2);
    };
    return {
      deposit,
      leverage,
      riskMargin,
      margin,
      tpCost,
      slCost,
      buyOrderMath,
      coefNextOrderCost,
      takeProfit,
      stopLoss,
      orderBlocks,
      addBlock,
      removeBlock,
      calculateBuyOrder,
      calculateAmountMath,
      calculateSlPriceMath,
      calculateTpPriceMath,
      calculateSl,
      calculateTp,
      addOrder,
      removeOrder,
    };
  },
  { persist: false }
);
