import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";

export const useSpotBitgetStore = defineStore(
  "spotBitget",
  () => {
    const fee = 0.001;
    const deposit = ref(5100);
    const coefOfRisk = ref(0.02);
    const coefNextOrderCost = ref(1.2);
    let nextBlockId = 1;

    const firstOrderCost = computed(
      () => +(deposit.value * coefOfRisk.value).toFixed(2)
    );
    const activeBlocks = ref([createNewBlock()]);

    function generateUniqueId() {
      return nextBlockId++;
    }

    function createNewBlock() {
      const id = generateUniqueId();
      const block = reactive({
        id,
        symbol: "",
        open: "",
        close: "",
        orders: [],
        isSaved: false,
        summary: computed(() => {
          const totalTokenAmount = Number(block.orders.reduce(
            (sum, order) => sum + (order.tokenAmount || 0),
            0
          ));
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
            avgBuyPrice: Number(totalTokenAmount
              ? totalBuyOrder / totalTokenAmount
              : 0),
            avgSellPrice: Number(totalTokenAmount
              ? totalSellOrder / totalTokenAmount
              : 0),
            totalProfit: Number(totalProfit) || 0,
            totalBuyOrders: Number(totalBuyOrder) || 0,
            totalTokenAmount: Number(totalTokenAmount) || 0,
          };
        }),
      });

      const initialOrder = {
        id: 1,
        buyPrice: 1,
        sellPrice: null,
        tokenAmount: 0,
        buyOrder: firstOrderCost.value || 0,
        sellOrder: 0,
        profit: 0,
      };
      recalculateOrder(initialOrder, null);
      block.orders.push(initialOrder);

      return block;
    }

    function recalculateOrder(order, previousOrder) {
      const buyPrice = +(order.buyPrice) || 1;
      const sellPrice = +(order.sellPrice) || 0;
      const feeRate = 1 + fee;

      order.buyOrder = previousOrder
        ? +(
            parseFloat(previousOrder.buyOrder) *
            coefNextOrderCost.value *
            feeRate
          ).toFixed(2)
        : +(firstOrderCost.value * feeRate).toFixed(2);
      order.tokenAmount = +(parseFloat(order.buyOrder) / buyPrice).toFixed(2);
      order.sellOrder = +(
        sellPrice *
        parseFloat(order.tokenAmount) *
        (1 - fee)
      ).toFixed(2);
      order.profit = +(
        parseFloat(order.sellOrder) - parseFloat(order.buyOrder)
      ).toFixed(2);
    }

    function addBlock() {
      const newBlock = createNewBlock();
      activeBlocks.value.unshift(newBlock);
    }

    function addOrder(block) {
      const lastOrder = block.orders[block.orders.length - 1];
      const nextBuyPrice = +(lastOrder.buyPrice - 0.1).toFixed(4);
      const newOrder = {
        id: block.orders.length + 1,
        buyPrice: nextBuyPrice,
        sellPrice: +(nextBuyPrice + 0.2).toFixed(4),
        tokenAmount: 0,
        buyOrder: 0,
        sellOrder: 0,
        profit: 0,
      };
      recalculateOrder(newOrder, lastOrder);
      block.orders.push(newOrder);
    }

    const clearBuyPrice = (order) => {
      if (order.buyPrice === 1) order.buyPrice = undefined; // null
    };
    const restoreDefaultBuyPrice = (order) => {
      if (!order.buyPrice) order.buyPrice = 1;
    };
    const clearSellPrice = (order) => {
      if (order.sellPrice === 1) order.sellPrice = undefined; // null
    };
    const restoreDefaultSellPrice = (order) => {
      if (!order.sellPrice) order.sellPrice = 1;
    };

    function removeBlock(blockId) {
      activeBlocks.value = activeBlocks.value.filter(
        (block) => block.id !== blockId
      );
    }

    // New function to delete an order
    function removeOrder(blockId, orderId) {
      const block = activeBlocks.value.find((block) => block.id === blockId);
      if (block) {
        block.orders = block.orders.filter((order) => order.id !== orderId); // Reactivity-safe
      }
    }
    return {
      deposit,
      coefOfRisk,
      coefNextOrderCost,
      firstOrderCost,
      activeBlocks,
      addBlock,
      addOrder,
      removeBlock,
      removeOrder,
      clearBuyPrice,
      clearSellPrice,
      restoreDefaultBuyPrice,
      restoreDefaultSellPrice,
      recalculateOrder,
    };
  },
  {
    persist: false,
  }
);
