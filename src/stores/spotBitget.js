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
          const totalTokenAmount = block.orders.reduce(
            (sum, order) => sum + order.tokenAmount,
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
          const totalProfit =
            block.orders.length > 0
              ? block.orders[block.orders.length - 1].profit
              : 0;
          return {
            avgBuyPrice: totalTokenAmount
              ? totalBuyOrder / totalTokenAmount
              : 0,
            avgSellPrice: totalTokenAmount
              ? totalSellOrder / totalTokenAmount
              : 0,
            totalProfit,
            totalBuyOrders: totalBuyOrder,
            totalTokenAmount,
          };
        }),
      });

      const initialOrder = {
        id: 1,
        buyPrice: 1.2345,
        sellPrice: 1.456,
        tokenAmount: 0,
        buyOrder: firstOrderCost.value,
        sellOrder: 0,
        profit: 0,
      };
      recalculateOrder(initialOrder, null);
      block.orders.push(initialOrder);

      return block;
    }

    function recalculateOrder(order, previousOrder) {
      if (previousOrder) {
        order.buyOrder = +(
          previousOrder.buyOrder * coefNextOrderCost.value
        ).toFixed(2);
      } else {
        order.buyOrder = +firstOrderCost.value.toFixed(2);
      }
      order.tokenAmount = +(order.buyOrder / order.buyPrice).toFixed(2);
      order.sellOrder = +(
        order.sellPrice *
        order.tokenAmount *
        (1 - fee)
      ).toFixed(2);
      order.profit = +(order.sellOrder - order.buyOrder).toFixed(2);
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

    function removeBlock(blockId) {
      activeBlocks.value = activeBlocks.value.filter(
        (block) => block.id !== blockId
      );
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
    };
  },
  {
    persist: false,
  }
);
