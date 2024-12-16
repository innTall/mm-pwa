import { defineStore } from "pinia";
import { ref, computed, watch, reactive } from "vue";

export const useMarginBybitStore = defineStore(
  "marginBybit",
  () => {
    //* ----- Constants -----
    const buyFee = 0.02;
    const sellFee = 0.055;
    let nextBlockId = 1;

    //* ----- Reactive State -----
    const deposit = ref(239);
    const leverage = ref(10);
    const coefRisk = ref(5);
    const coefCost = ref(20);
    const takeProfit = ref(5);
    const stopLoss = ref(2);
    const buyPrice = ref(null);

    const activeBlocks = ref([createNewBlock()]); // List of active blocks
    const activeSymbols = ref([]); // Tracks active symbols

    //* ----- Computed Properties -----
    const margin = computed(() =>
      ((deposit.value * coefRisk.value) / 100).toFixed(2)
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

    //* ----- Calculate Total TP/SL Across all Active Blocks -----
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
        .toFixed(2);
    });

    //* ----- Alphabetically Sorted List of Active Symbols -----
    const sortedSymbols = computed(() => {
      return [...activeSymbols.value].sort((a, b) => a.localeCompare(b));
    });

    //* ----- Helper Functions -----
    function generateUniqueId() {
      return nextBlockId++;
    }

    //* ----- Updates the List of Active Symbols -----
    function updateActiveSymbols() {
      activeSymbols.value = activeBlocks.value
        .filter((block) => block.symbol) // Only include blocks with a defined symbol
        .map((block) => block.symbol);
    }

    //* ----- Core Methods -----
    function createNewBlock() {
      // Creates a new reactive block with default values
      const block = reactive({
        id: generateUniqueId(),
        symbol: "",
        date: "",
        orders: [],
        isSaved: false,
        totalActiveTpAndSl: computed(() => {
          // Calculate total TP/SL for the block
          return block.orders
            .reduce((total, order) => {
              if (order.selectedSwitch === "tp" && order.tp) {
                total += parseFloat(order.tp) || 0;
              } else if (order.selectedSwitch === "sl" && order.sl) {
                total += parseFloat(order.sl) || 0;
              }
              return total;
            }, 0)
            .toFixed(2);
        }),
      });
      // Add an initial order to the block
      const initialOrder = {
        id: 1,
        buyPrice: buyPrice.value,
        amount: null,
        slPrice: null,
        tpPrice: null,
        selectedSwitch: null,
      };
      block.orders.push(initialOrder);
      // Watch for symbol changes in the block
      watch(
        () => block.symbol,
        () => {
          updateActiveSymbols();
        }
      );
      return block;
    }

    //* ----- Adds a New Block and Updates the Symbols -----
    function addBlock() {
      const newBlock = createNewBlock();
      activeBlocks.value.unshift(newBlock);
      updateActiveSymbols();
    }

    //* ----- Removes a Block by ID -----
    function removeBlock(blockId) {
      activeBlocks.value = activeBlocks.value.filter(
        (block) => block.id !== blockId
      );
      updateActiveSymbols();
    }

    //* ----- Adds a new order to the specified block -----
    function addOrder(block) {
      const newOrder = {
        id: block.orders.length + 1,
        buyPrice: buyPrice.value,
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
      block.orders.push(newOrder);
      // Move block to the top of the list
      const index = activeBlocks.value.findIndex((b) => b.id === block.id);
      if (index !== -1) {
        const [movedBlock] = activeBlocks.value.splice(index, 1);
        activeBlocks.value.unshift(movedBlock);
      }
    }

    //* ----- Removes an Order by ID from the Specified Block -----
    function removeOrder(block, orderId) {
      const index = block.orders.findIndex((order) => order.id === orderId);
      if (index !== -1) {
        block.orders.splice(index, 1);
      }
    }

    //* ----- Calculation Methods -----
    function calculateBuyOrder(block) {
      if (!block.buyPrice || !block.amount) return 0;
      return (block.buyPrice * block.amount).toFixed(2);
    }

    function calculateSl(block) {
      const slPrice = parseFloat(block.slPrice);
      if (!slPrice || !block.buyPrice || !block.amount) return 0;
      const buyOrder = calculateBuyOrder(block);
      const feeBuy = (buyOrder * buyFee) / 100;
      const feeSL = (slPrice * block.amount * sellFee) / 100;
      return (
        (slPrice - block.buyPrice) * block.amount -
        feeBuy -
        feeSL
      ).toFixed(2);
    }

    function calculateTp(block) {
      const tpPrice = parseFloat(block.tpPrice);
      if (!tpPrice || !block.buyPrice || !block.amount) return 0;
      const buyOrder = calculateBuyOrder(block);
      const feeBuy = (buyOrder * buyFee) / 100;
      const feeTP = (tpPrice * block.amount * sellFee) / 100;
      return (
        (tpPrice - block.buyPrice) * block.amount -
        feeBuy -
        feeTP
      ).toFixed(2);
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

    //* ----- Helper Functions -----
    const infoAmount = (block) => {
      if (!block.buyPrice || block.buyPrice <= 0) return 0;
      const digits = calculateDigits(block.buyPrice);
      const digitsLote = calculateDigitsLote(digits);
      const margin = (deposit.value * coefRisk.value) / 100;
      return +((leverage.value * margin) / block.buyPrice).toFixed(digitsLote);
    };

    const infoSlPrice = (block) => {
      if (!block.buyPrice || !block.amount || block.amount <= 0) return null;
      const digits = calculateDigits(block.buyPrice);
      const slCost = (deposit.value * stopLoss.value) / 100;
      return +(
        ((slCost - block.buyPrice * block.amount) * -1) /
        block.amount
      ).toFixed(digits);
    };

    const infoTpPrice = (block) => {
      if (!block.buyPrice || !block.amount || block.amount <= 0) return null;
      const digits = calculateDigits(block.buyPrice);
      const tpCost = (deposit.value * takeProfit.value) / 100;
      return +((tpCost + block.buyPrice * block.amount) / block.amount).toFixed(
        digits
      );
    };
    return {
      deposit,
      leverage,
      coefRisk,
      coefCost,
      takeProfit,
      stopLoss,
      activeBlocks,
      activeSymbols,
      sortedSymbols,
      totalActiveTpAndSl,
      margin,
      tpCost,
      slCost,
      buyOrderMath,
      addBlock,
      removeBlock,
      addOrder,
      removeOrder,
      calculateBuyOrder,
      calculateSl,
      calculateTp,
      infoAmount,
      infoSlPrice,
      infoTpPrice,
    };
  },
  { persist: true }
);
