import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useSpotBitgetResStore = defineStore(
  "spotBitgetRes",
  () => {
    const blocks = ref([
      {
        date: null,
        symbol: "",
        buy: null,
        amnt: null,
        sell: null,
        activeMetric: "roi",
      },
    ]);

    const buyFee = 0.0001;
    const sellFee = 0.0001;

    const calculateCost = (block) => {
      return Number(
        block.buy * block.amnt + block.buy * block.amnt * buyFee
      ).toFixed(2);
    };
    const calculateRoi = (block) => {
      return Number((block.sell / block.buy - 1) * 100).toFixed(2);
    };
    const calculateTp = (block) => {
      return Number(
        (block.sell - block.buy) * block.amnt -
          block.sell * block.amnt * sellFee
      ).toFixed(2);
    };

    // Computed property to calculate Total Profit
    const totalProfit = computed(() => {
      return blocks.value
        .reduce((sum, block, index) => {
          if (block.activeMetric === "tp") {
            const tpValue = parseFloat(blockMetrics.value[index]?.tp) || 0;
            return sum + tpValue;
          }
          return sum;
        }, 0)
        .toFixed(2);
    });

    const blockMetrics = computed(() =>
      blocks.value.map((block) => ({
        cost: calculateCost(block),
        roi: calculateRoi(block),
        tp: calculateTp(block),
      }))
    );

    const isBlockComplete = (block) => {
      return (
        block.date &&
        block.symbol &&
        block.buy > 0 &&
        block.amnt > 0 &&
        block.sell > 0
      );
    };

    const addBlock = () => {
      blocks.value.unshift({
        date: null,
        symbol: "",
        buy: null,
        amnt: null,
        sell: null,
        activeMetric: "roi",
      });
    };

    // Add a method to remove a block by index
    const removeBlock = (index) => {
      if (index >= 0 && index < blocks.value.length) {
        blocks.value.splice(index, 1);
      }
    };

    return {
      blocks,
      blockMetrics,
      isBlockComplete,
      addBlock,
      removeBlock,
      totalProfit,
    };
  },
  { persist: true }
);
