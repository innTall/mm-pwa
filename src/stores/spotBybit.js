import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";

export const useSpotBybitStore = defineStore("spotBybit", () => {
  // Constants and state variables
  const fee = 0.001; // Transaction fee percentage
  const deposit = ref(239); // Initial deposit amount
  const coefRisk = ref(0.02); // Risk coefficient for the first order
  const coefNextBuyOrder = ref(1.2); // Multiplier for the next order cost
  let nextBlockId = 1; // Unique block ID generator

  // Computed property for the cost of the first order
  const firstBuyOrder = computed(
    () => +(deposit.value * coefRisk.value).toFixed(2)
  );

  // Active blocks list
  const activeBlocks = ref([createNewBlock()]);

  //* ***** Generates a unique ID for a block. *****
  //* @returns {number} Unique block ID
  function generateUniqueId() {
    return nextBlockId++;
  }

  //* ***** Creates a new block with default properties and an initial order. *****
  //* @returns {Object} A new block object
  function createNewBlock() {
    const id = generateUniqueId();
    const block = reactive({
      id,
      symbol: "", // Symbol for the trading pair
      start: "", // Block start time
      end: "", // Block end time
      orders: [], // List of orders in the block
      isSaved: false, // Indicates whether the block is saved
      summary: computed(() => calculateBlockSummary(block)), // Summary of the block's orders
    });
    // Add an initial order to the block
    const initialOrder = createOrder(firstBuyOrder.value, 1.2345, 1.456, null);
    block.orders.push(initialOrder);
    return block;
  }

	//* ***** Calculates the summary of a block. *****
  //* @param {Object} block - The block whose summary is calculated.
  //* @returns {Object} Block summary with calculated totals and averages.
  function calculateBlockSummary(block) {
    const totalAmount = block.orders.reduce(
      (sum, order) => sum + order.amount,
      0
    );
    const totalBuyOrder = block.orders.reduce(
      (sum, order) => sum + order.buyOrder,
      0
    );
    const totalSellOrder = block.orders.reduce(
      (sum, order) => sum + order.sellOrder,
      0
    );
    const totalProfit = block.orders.length
      ? block.orders[block.orders.length - 1].profit
      : 0;

    return {
      avgBuyPrice: totalAmount
        ? +(totalBuyOrder / totalAmount).toFixed(4)
        : 0,
      avgSellPrice: totalAmount
        ? +(totalSellOrder / totalAmount).toFixed(4)
        : 0,
      totalProfit: +totalProfit.toFixed(2),
      totalBuyOrders: +totalBuyOrder.toFixed(2),
      totalAmount: +totalAmount.toFixed(2),
    };
  }

	//* ***** Creates a new order with specified properties and recalculates derived values. *****
  //* @param {number} buyOrder - Buy order amount.
  //* @param {number} buyPrice - Buy price per token.
  //* @param {number} sellPrice - Sell price per token.
  //* @param {Object|null} previousOrder - The previous order for calculating defaults.
  //* @returns {Object} A new order object.
  function createOrder(buyOrder, buyPrice, sellPrice, previousOrder) {
    const order = reactive({
      id: previousOrder ? previousOrder.id + 1 : 1,
      buyPrice,
      sellPrice,
      amount: 0,
      buyOrder: buyOrder || 0,
      sellOrder: 0,
      profit: 0,
    });
    recalculateOrder(order, previousOrder);
    return order;
  }

	//* ***** Recalculates derived values for an order based on its properties. *****
  //* @param {Object} order - The order to recalculate.
  //* @param {Object|null} previousOrder - The previous order for deriving buy order.
  function recalculateOrder(order, previousOrder) {
    order.buyOrder = previousOrder
      ? +(previousOrder.buyOrder * coefNextBuyOrder.value).toFixed(2)
      : +firstBuyOrder.value.toFixed(2);

    order.amount = +(order.buyOrder / order.buyPrice).toFixed(4);
    order.sellOrder = +(order.sellPrice * order.amount * (1 - fee)).toFixed(2);
    order.profit = +(order.sellOrder - order.buyOrder).toFixed(2);
  }

	//* ***** Adds a new block to the list of active blocks. *****
  function addBlock() {
    activeBlocks.value.unshift(createNewBlock());
  }

  //* ***** Adds a new order to the specified block. *****
  //* @param {Object} block - The block to add the order to.
  function addOrder(block) {
    const lastOrder = block.orders[block.orders.length - 1];
    const nextBuyPrice = +(lastOrder.buyPrice - 0.1).toFixed(4);
    const newOrder = createOrder(
      0,
      nextBuyPrice,
      +(nextBuyPrice + 0.2).toFixed(4),
      lastOrder
    );
    block.orders.push(newOrder);
  }

	//* ***** Removes a block by its ID. *****
  //* @param {number} blockId - The ID of the block to remove.
  function removeBlock(blockId) {
    activeBlocks.value = activeBlocks.value.filter(
      (block) => block.id !== blockId
    );
  }

  return {
    deposit,
    coefRisk,
    coefNextBuyOrder,
    firstBuyOrder,
    activeBlocks,
    addBlock,
    addOrder,
    removeBlock,
  };
},
	{ persist: false }
);
