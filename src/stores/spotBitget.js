import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";

export const useSpotBitgetStore = defineStore(
  "spotBitget",
  () => {
    // Constants and state variables
    const fee = 0.001; // Transaction fee
    const deposit = ref(5100); // Initial deposit amount
    const coefRisk = ref(0.02); // Risk coefficient of Deposit
    const coefNextBuyOrder = ref(1.2); // Multiplier for the next buy order
    let nextBlockId = 1; // Block ID generator

    const showConfirmDialog = ref(false); // Confirmation dialog visibility
    const confirmMessage = ref(""); // Message in the confirmation dialog
    const pendingAction = ref(null); // Action to execute after confirmation

    // Computed property for the first buy order value
    const firstBuyOrder = computed(() =>
      Number(deposit.value * coefRisk.value).toFixed(2)
    );

    // State for blocks
    const activeBlocks = ref([createNewBlock()]);

    // Utility function to generate unique IDs for blocks
    function generateUniqueId() {
      return nextBlockId++;
    }

    //* ***** Creates a new block with default properties. *****
    //* @returns {Object} New block object.
    function createNewBlock() {
      const id = generateUniqueId();
      const block = reactive({
        id,
        symbol: "",
        start: "",
        end: "",
        orders: [],
        isSaved: false, // Tracks whether the block is saved
        summary: computed(() => calculateBlockSummary(block)), // Block summary
      });
      // Add an initial order to the block
      const initialOrder = createNewOrder(1);
      block.orders.push(initialOrder);
      return block;
    }

    //* ***** Calculates summary statistics for a block. *****
    //* @param {Object} block - The block whose summary is calculated.
    //* @returns {Object} Summary statistics.
    function calculateBlockSummary(block) {
      const totalAmount = block.orders.reduce(
        (sum, order) => sum + (order.amount || 0),
        0
      );
      const totalBuyOrder = block.orders.reduce(
        (sum, order) => sum + (order.buyOrder || 0),
        0
      );
      const totalSellOrder = block.orders.reduce(
        (sum, order) => sum + (order.sellOrder || 0),
        0
      );
      const totalProfit = block.orders.reduce(
        (sum, order) => sum + (order.profit || 0),
        0
      );

      return {
        avgBuyPrice: totalAmount
          ? Number((totalBuyOrder / totalAmount).toFixed(4))
          : 0,
        avgSellPrice: totalAmount
          ? Number((totalSellOrder / totalAmount).toFixed(4))
          : 0,
        totalProfit: Number(totalProfit.toFixed(2)),
        totalBuyOrders: Number(totalBuyOrder.toFixed(2)),
        totalAmount: Number(totalAmount.toFixed(3)),
      };
    }

    //* ***** Calculates the buy order value based on the order ID. *****
    //* @param {number} orderId - The ID of the order.
    //* @returns {number} Calculated buy order value.
    function calculateBuyOrder(orderId) {
      if (orderId === 1) {
        // If ID is 1, return firstBuyOrder
        return +firstBuyOrder.value;
      }
      // Otherwise, calculate buyOrder as a multiplier of firstBuyOrder
      return +
        firstBuyOrder.value * Math.pow(coefNextBuyOrder.value, orderId - 1)
      ;
    }

    //* ***** Recalculates order details based on buy/sell prices and previous order. *****
    //* @param {Object} order - The order to recalculate.
    //* @param {Object} previousOrder - The previous order (if any).
    function recalculateOrder(order) {
      const buyPrice = +order.buyPrice || 1;
      const sellPrice = +order.sellPrice || null;
      const feeRate = 1 + fee;

      order.buyOrder = +(calculateBuyOrder(order.id) * feeRate).toFixed(2);
      order.amount = +(order.buyOrder / buyPrice).toFixed(2);
      order.sellOrder = sellPrice
        ? +(sellPrice * order.amount * (1 - fee)).toFixed(2)
        : 0;
      order.profit = +(order.sellOrder - order.buyOrder).toFixed(2);
    }

    //* ***** Creates a new order with default or calculated properties. *****
    //* @param {Object|null} previousOrder - The previous order (if any).
    //* @returns {Object} New order object.
    function createNewOrder(orderId) {
      const feeRate = 1 + fee;
      return reactive({
        id: orderId,
        buyPrice: null,
        sellPrice: null,
        amount: 0,
        buyOrder: +(calculateBuyOrder(orderId) * feeRate).toFixed(2),
        sellOrder: 0,
        profit: 0,
        isManualBuyOrder: false, // Tracks manual adjustments
      });
    }

    //* ***** Adds a new order to the specified block. *****
    //* @param {Object} block - The block to add an order to.
    function addOrder(block) {
      const nextOrderId = block.orders.length + 1;
      const newOrder = createNewOrder(nextOrderId);
      block.orders.push(newOrder);
    }

    //* ***** Adds a new block to the active blocks list. *****
    function addBlock() {
      const newBlock = createNewBlock();
      activeBlocks.value.unshift(newBlock);
    }

    //* ***** Removes a block after confirmation. *****
    //* @param {number} blockId - The ID of the block to remove.
    function removeBlock(blockId) {
      confirmMessage.value = "Delete this block?";
      pendingAction.value = () => {
        activeBlocks.value = activeBlocks.value.filter(
          (block) => block.id !== blockId
        );
      };
      showConfirmDialog.value = true;
    }

    //* *****Removes an order from a block after confirmation. *****
    //* @param {number} blockId - The ID of the block.
    //* @param {number} orderId - The ID of the order to remove.
    function removeOrder(blockId, orderId) {
      confirmMessage.value = "Delete this order?";
      pendingAction.value = () => {
        const block = activeBlocks.value.find((block) => block.id === blockId);
        if (block) {
          block.orders = block.orders.filter((order) => order.id !== orderId);
        }
      };
      showConfirmDialog.value = true;
    }

    //* ***** Executes the pending action after confirmation. *****
    function confirmAction() {
      if (pendingAction.value) {
        pendingAction.value();
        pendingAction.value = null;
      }
      showConfirmDialog.value = false;
    }

    //* ***** Cancels the pending action. *****
    function cancelAction() {
      showConfirmDialog.value = false;
      pendingAction.value = null;
    }

    const clearBuyPrice = (order) => {
      order.buyPrice = null; // null
    };
    //const restoreDefaultBuyPrice = (order) => {
    //  if (!order.buyPrice) order.buyPrice = 1;
    //};
    const clearSellPrice = (order) => {
      order.sellPrice = null; // null
    };
    //const restoreDefaultSellPrice = (order) => {
    //  if (!order.sellPrice) order.sellPrice = 1;
    //};

    return {
      deposit,
      coefRisk,
      firstBuyOrder,
      coefNextBuyOrder,
      activeBlocks,
      showConfirmDialog,
      confirmMessage,
      addBlock,
      addOrder,
      removeBlock,
      removeOrder,
      confirmAction,
      cancelAction,
      recalculateOrder,
      clearBuyPrice,
      clearSellPrice,
      //restoreDefaultBuyPrice,
      //restoreDefaultSellPrice,
    };
  },
  {
    persist: false,
  }
);
