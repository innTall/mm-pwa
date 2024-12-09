import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";

export const useSpotBitgetStore = defineStore(
  "spotBitget",
  () => {
    const fee = 0.001;
    const deposit = ref(5100);
    const coefOfRisk = ref(0.02);
    const coefNextBuyOrder = ref(1.2);
    let nextBlockId = 1;

    const showConfirmDialog = ref(false);
    const confirmMessage = ref("");
    const pendingAction = ref(null);

    const firstBuyOrder = computed(
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
        start: "",
        end: "",
        orders: [],
        isSaved: false,
        summary: computed(() => {
          const totalAmount = Number(
            block.orders.reduce(
              (sum, order) => sum + (order.amount || 0),
              0
            )
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
            avgBuyPrice: Number(
              totalAmount ? totalBuyOrder / totalAmount : 0
            ),
            avgSellPrice: Number(
              totalAmount ? totalSellOrder / totalAmount : 0
            ),
            totalProfit: Number(totalProfit) || 0,
            totalBuyOrders: Number(totalBuyOrder) || 0,
            totalAmount: Number(totalAmount) || 0,
          };
        }),
      });

      const initialOrder = {
        id: 1,
        buyPrice: 1,
        sellPrice: null,
        amount: 0,
        buyOrder: firstBuyOrder.value || 0,
        sellOrder: 0,
        profit: 0,
      };
      recalculateOrder(initialOrder, null);
      block.orders.push(initialOrder);

      return block;
    }

    function addBlock() {
      const newBlock = createNewBlock();
      activeBlocks.value.unshift(newBlock);
    }

    function recalculateOrder(order, previousOrder) {
      const buyPrice = +order.buyPrice || 1;
      const sellPrice = +order.sellPrice || null;
      const feeRate = 1 + fee;

      order.buyOrder = previousOrder
        ? +(
            parseFloat(previousOrder.buyOrder) *
            coefNextBuyOrder.value *
            feeRate
          ).toFixed(2)
        : +(firstBuyOrder.value * feeRate).toFixed(2);
      order.amount = +(parseFloat(order.buyOrder) / buyPrice).toFixed(2);
      order.sellOrder = +(
        sellPrice *
        parseFloat(order.amount) *
        (1 - fee)
      ).toFixed(2);
      order.profit = +(
        parseFloat(order.sellOrder) - parseFloat(order.buyOrder)
      ).toFixed(2);
    }

    function createNewOrder(block, previousOrder) {
      const feeRate = 1 + fee;
      const newOrder = reactive({
        id: block.orders.length + 1,
        buyPrice: null,
        sellPrice: null,
        amount: 0,
        buyOrder: previousOrder
          ? (
              parseFloat(previousOrder.buyOrder) *
              coefNextBuyOrder.value *
              feeRate
            ).toFixed(2)
          : (firstBuyOrder.value * feeRate).toFixed(2),
        sellOrder: 0,
        profit: 0,
        isManualBuyOrder: false, // Indicates whether buyOrder was manually edited
      });
      // Recalculate fields based on default or previous values
      recalculateOrder(newOrder, previousOrder);
      return newOrder;
    }

    function addOrder(block) {
      const lastOrder = block.orders[block.orders.length - 1];
      const newOrder = createNewOrder(block, lastOrder);
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
      confirmMessage.value = "Are you sure you want to delete this block?";
      pendingAction.value = () => {
        activeBlocks.value = activeBlocks.value.filter(
          (block) => block.id !== blockId
        );
      };
      showConfirmDialog.value = true;
    }

    function removeOrder(blockId, orderId) {
      confirmMessage.value = "Are you sure you want to delete this order?";
      pendingAction.value = () => {
        const block = activeBlocks.value.find((block) => block.id === blockId);
        if (block) {
          block.orders = block.orders.filter((order) => order.id !== orderId);
        }
      };
      showConfirmDialog.value = true;
    }

    function confirmAction() {
      if (pendingAction.value) {
        pendingAction.value();
        pendingAction.value = null;
      }
      showConfirmDialog.value = false;
    }

    function cancelAction() {
      showConfirmDialog.value = false;
      pendingAction.value = null;
    }
    return {
      deposit,
      coefOfRisk,
      coefNextBuyOrder,
      firstBuyOrder,
      activeBlocks,
      showConfirmDialog,
      confirmMessage,
      addBlock,
      addOrder,
      removeBlock,
      removeOrder,
      confirmAction,
      cancelAction,
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
