import { defineStore } from "pinia";
import { ref, computed, watch, reactive } from "vue";

export const useMarginBitgetStore = defineStore(
  "marginBitget",
  () => {
    const buyFee = 0.1;
    const sellFee = 0.1;
    //const orders = ref([]);
    const deposit = ref(236);
    const leverage = ref(10);
    const riskMargin = ref(5);
    const coefNextOrderCost = ref(20);
    const takeProfit = ref(5);
    const stopLoss = ref(2);
    let nextBlockId = 1;

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

    const activeBlocks = ref([createNewBlock()]);
    const activeSymbols = ref([]); // New array to store active symbols

    function generateUniqueId() {
      return nextBlockId++;
    }

    function createNewBlock() {
      const block = reactive({
        id: generateUniqueId(),
        symbol: "",
        date: "",
        orders: [],
        isSaved: false,
        summary: computed(() => {
          const totalProfit =
            block.orders.length > 0
              ? block.orders[block.orders.length - 1].profit
              : 0;
          return totalProfit;
        }),
      });
      const initialOrder = {
        id: 1,
        buyPrice: null,
        amount: null,
        slPrice: null,
        tpPrice: null,
        selectedSwitch: null,
      };
      recalculateOrder(initialOrder, null);
      block.orders.push(initialOrder);

      // Watch the block's symbol and update activeSymbols accordingly
      //block.symbol = "";
      watch(
        () => block.symbol,
        //(newSymbol) => {
        () => {
          updateActiveSymbols(); // Update the symbol list
        }
      );
      return block;
    }

    function updateActiveSymbols() {
      activeSymbols.value = activeBlocks.value
        .filter((block) => block.symbol) // Only include blocks with a defined symbol
        .map((block) => block.symbol); // Map to the list of symbols
    }

    function recalculateOrder(order, previousOrder) {
      // order.profit = +(order.sellOrder - order.buyOrder).toFixed(2);
    }

    function addBlock() {
      const newBlock = createNewBlock();
      activeBlocks.value.unshift(newBlock);
      updateActiveSymbols(); // Update the symbols
    }

    function addOrder(block) {
      if (!block.orders) block.orders = [];
      //const lastOrder = block.orders[block.orders.length - 1];
      const newOrder = {
        id: block.orders.length + 1,
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
        selectedSwitch: "sl",
      };
      // Calculate `sl` and `tp` initially
      newOrder.sl = calculateSl(newOrder);
      newOrder.tp = calculateTp(newOrder);
      //recalculateOrder(newOrder, lastOrder);
      block.orders.push(newOrder);

      // Move the block to the top of the activeBlocks array
      const index = activeBlocks.value.findIndex((b) => b.id === block.id);
      if (index !== -1) {
        const [movedBlock] = activeBlocks.value.splice(index, 1); // Remove the block
        activeBlocks.value.unshift(movedBlock); // Add it to the top
        activeBlocks.value = [...activeBlocks.value]; // Trigger reactivity
      }
    }

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

    // Helper Functions
    const calculateBuyOrder = (block) => {
      if (!block.buyPrice || !block.amount) return 0;
      return (block.buyPrice * block.amount).toFixed(2);
    };

    const calculateAmountMath = (block) => {
      if (!block.buyPrice || block.buyPrice <= 0) return 0;
      const margin = (deposit.value * riskMargin.value) / 100;
      return +((leverage.value * margin) / block.buyPrice).toFixed(
        digits_lote.value
      );
    };

    const calculateSlPriceMath = (block) => {
      if (!block.buyPrice || !block.amount || block.amount <= 0) return null;
      const slCost = (deposit.value * 2) / 100; // Replace 2 with block-specific SL percent if needed
      return (
        ((slCost - block.buyPrice * block.amount) * -1) /
        block.amount
      ).toFixed(digits.value);
    };

    const calculateTpPriceMath = (block) => {
      if (!block.buyPrice || !block.amount || block.amount <= 0) return null;
      const tpCost = (deposit.value * 5) / 100; // Replace 5 with block-specific TP percent if needed
      return ((tpCost + block.buyPrice * block.amount) / block.amount).toFixed(
        digits.value
      );
    };

    const calculateSl = (block) => {
      const slPrice = parseFloat(block.slPrice);
      if (!slPrice || !block.buyPrice || !block.amount) return null;
      const buyOrder = calculateBuyOrder(block);
      const feeBuy = (buyOrder * buyFee) / 100;
      const feeSL = (slPrice * block.amount * sellFee) / 100;
      return (
        (slPrice - block.buyPrice) * block.amount -
        feeBuy -
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

    const totalActiveTpAndSl = computed(() => {
      return activeBlocks.value
        .reduce((total, block) => {
          return (
            total +
            block.orders.reduce((orderTotal, order) => {
              if (order.selectedSwitch === "tp" && order.tp) {
                orderTotal += parseFloat(order.tp) || 0;
              } else if (order.selectedSwitch === "sl" && order.sl) {
                orderTotal += parseFloat(order.sl) || 0;
              }
              return orderTotal;
            }, 0)
          );
        }, 0)
        .toFixed(2); // Format to 2 decimal places
    });

    const removeBlock = (blockId) => {
      activeBlocks.value = activeBlocks.value.filter(
        (block) => block.id !== blockId
      );
      updateActiveSymbols(); // Update the symbols
    };
    // Function to remove an order by ID
    const removeOrder = (block, orderId) => {
      const index = block.orders.findIndex((order) => order.id === orderId);
      if (index !== -1) {
        block.orders.splice(index, 1); // Remove the order at the specified index
      }
    };

    const sortedSymbols = computed(() => {
      return [...activeSymbols.value].sort((a, b) => a.localeCompare(b));
    });
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
      activeBlocks,
      activeSymbols, // Expose the symbols
      sortedSymbols, // Expose the sorted symbols
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
      totalActiveTpAndSl,
    };
  },
  { persist: true }
);
