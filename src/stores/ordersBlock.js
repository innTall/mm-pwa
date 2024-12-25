import { defineStore } from "pinia";
import { ref } from "vue";

// Unique ID generator
let nextBlockId = 1;

export const useOrdersBlockStore = defineStore("ordersBlock", () => {
  const blocks = ref([]);

  // Helper function to generate unique block IDs
  const generateUniqueBlockId = () => nextBlockId++;

  // Creates a new margin order
  const createNewMarginOrder = (nextOrderId) => ({
    id: nextOrderId,
    buyPrice: null,
    amount: null,
    slPrice: null,
    tpPrice: null,
    selectedSwitch: "sl",
    //};
  });

  // Creates a new block with a default margin order
  const createNewBlock = () => {
    const newBlock = {
      id: generateUniqueBlockId(),
      symbol: "",
      interval: "",
      quoteAsset: "",
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

  ensureDefaultBlock(); // Ensure one block with one order on initialization
  
  return {
    blocks,
    addBlock,
    removeBlock,
    addOrder,
    removeOrder,
  };
});
