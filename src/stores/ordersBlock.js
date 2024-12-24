import { defineStore } from "pinia";
import { ref } from "vue";

export const useOrdersBlockStore = defineStore(
  "ordersBlock",
  () => {
    // State: List of blocks
    const blocks = ref([
      {
        id: 1, // Default block with unique ID
        symbol: null,
        interval: null,
        quoteAsset: null,
      },
    ]);

    // Counter for generating unique IDs
    let blockIdCounter = 2;

    // Action: Add a new block
    const addBlock = () => {
      blocks.value.push({
        id: blockIdCounter++, // Assign a unique ID
        symbol: null,
        interval: null,
        quoteAsset: null,
      });
    };

    // Action: Remove a block by its ID
    const removeBlock = (id) => {
      blocks.value = blocks.value.filter((block) => block.id !== id);
    };

    return {
      blocks,
      addBlock,
      removeBlock,
    };
  },
  { persist: false }
);
