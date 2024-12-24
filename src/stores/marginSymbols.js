import { defineStore, storeToRefs } from "pinia";
import { computed } from "vue";
import { useOrdersBlockStore } from "@/stores/ordersBlock.js";

export const useMarginSymbolsStore = defineStore("marginSymbols", () => {
  // Access the ordersBlock store
  const { blocks } = storeToRefs(useOrdersBlockStore());

  // Computed: List of active symbols
  const symbolNames = computed(() => {
    return blocks.value
      .filter((block) => block.symbol) // Include only blocks with a defined symbol
      .map((block) => ({ id: block.id, symbol: block.symbol }));
  });

  // Computed: Alphabetically sorted list of symbols
  const sortedSymbols = computed(() => {
    return [...symbolNames.value].sort((a, b) =>
      a.symbol.localeCompare(b.symbol)
    );
  });

  // Method: Scroll to the block by ID
  const scrollToBlock = (id) => {
    const blockElement = document.getElementById(`block-${id}`);
    if (blockElement) {
      blockElement.scrollIntoView({ behavior: "smooth", block: "center" });
      blockElement.classList.add("highlight");
      setTimeout(() => blockElement.classList.remove("highlight"), 1000);
    }
  };

  return {
    symbolNames,
    sortedSymbols,
    scrollToBlock,
  };
});
