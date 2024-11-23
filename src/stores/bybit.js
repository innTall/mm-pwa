import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useBybitStore = defineStore("bybitStore", () => {
  
  // Utility function to clear fields
  const clearField = (field) => {
    if (field && typeof field === "object" && "value" in field) {
      field.value = "";
    } else {
      field = "";
    }
  };
  return { blocks, cost, profit, tp, addBlock, isBlockComplete, clearField };
});
