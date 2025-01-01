import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useMarginOrdersStore } from "@/stores/marginOrders.js";

// Unique ID generator
let nextBlockId = 1;

export const useOrdersBlockStore = defineStore(
  "ordersBlock",
  () => {
    const blocks = ref([]);
    const { calculateSl, calculateTp } = useMarginOrdersStore();
    // Helper function to generate unique block IDs
    const generateUniqueBlockId = () => nextBlockId++;

    // Creates a new margin order
    const createNewMarginOrder = (nextOrderId) => ({
      id: nextOrderId,
      buyPrice: null,
      amount: null,
      slPrice: null,
      tpPrice: null,
      selectedSwitch: null,
      //};
    });

    // Creates a new block with a default margin order
    const createNewBlock = () => {
      const newBlock = {
        id: generateUniqueBlockId(),
        symbol: "",
        //interval: "",
        //quoteAsset: "",
        orders: [createNewMarginOrder(1)],
        nextOrderId: 2, // Start order numbering for this block
        isSaved: false,
      };
      blocks.value.unshift(newBlock);
      return newBlock;
    };

    const ensureDefaultBlock = () => {
      if (blocks.value.length === 0) {
        createNewBlock();
      }
    };

    const addBlock = () => createNewBlock();

    const removeBlock = (blockId) => {
      blocks.value = blocks.value.filter((block) => block.id !== blockId);
      ensureDefaultBlock(); // Ensure at least one block exists
    };

    const addOrder = (block) => {
      block.orders.unshift(createNewMarginOrder(block.nextOrderId));
      block.nextOrderId++;
    };

    const removeOrder = (block, orderId) => {
      block.orders = block.orders.filter((order) => order.id !== orderId);
      if (block.orders.length === 0) {
        removeBlock(block.id); // Remove block if no orders remain
      }
    };

    const totalActiveTpAndSl = computed(() =>
      blocks.value.map((block) =>
        block.orders.reduce((total, order) => {
          if (order.selectedSwitch === "tp" && calculateTp(order)) {
            total += parseFloat(calculateTp(order)) || 0;
          } else if (order.selectedSwitch === "sl" && calculateSl(order)) {
            total += parseFloat(calculateSl(order)) || 0;
          }
          return total;
        }, 0)
      )
    );

    ensureDefaultBlock(); // Ensure one block with one order on initialization

    return {
      blocks,
      totalActiveTpAndSl,
      addBlock,
      removeBlock,
      addOrder,
      removeOrder,
    };
  },
  { persist: true }
);
